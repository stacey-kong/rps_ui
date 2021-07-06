import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import Playground from "../Playground";
import "./index.scss";
declare let window: any;

export default function Dashboard() {
  let history = useHistory();
  const [account, setAccount] = useState<string | null>(null);

  const MetamaskConnection = async function () {
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    setAccount(accounts[0]);
  };

  const requestAccount = async function () {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts;
  };

  const loadBlockchainData = async function () {
    let accounts = await requestAccount();
    setAccount(accounts[0]);
    console.log(accounts);
  };

  useEffect(() => {
    MetamaskConnection();
  });
  return (
    <>
      {!account && (
        <div className="container">
          <h1>Welcome to the ROCK PAPER SCISSORS Game </h1>
          <h3>Click to connect your Metamask account!</h3>
          <span onClick={loadBlockchainData}>Connect!</span>
        </div>
      )}
      {account && <Playground account={account} />}
    </>
  );
}
