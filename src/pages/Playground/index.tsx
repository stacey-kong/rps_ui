import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import "./index.scss";

interface PlaygroundProps {
  account: string;
}

export default function Playground(props: PlaygroundProps) {
  //   const [account, setAccount] = useState<string | null>(null);

  //   async function requestAccount() {
  //     let accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     return accounts;
  //   }

  //   const loadBlockchainData = async function name() {
  //     let accounts = await requestAccount();
  //     setAccount(accounts[0]);
  //     console.log(accounts);
  //   };

  // useEffect(() => {
  //   loadBlockchainData();
  // });
  return (
    <div className="container">
      <h1>Playground</h1>
      <p>Your account: {props.account}</p>
    </div>
  );
}
