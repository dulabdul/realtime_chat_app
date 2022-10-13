import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import Button from '../utils/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { avatarRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import toastOptions from '../utils/toastOptions';
export default function AvatarInput() {
  const navigate = useNavigate();
  const api = `https://api.multiavatar.com/4645646`;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);
  useEffect(() => {
    async function getStrg() {
      if (!localStorage.getItem('chat-app-current-user')) navigate('/login');
    }
    getStrg();
  }, [navigate]);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem('chat-app-current-user')
      );

      const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-current-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error('Error set avatar. Please try again', toastOptions);
      }
    }
  };
  useEffect(() => {
    async function fetchApi() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setLoading(false);
    }
    fetchApi();
  }, [api]);

  return (
    <>
      {isLoading ? (
        <Container>
          <img
            src={loader}
            alt='Loader'
            className='loader'
          />
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt='avatar'
                    onClick={() => setselectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <Button
            type='button'
            className='btn-submit'
            onClick={setProfilePicture}>
            Set as Profile Picture
          </Button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      cursor: pointer;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .btn-submit {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
