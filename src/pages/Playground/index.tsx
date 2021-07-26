import { ethers } from "ethers";
import Crypto from "crypto";
import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/web3";
import GameMedal from "../../components/GameMedal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import { ReactComponent as Eth } from "../../assets/svg/eth.svg";
import { ReactComponent as Rock } from "../../assets/svg/rock.svg";
import { ReactComponent as Paper } from "../../assets/svg/paper.svg";
import { ReactComponent as Scissors } from "../../assets/svg/scissors.svg";
import { CHOICE, RESULT, GAME, contractAddress } from "../../enum";
import {
  formatEther,
  convertToBignumber,
  formatNumber,
  formatResponse,
  formatDate,
} from "../../utils";

import { rpsAbi } from "../../abi/abis";
import "./index.scss";

enum PopupType {
  CREAT = "CREAT",
  JOIN = "JOIN",
}
interface PopupProps {
  state: boolean;
  type: PopupType;
}

declare let window: any;
const initialpopup = {
  state: false,
  type: PopupType.CREAT,
};

// const Game: Map<number, GAME> = new Map();

export default function Playground() {
  const [popup, setPopup] = useState<PopupProps>(initialpopup);
  const [amount, setAmount] = useState<string>("0");
  const [choice, setChoice] = useState<CHOICE>(CHOICE.NONE);
  const [games, setGames] = useState<GAME[] | null>(null);
  const [targetgame, setTargetGame] = useState<number | null>(null);
  const [placeholder, setPlacehoder] = useState<string>("Loading");
  const { account, balance, contract } = useWeb3Context();

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

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = () => {
    if (popup.type === PopupType.CREAT) {
      if (+amount === 0) {
        alert("Please imput a valid value");
        return;
      }
      if (choice === CHOICE.NONE) {
        alert("Please make your choice");
        return;
      }
      createGame(choice, amount);
    } else if (popup.type === PopupType.JOIN) {
      if (choice === CHOICE.NONE) {
        alert("Please make your choice");
        return;
      }
      if (targetgame === null) {
        return;
      }
      joinGame(choice, amount, targetgame);
    }
  };

  const loadGames = async function () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const rpsContractAddress = contractAddress;
    const rpsContract = new ethers.Contract(
      rpsContractAddress,
      rpsAbi,
      provider
    );
    const gameList = await rpsContract.getAllGames();
    let games: GAME[] = [];

    for (let i = 0; i < gameList.length; i++) {
      let gameid = gameList[i];
      let gameRaw = await rpsContract.games(gameid);
      console.log(gameRaw);
      let expireTime =
        +ethers.BigNumber.from(gameRaw.expireTime).toString() * 1000;
      let now = new Date();
      if (expireTime > now.getTime() && !gameRaw.closed) {
        let game: GAME = {
          value: formatEther(gameRaw.dealerValue._hex),
          expireTime: formatNumber(gameRaw.expireTime),
          id: formatNumber(gameRaw.gameId),
          creator: gameRaw.dealer,
          complete: gameRaw.playerChoice === 0 ? false : true,
        };
        games.push(game);
      }
    }
    if (games.length === 0) {
      setPlacehoder(
        `No avaliable games now. Click "Create" to create your own game!`
      );
      return;
    }
    console.log(games);
    setGames(games);
  };

  const joinRoom = function (amount: string, id: number) {
    console.log("join");
    setAmount(amount);
    setPopup((prevState) => ({
      ...prevState,
      state: true,
      type: PopupType.JOIN,
    }));
    setTargetGame(id);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handelMedalClick = function (
    complete: boolean,
    own: boolean,
    amount: string,
    id: number
  ) {
    if (!own) {
      joinRoom(amount, id);
    } else if (own) {
      if (!complete) {
        alert("Waitthing other player to join");
      }
      if (complete) {
        revealResult(id);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="userInfo">
          <h1>PLAYGROUND</h1>
          <div className="account">
            <p>
              Account:
              <br />
              {`${account?.slice(0, 5)}...${account?.slice(-4)}`}
            </p>
            <p>Balance: {balance?.toFixed(2)} ETH</p>
          </div>
        </div>

        {!popup.state && (
          <div className="playground">
            <ul className="gameList">
              {games
                ? games.map((game: GAME, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handelMedalClick(
                          game.complete,
                          account === game.creator ? true : false,
                          game.value,
                          game.id
                        )
                      }
                    >
                      <GameMedal
                        value={game.value}
                        expireTime={game.expireTime}
                        id={game.id}
                        owned={account === game.creator ? true : false}
                        complete={game.complete}
                      />
                    </li>
                  ))
                : placeholder}
            </ul>
            {
              <div className="creatbtn">
                <span
                  className="button"
                  onClick={() => {
                    setPopup((prevState) => ({ ...prevState, state: true }));
                  }}
                >
                  Create Your Game
                </span>
              </div>
            }
          </div>
        )}
      </div>
      {popup.state && (
        <div className="popup">
          <div className="amount">
            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={amount}
                disabled={popup.type === PopupType.JOIN ? true : false}
                onChange={handleAmountChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Eth width="20" height="20" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="choices">
            <Rock
              className={`choice ${choice === CHOICE.ROCK ? "selected" : ""}`}
              id="rock"
              viewBox="0 0 200 450"
              width="50"
              height="50"
              strokeLinecap="round"
              onClick={() => setChoice(CHOICE.ROCK)}
            />
            <Paper
              className={`choice ${choice === CHOICE.PAPER ? "selected" : ""}`}
              id="paper"
              strokeLinecap="round"
              onClick={() => setChoice(CHOICE.PAPER)}
            />
            <Scissors
              className={`choice ${
                choice === CHOICE.SCISSORS ? "selected" : ""
              }`}
              id="scissors"
              strokeLinecap="round"
              onClick={() => setChoice(CHOICE.SCISSORS)}
            />
          </div>
          <div className="submitBtn">
            <span onClick={handleSubmit}>SUBMIT</span>
          </div>
        </div>
      )}
    </>
  );
}
