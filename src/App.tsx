import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { rpsAbi } from "./abi/abis";
import Crypto from "crypto";
import { CHOICE } from "./enum";
import { convertToBignumber } from "./utils";

declare let window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const rpsContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, provider);

export default function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [connection, setConnection] = useState<boolean>(false);
  // const [contract, setContract] = useState<any>(null);

  //detect whether there is and account connected
  const MetamaskConnection = async function (Accounts: string[] | null) {
    const accounts = Accounts ?? (await provider.listAccounts());
    console.log(accounts);
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
    console.log(choiceConstant);

    //checking
    if (account === null) return;

    let randomSecret = Crypto.randomBytes(32);
    let randomSecretStr = randomSecret.toString("base64");
    localStorage.setItem("randomStr", randomSecretStr);
    let dealerHash = ethers.utils.solidityKeccak256(
      ["address", "uint8", "bytes32"],
      [account, choiceConstant, randomSecret]
    );
    return dealerHash;
  };

  const createGame = async (choice: CHOICE, amount: string) => {
    const signer = provider.getSigner();
    const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, signer);
    // setContract(rpsContract);
    let dealerhash = await generateHash(choice, rpsContract);
    console.log(dealerhash);
    try {
      await rpsContract
        .createGame(dealerhash, {
          value: ethers.utils.parseEther(amount),
        })
        .then((res: any) => console.log(res));
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
    console.log(gameidBignumber);

    try {
      await rpsContract
        .joinGame(gameidBignumber, choiceConstant, {
          value: ethers.utils.parseEther(amount),
        })
        .then((res: any) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };
  const revealResult = async (gameid: number) => {
    console.log("revealode");

    const signer = provider.getSigner();
    const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, signer);
    let gameidBignumber = convertToBignumber(gameid);
    let choice = localStorage.getItem("choice");
    let choiceConstant = await generateChoice(choice!, rpsContract);
    let randomStr = localStorage.getItem("randomStr");
    let bytes32Randomstr = randomStr ? Buffer.from(randomStr, "base64") : "";
    let revealhash = ethers.utils.solidityKeccak256(
      ["address", "uint8", "bytes32"],
      [account, choiceConstant, bytes32Randomstr]
    );
    console.log(revealhash);
    try {
      await rpsContract
        .reveal(gameidBignumber, choiceConstant, bytes32Randomstr)
        .then((res: any) => console.log(res));
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
