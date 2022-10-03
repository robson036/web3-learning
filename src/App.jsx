import React from "react";
import { ethers } from "ethers";

import useEthereum from "./hooks/useEthereum";

import "./App.css";

export default function App() {
  const { account, connectWallet } = useEthereum();

  const wave = () => {};

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Olá Pessoal!</div>

        <div className="bio">
          Eu sou o Robson e só estou tentando ganhar um pouco mais pra sair do
          aperto. Legal, né? Conecte sua carteira Ethereum wallet e me manda um
          tchauzinho!
        </div>

        <button className="waveButton" onClick={wave}>
          Mandar Tchauzinho 👋
        </button>

        <button
          className="waveButton"
          disabled={account.length > 0}
          onClick={connectWallet}
        >
          Conectar carteira
        </button>
      </div>
    </div>
  );
}
