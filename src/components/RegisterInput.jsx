import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import Button from '../utils/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toastOptions from '../utils/toastOptions';
import useInput from '../hooks/useInput';
export default function RegisterInput() {
  const navigate = useNavigate();
  const [username, onUsernameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [error, setError] = useState({
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('in validation', registerRoute);

    const { data } = await axios.post(registerRoute, {
      username,
      email,
      password,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem('chat-app-current-user', JSON.stringify(data.user));
      navigate('/login');
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
  const onUsernameValidate = (e) => {
    onUsernameChange(e);
    validateInput(e);
  };
  const onEmailValidate = (e) => {
    onEmailChange(e);
    validateInput(e);
  };
  const onPasswordValidate = (e) => {
    onPasswordChange(e);
    validateInput(e);
  };
  const onConfirmPasswordValidate = (e) => {
    onConfirmPasswordChange(e);
    validateInput(e);
  };

  // const handlerValidate = () => {
  //   if (username.length < 3) {
  //     toast.error('Username should be grater than 3 characters', toastOptions);
  //     return false;
  //   } else if (email === '') {
  //     toast.error('Email is required', toastOptions);
  //     return false;
  //   } else if (password !== confirmPassword) {
  //     toast.error('Password and confirm password should be same', toastOptions);
  //     return false;
  //   } else if (password.length < 8) {
  //     toast.error('Password should be grater than 8 characters', toastOptions);
  //     return false;
  //   }
  //   return true;
  // };
  const validateInput = (e) => {
    let { name, value } = e.target;
    console.log(`ini name ${name} dan value ${value}`);
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };
      switch (name) {
        case 'username':
          if (value.length < 3) {
            stateObj[name] = 'Username should be grater than 3 characters';
          }
          break;
        case 'password':
          if (value.length < 8) {
            stateObj[name] = `Password should be grater than 8 characters`;
          } else if (confirmPassword && value !== confirmPassword) {
            stateObj[
              'confirmPassword'
            ] = `Password and confirm password should be same`;
          } else {
            stateObj['confirmPassword'] = confirmPassword
              ? ''
              : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = `Please enter Password`;
          } else if (password && value !== password) {
            stateObj[name] = `Password and confirm password should be same`;
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
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
            <h2>Register</h2>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={onUsernameValidate}
            onBlur={validateInput}
          />
          {error.username && <span className='err'>{error.username}</span>}
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={onEmailValidate}
            onBlur={validateInput}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={onPasswordValidate}
            onBlur={validateInput}
          />
          {error.password && <span className='err'>{error.password}</span>}
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={onConfirmPasswordValidate}
            onBlur={validateInput}
          />
          {error.confirmPassword && (
            <span className='err'>{error.confirmPassword}</span>
          )}
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
