import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chat from "../assets/chat.png";
import SignOut from "./SignOut";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    (async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    })();
  }, []);

  return (
    <Container>
      <SignOutContainer>
        <SignOut />
      </SignOutContainer>
      <Content>
        <Image src={Chat} alt="Chat Icon" />
        <h1>
          Hi, <StyledSpan>{userName}</StyledSpan>
        </h1>
        <h3 style={{ marginTop: "20px" }}>Welcome, Talk To Your Best Friends Now!</h3>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  position: relative;
  width: 100%;
  overflow: hidden; /* Prevents content overflow */
  text-align: center;
`;

const SignOutContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ensure content fits within container width */
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 20rem;
  width: auto;
  height: auto;
`;

const StyledSpan = styled.span`
  color: #25d366;
  text-transform: capitalize;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: black;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #ebe7ff;
  &:hover {
    background-color: #333;
  }
`;
