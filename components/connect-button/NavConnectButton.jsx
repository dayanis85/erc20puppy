"use-client"

import { ConnectKitButton } from "connectkit";

import styled from "styled-components";
const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 14px 24px;
  border: 2px solid;
  border-color:rgb(0 107 255 / var(--tw-text-opacity));
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

`;

export const NavConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <StyledButton onClick={show}>
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </StyledButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
