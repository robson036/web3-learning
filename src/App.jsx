import React from "react"

import useEthereum from "./hooks/useEthereum"

import "./App.css"

export default function App() {
    const { account, connectWallet } = useEthereum()

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">👋 Olá Pessoal!</div>

                <div className="bio">
                    Eu sou o Robson e só estou tentando ganhar um pouco mais pra
                    sair do aperto. Legal, né? Conecte sua carteira Ethereum
                    wallet e me manda um tchauzinho!
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

                {lastMinedHash && (
                    <>
                        <br />
                        <span className="span-tx">Wave TX:</span>

                        <a
                            href={`https://goerli.etherscan.io/tx/${lastMinedHash}`}
                            target="_blank"
                            className="link-tx"
                        >
                            {lastMinedHash}
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}
