import "./index.scss";
// import { useHistory } from "react-router-dom";
// import { useEffect } from "react";

interface DashboardProps {
  onClick: () => void;
}

export default function Dashboard(props: DashboardProps) {
  return (
    <>
      <div className="container">
        <h1>Welcome to the ROCK PAPER SCISSORS Game </h1>
        <h3>Click to connect your Metamask account!</h3>
        <span onClick={props.onClick} className="button">
          Connect!
        </span>
      </div>
    </>
  );
}
