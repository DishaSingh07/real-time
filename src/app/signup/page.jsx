"use client"

import React, { useState, useContext } from 'react';
import { UserContext } from '@/userContext';
import Link from 'next/link';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  async function signup(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('https://blog-app-2-qyll.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: 'include',
    });

    if (response.status !== 200) {
      alert('Error signing up. Please try again.');
    } else {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        alert('Signed up successfully');
        setRedirect(true);
      });
    }
  }

  if (redirect) {
    return <Link href="/" />
  }

  return (
    <div>
      <form action="" onSubmit={signup}
        className='flex flex-col w-2/5 mx-auto mt-20 border border-gray-300 p-5 rounded-lg bg-gray-300'
      >
        <h1 className='text-center mx-auto w-full text-blue-950 mb-5 font-bold text-3xl'>Signup</h1>
        <input type="text" 
          placeholder="Username" 
          className="block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400" 
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <input type="password" 
          placeholder="Password" 
          className="block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400" 
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <input type="password" 
          placeholder="Confirm Password" 
          className="block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400" 
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
        />
        <button className='block w-full p-2 rounded-lg mb-3 bg-gray-800 text-white 
          hover:bg-gray-700 mx-auto'>Signup</button>

        <p className='text-center'>
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup;
