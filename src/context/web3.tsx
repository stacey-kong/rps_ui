import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { rpsAbi } from "../abi/abis";
import { contractAddress } from "../enum";

declare let window: any;
export interface Web3Context {
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>> | null;
  balance: number;
  connection: boolean;
  contract: ethers.Contract | null;
  provider: ethers.providers.Web3Provider | null;
  initiateConnection: (() => void) | null;
}

export const WEB3_CONTEXT_DEFAULT_VALUE = {
  account: null,
  setAccount: null,
  balance: 0,
  connection: false,
  contract: null,
  provider: null,
  initiateConnection: null,
};

interface Props {
  children: React.ReactNode;
}

const rpsContractAddress = contractAddress;
const web3Context = React.createContext<Web3Context>(
  WEB3_CONTEXT_DEFAULT_VALUE
);
const provider = new ethers.providers.Web3Provider(window.ethereum);

export default function Web3ContextProvider(props: Props) {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [connection, setConnection] = useState<boolean>(false);
  const [contract, setContract] = useState<any>(null);

  function initContract() {
    if (connection) {
      const signer = provider.getSigner();
      const rpsContract = new ethers.Contract(
        rpsContractAddress,
        rpsAbi,
        signer
      );
      setContract(rpsContract);
    }
  }

  async function initiateConnection() {
    try {
      let accounts = await provider.send("eth_requestAccounts", []);
      console.log(accounts);
      if (accounts?.length === 0) return;
      setAccount(accounts[0]);
      localStorage.setItem("account", JSON.stringify(accounts[0]));
      getAccountDetails();
    } catch (error) {
      console.error(error);
    }
  }

  async function checkMetamaskAuthentication() {
    let savedAccount = localStorage.getItem("account");
    if (savedAccount !== "undefined" && savedAccount !== null) {
      setAccount(savedAccount);
    } else {
      let accounts = await provider.listAccounts();
      if (accounts.length !== 0) {
        setAccount(accounts[0]);
        localStorage.setItem("account", JSON.stringify(accounts[0]));
      }
    }
  }

  async function getAccountDetails() {
    if (account === null || account === "undefined") {
      return;
    } else {
      const balance = await provider.getBalance(account);
      setBalance(+ethers.utils.formatEther(balance));
      setConnection(true);
      initContract();
    }
  }

  useEffect(() => {
    async function initAll() {
      await checkMetamaskAuthentication();
      getAccountDetails();
    }
    initAll();
  });

  const value = {
    account,
    setAccount,
    balance,
    connection,
    contract,
    provider,
    initiateConnection,
  };

  return (
    <web3Context.Provider value={value}>{props.children}</web3Context.Provider>
  );
}

export const useWeb3Context = (): Web3Context => {
  return React.useContext(web3Context);
};
