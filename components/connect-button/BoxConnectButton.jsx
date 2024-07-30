import { ConnectKitButton } from "connectkit";


import styled from "styled-components";
const StyledButton = styled.button`
background-color: dark;
border:solid;
border-color: rgb(0 107 255 / var(--tw-text-opacity));
color: white;
border-radius: 10px;
width: 40%;
height: 100%;
  }
`;

export const BoxConnectButton = () => {
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
