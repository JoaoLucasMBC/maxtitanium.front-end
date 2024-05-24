import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      return response.json();
    })
    .then(data => {
      const token = data.token;
      localStorage.setItem('token', token);
      navigate('/create-order');
    })
    .catch(error => {
      alert("Failed to log in: " + error.message);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-8">Max Titanium</h1>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Sign In
          </button>
        </form>
        <div className="text-center my-4">Or sign in with</div>
        <button
          className="w-full mb-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
        >
          <span className="mr-2">G</span> Continue with Google
        </button>
        <button
          className="w-full mb-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-center"
        >
          <span className="mr-2">M</span> Continue with Microsoft
        </button>
        <div className="text-center mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign Up here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
