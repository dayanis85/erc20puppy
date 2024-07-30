"use client";
import React, { useState } from "react";
import { getTransactionCount } from "../../back-end/getTransactionCount";
import CountdownTimer from "./timer.jsx"
const Box = () => {

  const [evmAddress, setEvmAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [entered, setEntered] = useState(false);
  const [transactionCount, setTransactionCount] = useState("");
  const [useReward, setReward] = useState(`NOT ELIGIBLE`);
  const [referralId, setReferralId] = useState("");

  const handleInputChange = (event) => {
    setEvmAddress(event.target.value);
  };

  const handleCheckClick = async () => {
    setLoading(true);
    try {
      const [success, response, reward] = await getTransactionCount(evmAddress);
      if (!success) {
        if (response === "Error! Invalid address format") {
          alert("Invalid address");
        } else {
          alert(response);
        }
      } else {
        setEntered(true);
        setTransactionCount(response.toString());
        response
          ? setReward(`Claim ${reward} puppy`)
          : setReward(`NOT ELIGIBLE`);
      }
    } catch (error) {
      alert(`Error fetching transaction count:${error.message}`);
    } finally {
      setLoading(false);
    }

    const existingReferral = localStorage.getItem(evmAddress);

    if (existingReferral) {
      setReferralId(existingReferral);
    } else {
      const newReferralId = generateReferralId();
      localStorage.setItem(evmAddress, newReferralId);
      setReferralId(newReferralId);
    }
  };

  const generateReferralId = () => {
    return "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
      const r = (Math.random() * 16) | 0;
      return r.toString(16);
    });
  };

  
   
  
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        
        <div className="box-container">
          
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
              <button className="referral">Ivite Your Friends</button>
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
                  "Enter"
                )}
              </button>
              <input
                className="enter-wallet-address-input"
                type="text"
                value={evmAddress}
                onChange={handleInputChange}
              ></input>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Box;
