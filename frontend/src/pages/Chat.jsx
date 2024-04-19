import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatBox from "../components/ChatBox";
import FriendList from "../components/FriendList";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/signIn");
      } else {
        const user = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUser(user);
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);

      const setRandomAvatarAndFetchContacts = async () => {
        try {
          const { data: contactsData } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(contactsData);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      };

      setRandomAvatarAndFetchContacts();
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        {contacts.length > 0 ? (
          <>
            <FriendList contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatBox currentChat={currentChat} socket={socket} />
            )}
          </>
        ) : (
          <div className="loading">Loading contacts...</div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #212c33;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #2f3c44;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.5rem;
    }
  }
`;
