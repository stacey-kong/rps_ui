import { CHOICE, GAME } from "../../enum";

import "./index.scss";

export default function Playground(props:GAME) {
//     console.log(props.expireTime)
//   const date = new Date(+props.expireTime);
  return (
    <>
      <div className="medal">
        <p>{props.value}</p>
        <p>{props.expireTime}</p>
      </div>
    </>
  );
}
