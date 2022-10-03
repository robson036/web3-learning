import React, { useState } from "react"

import useEthereum from "./hooks/useEthereum"

import "./App.css"

export default function App() {
    const [message, setMessage] = useState("")
    const { account, connectWallet, wave, loading, lastMinedHash, allWaves } =
        useEthereum()

    console.log(allWaves)

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">👋 Hi everyone!</div>

                <div className="bio">
                    I am Robson and I'm just trying to make some money by
                    growing up in my carreer. Cool, right? Connect your ethereum
                    wallet and send me a wave!
                </div>

                <input
                    type="text"
                    className="message-input"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type a message"
                />

                <button className="waveButton" onClick={() => wave(message)}>
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

                <br />
                {allWaves.map((wave, index) => {
                    return (
                        <div key={index} className="wave-list">
                            <div>Endereço: {wave.address}</div>
                            <div>Data/Hora: {wave.timestamp.toString()}</div>
                            <div>Mensagem: {wave.message}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
