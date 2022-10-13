import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import { FaPen } from 'react-icons/fa';

export default function Contacs({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    async function getData() {
      const data = await JSON.parse(
        localStorage.getItem('chat-app-current-user')
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
      setCurrentUserEmail(data.email);
    }
    getData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div className='contacts-container'>
      {/* <div className='brand'>
        <img
          src={Logo}
          alt='Logo'
        />
        <h3>Chatty</h3>
      </div> */}
      <div className='current-user'>
        <div className='avatar'>
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt='avatar'
          />
        </div>
        <div className='profile'>
          <div className='username'>
            <h3>{currentUserName}</h3>
          </div>
          <div className='email'>
            <h4>{currentUserEmail}</h4>
          </div>
        </div>
      </div>
      <div className='contacs'>
        <div className='heading-contact'>
          <h2>Messages</h2>
          <FaPen />
        </div>
        {contacts.map((contact, index) => {
          return (
            <div
              key={index}
              onClick={() => changeCurrentChat(index, contact)}
              className={`contact ${
                index === currentSelected ? 'selected' : ''
              }`}>
              <div className='avatar'>
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt='avatar'
                />
              </div>
              <div className='short-msg'>
                <div className='username'>
                  <h3>{currentUserName}</h3>
                </div>
                {/* <div className='msg'>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
