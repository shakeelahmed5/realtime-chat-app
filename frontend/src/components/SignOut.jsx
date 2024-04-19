import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { signOutRoute } from "../utils/APIRoutes";

export default function SignOut() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${signOutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/SignIn");
    }
  };

  return (
    <Button onClick={handleClick}>
      Log out
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
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

