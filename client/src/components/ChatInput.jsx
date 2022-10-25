import React, { useState } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Picker from 'emoji-picker-react';
import Button from '../utils/Button';
export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handlerEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handlerEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };
  return (
    <div className='input-content'>
      <div className='button-container'>
        <div className='emoji'>
          <BsEmojiSmileFill onClick={handlerEmojiPickerShow} />
          {showEmojiPicker && <Picker onEmojiClick={handlerEmojiClick} />}
        </div>
      </div>
      <form
        className='input-container'
        onSubmit={(e) => sendChat(e)}>
        <input
          type='text'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder='type your message here'
        />
        <Button type='button'>
          <IoMdSend />
        </Button>
      </form>
    </div>
  );
}
