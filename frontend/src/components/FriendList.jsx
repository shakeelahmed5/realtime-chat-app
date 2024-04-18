import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatars from '@dicebear/avatars';
import Bottts from '@dicebear/avatars-bottts-sprites';

export default function FriendList({ contacts = [], changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const avatars = new Avatars(Bottts);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (data) {
      setCurrentUserName(data.username);
    }
  }, []);

  const generateAvatar = (seed) => {
    return avatars.create(seed);
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <h3>Chats</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar" dangerouslySetInnerHTML={{__html: generateAvatar(contact.username)}} />
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="username">
              <h2>Hi, {currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: black;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #212c33;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar svg {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
      }
      .username {
        h3 {
          color: white;
          text-transform: capitalize;
        }
      }
    }
    .selected {
      background-color: #49606d;
    }
  }

  .current-user {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar svg {
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
    }
    .username {
      h2 {
        color: white;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
          text-transform: capitalize;
        }
      }
    }
  }
`;
