import { ReactComponent as Creator } from "../../assets/svg/creator.svg";

import "./index.scss";

interface GameMedalProps {
  value: string;
  expireTime: number;
  id: number;
  owned: boolean;
  complete: boolean;
}

export default function GameMedal(props: GameMedalProps) {
  const now = new Date().getTime();
  const countDown = props.expireTime * 1000 - now;
  let minutes = countDown / 1000 / 60;
  return (
    <>
      <div className={`medal ${props.owned ? "own" : ""}`}>
        {props.owned && (
          <Creator
            className="creatorSticker"
            id="creator"
            width="25"
            height="25"
            fill="rgb(228, 224, 172)"
            stroke="rgb(228, 224, 172)"
            strokeWidth="10"
            strokeLinecap="round"
          />
        )}
        <div className="title">
          <span>GameId</span>
          <span>{props.id}</span>
        </div>

        <table>
          <tbody>
            {props.owned && (
              <tr>
                <th>Status:</th>
                <td>Waitting player to join</td>
              </tr>
            )}
            <tr>
              <th>Bet amount</th>
              <td>{props.value}</td>
            </tr>
            <tr>
              <th>Expired in</th>
              <td>{`${minutes.toFixed(0)} mins`}</td>
            </tr>
          </tbody>
        </table>
        {props.complete && props.owned && (
          <span className="revealBtn">Reveal</span>
        )}
      </div>
    </>
  );
}
