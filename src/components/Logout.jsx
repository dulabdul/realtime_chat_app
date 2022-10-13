import React from 'react';
import Button from '../utils/Button';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <div>
      <Button
        onClick={handleLogout}
        className='btn-logout'
        type='button'>
        <BiPowerOff />
      </Button>
    </div>
  );
}
