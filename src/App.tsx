import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { rpsAbi } from "./abi/abis";
import { soliditySha3 } from "web3-utils";
import Crypto from "crypto";
import {CHOICE} from "./enum"

declare let window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const rpsContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, provider);



export default function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [connection, setConnection] = useState<boolean>(false);
  const [contract, setContract] = useState<any>(null);

  //detect whether there is and account connected
  const MetamaskConnection = async function (Accounts: string[] | null) {
    const accounts = Accounts ?? (await provider.listAccounts());
    console.log(accounts);
    if (accounts.length === 0) return;
    setConnection(true);
    setAccount(accounts[0]);
    // const contractBalance = await provider.getBalance(rpsContractAddress);
    // console.log(ethers.utils.formatEther(contractBalance));
    const balance = await provider.getBalance(accounts[0]);
    setBalance(+ethers.utils.formatEther(balance));
  };

  //if no account is connected, click to ask for authorization
  const loadBlockchainData = async function () {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    MetamaskConnection(accounts);
  };

  const generateHash = async (choice: CHOICE, contract: any) => {
    let choiceConstant;
    switch (choice) {
      case CHOICE.ROCK:
        choiceConstant = await contract.ROCK();
        break;
      case CHOICE.PAPER:
        choiceConstant = await contract.PAPER();
        break;
      case CHOICE.SCISSORS:
        choiceConstant = await contract.SCISSORS();
        break;
      default:
        choiceConstant = await contract.NONE();
    }
    //checking
    if (account === null) return;

    let randomSecret = Crypto.randomBytes(10).toString("base64").slice(0, 10);
    console.log(randomSecret);

    let dealerHash = soliditySha3(account, choiceConstant, randomSecret);
    return dealerHash;
  };

  const createGame = async (choice:CHOICE,amount:string) => {
    const signer = provider.getSigner();
    const rpsContract = new ethers.Contract(rpsContractAddress, rpsAbi, signer);
    setContract(rpsContract);
    let dealerhash = await generateHash(choice, rpsContract);
    console.log(dealerhash);
    await rpsContract.createGame(dealerhash, account, {
      value: ethers.utils.parseEther(amount),
    });
  };

  useEffect(() => {
    MetamaskConnection(null);
  }, [connection]);

  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/">
          {connection ? (
            <Redirect to="/playground" />
          ) : (
            <Dashboard onClick={loadBlockchainData} />
          )}
        </Route>
        <Route path="/playground">
          <Playground
            account={account}
            balance={balance}
            createGame={createGame}
          />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
}
