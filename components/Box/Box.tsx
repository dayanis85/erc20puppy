"use client"
import React, { useState } from "react"
import { getTransactionCount } from "../../back-end/getTransactionCount"
import CountdownTimer from "./timer.jsx"
import CopyToClipboard from "react-copy-to-clipboard"
import { relative } from "path"

const Box = () => {
  const [evmAddress, setEvmAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [entered, setEntered] = useState(false)
  const [transactionCount, setTransactionCount] = useState("")
  const [useReward, setReward] = useState(`NOT ELIGIBLE`)
  const [referralId, setReferralId] = useState("")
  const [innertxt, setinnertxt] = useState("Invite Your Friends")
  const [copy, setCopy] = useState(false)

  const onCopyTest = () => {
    setCopy(true)
    setinnertxt("copied")

    setTimeout(() => {
      setCopy(false)
      setinnertxt("Invite Your Friends")
    }, 2000)
  }

  const handleInputChange = (event) => {
    setEvmAddress(event.target.value)
  }

  const handleCheckClick = async () => {
    setLoading(true)
    try {
      const [success, response, reward] = await getTransactionCount(evmAddress)
      if (!success) {
        if (response === "Error! Invalid address format") {
          alert("Invalid address")
        } else {
          alert(response)
        }
      } else {
        setEntered(true)
        setTransactionCount(response.toString())
        response
          ? setReward(`Claim ${reward} puppy`)
          : setReward(`NOT ELIGIBLE`)
      }
    } catch (error) {
      alert(`Error fetching transaction count:${error.message}`)
    } finally {
      setLoading(false)
    }

    const existingReferral = localStorage.getItem(evmAddress)

    if (existingReferral) {
      setReferralId(existingReferral)
    } else {
      const newReferralId = generateReferralId()
      localStorage.setItem(evmAddress, newReferralId)
      setReferralId(newReferralId)
    }
  }

  const generateReferralId = () => {
    return "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
      const r = (Math.random() * 16) | 0
      return r.toString(16)
    })
  }

  return (
    <>
      <section
        className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46"
        style={{ position: "relative" }}
      >
        <div className="box-container">
          <span className="label">FCFS</span>
          <span className="titleoftimer">You can claim your rewards in:</span>
          <CountdownTimer targetDate={"2024-08-20T17:30:00"} />
          <p className="paragraphBox">
            A tootal of 9,900,000,000 puppy is now <br />
            available to be claimed by those who have ERC20 Transaction in
            Arbitrum
          </p>
          {entered ? (
            <div className="claim-container">
              <div className="claim">
                <button className="claim-b" disabled={true}>
                  {useReward}
                </button>
                <h1 className="claim-p">
                  Your Transaction Count: {transactionCount}
                </h1>
              </div>

              <CopyToClipboard text={generateReferralId()} onCopy={onCopyTest}>
                <button className="invite-friends">{innertxt}</button>
              </CopyToClipboard>
            </div>
          ) : (
            <div className="enter-wallet-address">
              <button
                className="enter-wallet-address-button"
                onClick={handleCheckClick}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-icon"></span>
                  </>
                ) : (
                  "Check"
                )}
              </button>
              <input
                className="enter-wallet-address-input"
                placeholder="Enter Your EVM Address"
                type="text"
                value={evmAddress}
                onChange={handleInputChange}
              ></input>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Box
