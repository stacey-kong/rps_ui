import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ethers } from "ethers";
import Crypto from "crypto";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import { CHOICE, RESULT } from "./enum";
import { convertToBignumber, formatNumber, formatResponse } from "./utils";
import { useWeb3Context } from "./context/web3";

export default function App() {
  const { account, balance, connection, contract } = useWeb3Context();

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
    let dealerInfo = await generateHash(choice, contract);
    let dealerHash = dealerInfo?.dealerHash;
    let randomStr = dealerInfo?.randomSecretStr;
    if (contract === null) return;
    try {
      let tx = await contract.createGame(dealerHash, {
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
    let choiceConstant = await generateChoice(choice, contract);
    let gameidBignumber = convertToBignumber(gameid);
    if (contract === null) return;

    try {
      await contract.joinGame(gameidBignumber, choiceConstant, {
        value: ethers.utils.parseEther(amount),
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const revealResult = async (gameid: number) => {
    let gameDetailsRaw = localStorage.getItem(`${gameid}`);
    const gameDetails = gameDetailsRaw ? JSON.parse(gameDetailsRaw) : "";
    let gameidBignumber = convertToBignumber(gameid);
    let choice = gameDetails.choice;
    let choiceConstant = await generateChoice(choice!, contract);
    let randomStr = gameDetails.randomStr;
    let bytes32Randomstr = randomStr ? Buffer.from(randomStr, "base64") : "";

    if (contract === null) return;

    try {
      await contract.revealGame(
        gameidBignumber,
        choiceConstant,
        bytes32Randomstr
      );

      contract
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

  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/">
          {connection ? <Redirect to="/playground" /> : <Dashboard />}
        </Route>
        {connection && (
          <Route path="/playground">
            <Playground
              account={account}
              balance={balance}
              createGame={createGame}
              joinGame={joinGame}
              revealResult={revealResult}
            />
          </Route>
        )}
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
}
