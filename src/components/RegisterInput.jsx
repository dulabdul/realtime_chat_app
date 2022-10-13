import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import Button from '../utils/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toastOptions from '../utils/toastOptions';
export default function RegisterInput() {
  const navigate = useNavigate();
  const [Value, setValue] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handlerValidate()) {
      console.log('in validation', registerRoute);
      const { username, email, password } = Value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
        navigate('/login');
      }
    }
  };
  useEffect(() => {
    async function getStrg() {
      if (localStorage.getItem('chat-app-current-user')) {
        navigate('/');
      }
    }
    getStrg();
  }, [navigate]);

  const handlerValidate = () => {
    const { username, email, password, confirmPassword } = Value;
    if (username.length < 3) {
      toast.error('Username should be grater than 3 characters', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email is required', toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error('Password and confirm password should be same', toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error('Password should be grater than 8 characters', toastOptions);
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
            <h2>Register</h2>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={(e) => handleChange(e)}
          />
          <Button
            className='btn-register'
            type='button'>
            Create User
          </Button>
          <span>
            Already Have An Account ?{' '}
            <Button
              type='link'
              href='/login'>
              Login
            </Button>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
