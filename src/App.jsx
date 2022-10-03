import React from "react"

import useEthereum from "./hooks/useEthereum"

import "./App.css"

export default function App() {
    const { account, connectWallet, wave, loading, lastMinedHash } =
        useEthereum()

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">👋 Hi everyone!</div>

                <div className="bio">
                    I am Robson and I'm just trying to make some money by
                    growing up in my carreer. Cool, right? Connect your ethereum
                    wallet and send me a wave!
                </div>

                <button className="waveButton" onClick={wave}>
                    {loading ? "Loading..." : "Send a Wave 👋"}
                </button>

                <button
                    className="waveButton"
                    disabled={account.length > 0}
                    onClick={connectWallet}
                >
                    Connect wallet
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
