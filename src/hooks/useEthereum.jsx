import { useEffect, useState } from "react";

const useEthereum = () => {
  const { ethereum } = window;
  const [account, setAccount] = useState("");

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.warn("Metamask not connected");
      return false;
    }
    console.log("Metamask connected");

    return true;
  };

  const manageAccounts = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) {
        console.warn("No account found");
        return;
      }

      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      checkIfWalletIsConnected();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (checkIfWalletIsConnected()) {
      manageAccounts();
    }
  }, [checkIfWalletIsConnected]);

  return {
    checkIfWalletIsConnected,
    account,
    manageAccounts,
    connectWallet,
  };
};

export default useEthereum;
