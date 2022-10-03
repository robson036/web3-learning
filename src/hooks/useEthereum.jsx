import { useEffect, useState } from "react"
import { ethers } from "ethers"

import abi from "../utils/WavePortal.json"

const useEthereum = () => {
    const { ethereum } = window
    const [account, setAccount] = useState("")
    const [loading, setLoading] = useState(false)
    const [lastMinedHash, setLastMinedHash] = useState("")
    const [allWaves, setAllWaves] = useState([])

    const contractAddress = "0x20AFaE433410903d06B2bbbfCB29821831188313"
    const contractABI = abi.abi

    const checkIfWalletIsConnected = () => {
        const { ethereum } = window

        if (!ethereum) {
            console.warn("Metamask not connected")
            return false
        }
        console.log("Metamask connected")

        return true
    }

    const manageAccounts = async () => {
        try {
            const accounts = await ethereum.request({
                method: "eth_accounts"
            })

            if (accounts.length === 0) {
                console.warn("No account found")
                return
            }

            setAccount(accounts[0])
        } catch (err) {
            console.error(err)
        }
    }

    const connectWallet = async () => {
        try {
            checkIfWalletIsConnected()

            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            })
            setAccount(accounts[0])
        } catch (error) {
            console.error(error)
        }
    }

    const wave = async message => {
        try {
            if (!message) {
                alert("Type a message, then click to send a wave")
                return
            }
            setLoading(true)
            checkIfWalletIsConnected()
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const wavePortalContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            )

            let count = await wavePortalContract.getTotalWaves()
            console.log(
                "Recuperado o número total de tchauzinhos... ",
                count.toNumber()
            )

            const waveTxn = await wavePortalContract.wave(message)
            console.log("Minerando... ", waveTxn.hash)

            await waveTxn.wait()
            console.log("Minerando -- ", waveTxn.hash)

            setLastMinedHash(waveTxn.hash)

            count = await wavePortalContract.getTotalWaves()
            console.log(
                "Recuperando o número de tchauzinhos... ",
                count.toNumber()
            )
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const getAllWaves = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()

            const wavePortalContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            )

            const waves = await wavePortalContract.getAllWaves()
            if (!waves) {
                console.error("Waves array is undefined")
                return
            }

            let wavesCleaned = []
            waves.forEach(wave => {
                wavesCleaned.push({
                    address: wave.waver,
                    timestamp: new Date(wave.timestamp * 1000),
                    message: wave.message
                })
            })

            setAllWaves(wavesCleaned)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (checkIfWalletIsConnected()) {
            manageAccounts()
            getAllWaves()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        wave,
        checkIfWalletIsConnected,
        account,
        manageAccounts,
        connectWallet,
        loading,
        lastMinedHash,
        allWaves
    }
}

export default useEthereum
