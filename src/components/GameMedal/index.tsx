import { CHOICE, GAME } from "../../enum";

import "./index.scss";

interface GameMedalProps {
  value: string;
  expireTime: string;
  id: number;
  owned: boolean;
  complete: boolean;
}

export default function Playground(props: GameMedalProps) {
  //     console.log(props.expireTime)
  //   const date = new Date(+props.expireTime);
  return (
    <>
      <div className="medal">
        {props.owned && <p>creator</p>}
        <p>{props.value}</p>
        {props.complete && props.owned ? (
          <span className="revealBtn">Reveal</span>
        ) : (
          <p>{props.expireTime}</p>
        )}
      </div>
    </>
  );
}
