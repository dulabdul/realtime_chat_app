import React, { useState, useEffect } from 'react';
import Robot from '../assets/robot.gif';
export default function Welcome() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    async function getData() {
      setUserName(
        await JSON.parse(localStorage.getItem('chat-app-current-user')).username
      );
    }
    getData();
  }, []);
  return (
    <div className='welcome'>
      <img
        src={Robot}
        alt='Robot'
      />
      <h1>
        Welcome,
        <span>{userName}!</span>
      </h1>
      <h3>Search a chat to start messaging.</h3>
    </div>
  );
}
