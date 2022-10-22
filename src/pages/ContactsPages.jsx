import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contacs from '../components/Contacs';
import { allUsersRoute } from '../utils/ApiRoutes';
export default function ContactsPages() {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
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
    navigate('/chat');
    localStorage.setItem('chat-app-current-chat', JSON.stringify(chat));
  };
  console.log(contacts);
  return (
    <Contacs
      contacts={contacts}
      changeChat={handleChatChange}
    />
  );
}
