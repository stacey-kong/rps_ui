import { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import { ReactComponent as Eth } from "../../assets/svg/eth.svg";
import { ReactComponent as Rock } from "../../assets/svg/rock.svg";
import { ReactComponent as Paper } from "../../assets/svg/paper.svg";
import { ReactComponent as Scissors } from "../../assets/svg/scissors.svg";
import { CHOICE } from "../../enum";

import "./index.scss";

interface PlaygroundProps {
  account: string | null;
  balance: number | null;
  createGame: (choice: CHOICE, amount: string) => void;
}

export default function Playground(props: PlaygroundProps) {
  const [popup, setPopup] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");
  const [choice, setChoice] = useState<CHOICE>(CHOICE.NONE);

  const createGame = props.createGame;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = () => {
    if (+amount === 0) {
      alert("Please imput a valid value");
      return;
    }
    if (choice === CHOICE.NONE) {
      alert("Please make your choice");
      return;
    }
    createGame(choice, amount);
  };

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
        {!popup && (
          <div className="creatbtn">
            <span
              onClick={() => {
                setPopup((prev) => !prev);
              }}
            >
              Create Your Game
            </span>
          </div>
        )}
      </div>
      {popup && (
        <div className="popup">
          <div className="amount">
            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={amount}
                onChange={handleAmountChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Eth width="20" />
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
