import React, { useState, useEffect, useRef } from 'react';
import { host } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
import { io } from 'socket.io-client';
export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();

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
    async function getCurrChat() {
      if (!localStorage.getItem('chat-app-current-chat')) {
      } else {
        setCurrentChat(
          await JSON.parse(localStorage.getItem('chat-app-current-chat'))
        );
      }
    }
    getCurrChat();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  return (
    <div className='container'>
      <div className='container-chat'>
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
