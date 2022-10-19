import React from 'react';
import { FaSearch } from 'react-icons/fa';
export default function SearchInput({ title, titleChange }) {
  return (
    <div className='search-contact'>
      <FaSearch />{' '}
      <input
        type='text'
        placeholder='Search Contact'
        value={title || ''}
        onChange={(e) => titleChange(e.target.value)}
      />
    </div>
  );
}
