// // app/login/page.js (for Next.js 13+ with the App Router)
// "use client"


// import { useState } from 'react';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Login attempt:', { email, password });
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Email</label>
//             <input
//               type="email"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-2">Password</label>
//             <input
//               type="password"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
"use client"

import React, { useState, useContext } from 'react';
import { UserContext } from '@/userContext';
import Link from 'next/link';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  async function login(event) {
    event.preventDefault();

    const response = await fetch('https://blog-app-2-qyll.onrender.com/api/auth/login', {
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
      alert('Invalid username or password');
    } else {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        alert('Logged in successfully');
        setRedirect(true);
      });
    }
  }

  if (redirect) {
    return <Link href='/' />
  }

  return (
    <div>
      <form action="" onSubmit={login}
        className='flex flex-col w-2/5 mx-auto mt-20 border border-gray-300 p-5 rounded-lg bg-gray-300'
      >
        <h1 className='text-center mx-auto w-full text-blue-950 mb-5 font-bold text-3xl'>Login</h1>
        <input 
          type="text" 
          placeholder="Username" 
          className="block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400" 
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="block w-full p-2 border border-gray-300 rounded-lg mb-3 hover:border-blue-400" 
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button 
          className='block w-full p-2 rounded-lg mb-3 bg-gray-800 text-white hover:bg-gray-700 mx-auto'
        >
          Login
        </button>

        <p className='text-center mt-4'>
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
