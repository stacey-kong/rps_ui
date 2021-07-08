import { useEffect, useState } from "react";
import GameMedal from "../../components/GameMedal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import { ReactComponent as Eth } from "../../assets/svg/eth.svg";
import { ReactComponent as Rock } from "../../assets/svg/rock.svg";
import { ReactComponent as Paper } from "../../assets/svg/paper.svg";
import { ReactComponent as Scissors } from "../../assets/svg/scissors.svg";
import { CHOICE, GAME } from "../../enum";
import { formatEther, formatNumber, formatDate } from "../../utils";
import { ethers } from "ethers";
import { rpsAbi } from "../../abi/abis";

import "./index.scss";

enum PopupType {
  CREAT = "CREAT",
  JOIN = "JOIN",
}
interface PlaygroundProps {
  account: string | null;
  balance: number | null;
  createGame: (choice: CHOICE, amount: string) => void;
  joinGame: (choice: CHOICE, amount: string, gameid: number) => void;
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

export default function Playground(props: PlaygroundProps) {
  const [popup, setPopup] = useState<PopupProps>(initialpopup);
  const [amount, setAmount] = useState<string>("0");
  const [choice, setChoice] = useState<CHOICE>(CHOICE.NONE);
  const [games, setGames] = useState<GAME[] | null>(null);
  const [targetgame, setTargetGame] = useState<number | null>(null);

  const createGame = props.createGame;

  const joinGame = props.joinGame;

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
      localStorage.setItem("choice", choice);
      createGame(choice, amount);
    }
    if (popup.type === PopupType.CREAT) {
      if (+amount === 0) {
        alert("Please imput a valid value");
        return;
      }
      if (choice === CHOICE.NONE) {
        alert("Please make your choice");
        return;
      }
      localStorage.setItem("choice", choice);
      createGame(choice, amount);
      // window.location.reload();
    } else if (popup.type === PopupType.JOIN) {
      if (choice === CHOICE.NONE) {
        alert("Please make your choice");
        return;
      }
      if (targetgame === null) {
        return;
      }
      localStorage.setItem("choice", choice);
      joinGame(choice, amount, targetgame);
    }
  };

  const loadGames = async function () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const rpsContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const rpsContract = new ethers.Contract(
      rpsContractAddress,
      rpsAbi,
      provider
    );
    const GameNum = await rpsContract.maxgame();
    const gameNum = formatNumber(GameNum);

    let games: GAME[] = [];
    for (let i = 1; i <= gameNum; i++) {
      let gameRaw = await rpsContract.games(i);
      console.log(gameRaw)
      let expireTime =
        +ethers.BigNumber.from(gameRaw.expireTime).toString() * 1000;
      let now = new Date();
      if (expireTime > now.getTime()) {
        let game: GAME = {
          value: formatEther(gameRaw.dealerValue._hex),
          expireTime: formatDate(gameRaw.expireTime),
          id: formatNumber(gameRaw.gameId),
        };
        games.push(game);
      }
    }
    // console.log(games);
    setGames(games);
  };

  const joinRoom = function (amount: string, id: number) {
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

  return (
    <>
      <div className="container">
        <div className="userInfo">
          <h1>Playground</h1>
          <div className="account">
            <p>
              Account:
              <br />
              {`${props.account?.slice(0, 5)}...${props.account?.slice(-4)}`}
            </p>
            <p>Balance: {props.balance?.toFixed(2)} ETH</p>
          </div>
        </div>

        {!popup.state && (
          <div className="playground">
            <ul className="gameList">
              {games
                ? games.map((game: GAME, index) => (
                    <li onClick={() => joinRoom(game.value, game.id)}>
                      <GameMedal
                        value={game.value}
                        expireTime={game.expireTime}
                        id={game.id}
                        key={index}
                      />
                    </li>
                  ))
                : "loading..."}
            </ul>
            <div className="creatbtn">
              <span
                onClick={() => {
                  setPopup((prevState) => ({ ...prevState, state: true }));
                }}
              >
                Create Your Game
              </span>
            </div>
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
              fill="pink"
              stroke="rgb(131, 213, 228, 0.863)"
              strokeWidth="10"
              strokeLinecap="round"
              onClick={() => setChoice(CHOICE.ROCK)}
            />
            <Paper
              className={`choice ${choice === CHOICE.PAPER ? "selected" : ""}`}
              id="paper"
              viewBox="50 20 400 50"
              fill="pink"
              stroke="rgb(131, 213, 228, 0.863)"
              strokeWidth="10"
              strokeLinecap="round"
              onClick={() => setChoice(CHOICE.PAPER)}
            />
            <Scissors
              className={`choice ${
                choice === CHOICE.SCISSORS ? "selected" : ""
              }`}
              id="scissors"
              viewBox="250 80 400 200"
              fill="pink"
              stroke="rgb(131, 213, 228, 0.863)"
              strokeWidth="10"
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
