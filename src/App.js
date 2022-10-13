import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPages from './pages/ChatPages';
import LoginPages from './pages/LoginPages';
import RegisterPage from './pages/RegisterPages';
import 'react-toastify/dist/ReactToastify.css';
import AvatarPages from './pages/AvatarPages';
export default function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path='/register'
            element={<RegisterPage />}></Route>
          <Route
            path='/login'
            element={<LoginPages />}></Route>
          <Route
            path='/'
            element={<ChatPages />}></Route>
          <Route
            path='/avatar'
            element={<AvatarPages />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
