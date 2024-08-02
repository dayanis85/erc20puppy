"use-client"

import { ConnectKitButton } from "connectkit"

import styled from "styled-components"

const StyledButton1 = styled.button`
  cursor: not-allowed;
  position: relative;
  display: inline-block;
  padding: 14px 24px;
  border: 2px solid;
  border-color: rgb(51, 134, 251);
  background-color: rgb(28, 33, 60);
  color: white;
  background: dark;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10rem;
  opacity: 0.7;
`

const StyledButton2 = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 14px 24px;
  border: 2px solid;
  border-color: rgb(0 107 255 / var(--tw-text-opacity));
  color: white;
  background: dark;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10rem;
  box-shadow: 0 4px 24px -6px rgb(0 107 255 / var(--tw-text-opacity));

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px rgb(0 107 255 / var(--tw-text-opacity));
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px rgb(0 107 255 / var(--tw-text-opacity));
  }
`

export const NavConnectButton2 = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <StyledButton1 onClick={show}>
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </StyledButton1>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export const NavConnectButton = () => {
  return (
    <button
      style={{
        cursor: "not-allowed",
        position: "relative",
        display: "inline-block",
        padding: "14px 24px",
        border: "2px solid",
        borderColor: "rgb(51, 134, 251)",
        backgroundColor: "rgb(33, 36, 50)",
        color: "white",
        background: "dark",
        fontSize: "16px",
        fontWeight: "500",
        borderRadius: "10rem",
        opacity: "0.6",
      }}
    >
      Connect Wallet
    </button>
  )
}
