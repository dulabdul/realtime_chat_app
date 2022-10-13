import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import Button from '../utils/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toastOptions from '../utils/toastOptions';
export default function LoginInput() {
  const navigate = useNavigate();
  const [Value, setValue] = useState({
    username: '',
    password: '',
  });
  useEffect(() => {
    async function getStrg() {
      if (localStorage.getItem('chat-app-current-user')) {
        navigate('/');
      }
    }
    getStrg();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handlerValidate()) {
      const { username, password } = Value;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
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
  const handlerValidate = () => {
    const { username, password } = Value;
    if (username.length === '') {
      toast.error('Username is required', toastOptions);
      return false;
    } else if (password.length === '') {
      toast.error('Password is required', toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValue({
      ...Value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className='container'>
        <form
          className='form-login'
          onSubmit={(e) => handleSubmit(e)}>
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
            onChange={(e) => handleChange(e)}
            min='3'
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
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
