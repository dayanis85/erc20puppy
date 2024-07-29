import { ConnectKitButton } from "connectkit";


import styled from "styled-components";
const StyledButton = styled.button`
background-color: #0b1d33;
border: solid;
border-color: #00c4f4;
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
