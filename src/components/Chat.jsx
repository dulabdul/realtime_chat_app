import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { allUsersRoute, host } from '../utils/ApiRoutes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Contacs from './Contacs';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
import { io } from 'socket.io-client';

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function getStrg() {
      if (!localStorage.getItem('chat-app-current-user')) {
        navigate('/login');
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem('chat-app-current-user'))
        );
      }
    }
    getStrg();
  }, [navigate]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    async function getAvatarImage() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate('/avatar');
        }
      }
    }
    getAvatarImage();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className='container'>
      <div className='container-chat'>
        <Contacs
          contacts={contacts}
          changeChat={handleChatChange}
        />

        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}
