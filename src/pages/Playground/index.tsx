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
import { CHOICE, GAME, contractAddress } from "../../enum";
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
  revealResult: (gameid: number) => void;
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
  const [placeholder, setPlacehoder] = useState<string>("Loading");

  const createGame = props.createGame;
  const joinGame = props.joinGame;
  const revealResult = props.revealResult;

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
    const rpsContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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
      return
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
                    <li
                      onClick={
                        props.account === game.creator
                          ? () => revealResult(game.id)
                          : () => joinRoom(game.value, game.id)
                      }
                    >
                      <GameMedal
                        value={game.value}
                        expireTime={game.expireTime}
                        id={game.id}
                        owned={props.account === game.creator ? true : false}
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
