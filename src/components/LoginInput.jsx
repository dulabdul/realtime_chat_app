import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import Button from '../utils/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import loader from '../assets/loader.gif';
import { loginRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toastOptions from '../utils/toastOptions';
import useInput from '../hooks/useInput';

export default function LoginInput() {
  const navigate = useNavigate();
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  useEffect(() => {
    async function getStrg() {
      if (localStorage.getItem('chat-app-current-user')) {
        navigate('/');
      }
    }
    getStrg();
  }, [navigate]);

  const handlerValidate = () => {
    if (username === '') {
      toast.error('username is required', toastOptions);
      return false;
    }
    if (password === '') {
      toast.error('password is required', toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(loginRoute, {
      username,
      password,
    });
    if (handlerValidate()) {
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          'chat-app-current-user',
          JSON.stringify(data.user)
        );
        navigate('/');
      }
    }
  };
  return (
    <>
      <div className='container'>
        <form
          className='form-login'
          onSubmit={handleSubmit}>
          <div className='brand'>
            <img
              src={Logo}
              alt='Logo'
            />

            <h1>Chatty</h1>
          </div>
          <div className='heading_form'>
            <h2>Login</h2>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={onUsernameChange}
            min='3'
            value={username}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onPasswordChange}
          />
          <Button
            className='btn-register'
            type='button'>
            Login
          </Button>
          <span>
            Not Have An Account ?{' '}
            <Button
              type='link'
              href='/register'>
              Register
            </Button>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
