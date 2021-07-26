import "./index.scss";
import { useWeb3Context } from "../../context/web3";

export default function Dashboard() {
  const { initiateConnection } = useWeb3Context();

  return (
    <>
      <div className="container">
        <h1>Welcome to the ROCK PAPER SCISSORS Game </h1>
        <h3>Click to connect your Metamask account!</h3>
        <span onClick={initiateConnection!} className="button">
          Connect!
        </span>
      </div>
    </>
  );
}
