import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { sendMsgRoute, getAllMsgRoute } from '../utils/ApiRoutes';
import ChatInput from './ChatInput';
import Logout from './Logout';
import { FaArrowLeft } from 'react-icons/fa';
import showFormatMinute from '../utils/formatDate';
import { v4 as uuidv4 } from 'uuid';
import Button from '../utils/Button';
export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    async function getMsg() {
      const data = await JSON.parse(
        localStorage.getItem('chat-app-current-user')
      );
      const response = await axios.post(getAllMsgRoute, {
        from: data._id,
        to: currentChat._id,
      });

      setMessages(response.data);
    }
    getMsg();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
          createdAt: new Date(),
        });
      });
    }
  }, [socket]);
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem('chat-app-current-user')
    );
    await axios.post(sendMsgRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: data._id,
      msg,
      createdAt: new Date(),
    });
    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      createdAt: new Date(),
    });
    setMessages(msgs);
  };
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);
  return (
    <div className='chat-content'>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='btn-back'>
            <Button
              type='button'
              onClick={() => window.history.back()}>
              <FaArrowLeft />
            </Button>
          </div>
          <div className='avatar'>
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt='avatar'
            />
          </div>
          <div className='username'>
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className='chat-message'>
        {messages.map((msg) => {
          return (
            <div
              key={uuidv4()}
              ref={scrollRef}>
              <div
                className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
                <div className='content'>
                  <p>{msg.message}</p>
                </div>
              </div>
              <div
                className={`content-time ${
                  msg.fromSelf ? 'sended' : 'received'
                }`}>
                <p>{showFormatMinute(msg.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
