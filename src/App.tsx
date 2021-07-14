import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { rpsAbi } from "./abi/abis";
import Crypto from "crypto";
import { CHOICE, contractAddress, RESULT } from "./enum";
import {
  convertToBignumber,
  formatNumber,
  formatEther,
  formatResponse,
} from "./utils";

declare let window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const rpsContractAddress = contractAddress;

export default function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [connection, setConnection] = useState<boolean>(false);
  // const [contract, setContract] = useState<any>(null);

  //metamask event detection
  window.ethereum.on("accountsChanged", (accounts: string[]) =>
    MetamaskConnection(accounts)
  );
  //detect whether there is and account connected
  const MetamaskConnection = async function (Accounts: string[] | null) {
    const accounts = Accounts ?? (await provider.listAccounts());
    if (accounts.length === 0) return;
    setConnection(true);
    setAccount(accounts[0]);

    const balance = await provider.getBalance(accounts[0]);
    setBalance(+ethers.utils.formatEther(balance));
  };

  //if no account is connected, click to ask for authorization
  const loadBlockchainData = async function () {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    MetamaskConnection(accounts);
  };

  const generateChoice = async (choice: string, contract: any) => {
    let choiceConstant;
    switch (choice) {
      case CHOICE.ROCK:
        choiceConstant = await contract.ROCK();
        break;
      case CHOICE.PAPER:
        choiceConstant = await contract.PAPER();
        break;
      case CHOICE.SCISSORS:
        choiceConstant = await contract.SCISSORS();
        break;
      default:
        choiceConstant = await contract.NONE();
    }
    return choiceConstant;
  };

  const generateHash = async (choice: CHOICE, contract: any) => {
    let choiceConstant = await generateChoice(choice, contract);

    //checking
    if (account === null) return;

    let randomSecret = Crypto.randomBytes(32);
    let randomSecretStr = randomSecret.toString("base64");
    let dealerHash = ethers.utils.solidityKeccak256(
      ["address", "uint8", "bytes32"],
      [account, choiceConstant, randomSecret]
    );
    let dealerInfo = {
      randomSecretStr,
      dealerHash,
    };
    return dealerInfo;
  };

  const createGame = async (choice: CHOICE, amount: string) => {
    const signer = provider.getSigner();
    const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, signer);
    // setContract(rpsContract);
    let dealerInfo = await generateHash(choice, rpsContract);
    let dealerHash = dealerInfo?.dealerHash;
    let randomStr = dealerInfo?.randomSecretStr;

    try {
      let tx = await rpsContract.createGame(dealerHash, {
        value: ethers.utils.parseEther(amount),
      });
      let res = await formatResponse(tx);
      let gameId = formatNumber(res!);
      console.log(gameId);
      let gameDetails = {
        gameId,
        randomStr,
        choice,
      };
      localStorage.setItem(`${gameId}`, JSON.stringify(gameDetails));
      window.location.reload();
    } catch (err) {
      console.log("fail to creat game");
      console.log(err);
    }
  };

  const joinGame = async (choice: string, amount: string, gameid: number) => {
    const signer = provider.getSigner();
    const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, signer);
    let choiceConstant = await generateChoice(choice, rpsContract);
    let gameidBignumber = convertToBignumber(gameid);
    try {
      await rpsContract
        .joinGame(gameidBignumber, choiceConstant, {
          value: ethers.utils.parseEther(amount),
        })
    window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  const revealResult = async (gameid: number) => {
    const signer = provider.getSigner();
    const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, signer);
    let gameDetailsRaw = localStorage.getItem(`${gameid}`);
    const gameDetails = gameDetailsRaw ? JSON.parse(gameDetailsRaw) : "";
    let gameidBignumber = convertToBignumber(gameid);
    let choice = gameDetails.choice;
    let choiceConstant = await generateChoice(choice!, rpsContract);
    let randomStr = gameDetails.randomStr;
    let bytes32Randomstr = randomStr ? Buffer.from(randomStr, "base64") : "";
    // let revealhash = ethers.utils.solidityKeccak256(
    //   ["address", "uint8", "bytes32"],
    //   [account, choiceConstant, bytes32Randomstr]
    // );
    try {
     await rpsContract.revealGame(
        gameidBignumber,
        choiceConstant,
        bytes32Randomstr
      );

      rpsContract
        .on(
          "CloseGame",
          async function (
            gameid: ethers.BigNumber,
            dealer: string,
            player: string,
            result: ethers.BigNumber
          ) {
            localStorage.removeItem(`${gameid}`);

            switch (formatNumber(result)) {
              case RESULT.DRAW:
                alert("This is a draw!");
                break;
              case RESULT.DEALERWIN:
                alert("Congrats! You win a game");
                break;
              case RESULT.PLAYERWIN:
                alert("Opps, you lose a game");
            }
          }
        )
        .on("error", console.error);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    MetamaskConnection(null);
  }, [connection]);

  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/">
          {connection ? (
            <Redirect to="/playground" />
          ) : (
            <Dashboard onClick={loadBlockchainData} />
          )}
        </Route>
        <Route path="/playground">
          <Playground
            account={account}
            balance={balance}
            createGame={createGame}
            joinGame={joinGame}
            revealResult={revealResult}
          />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
}
