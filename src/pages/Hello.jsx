import React, { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from '../assets/react.svg';

const Hello = () => {
    const [count, setCount] = useState(0);

    return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-sm mx-auto"> {/* Main container with max-width and auto-margin */}
        <div className="flex justify-center mb-12"> {/* Increased margin for logos */}
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} alt="Vite logo" className="w-24 h-24 mr-4 rounded-full" />
          </a>
          <a href="https://reactjs.org/" target="_blank">
            <img src={reactLogo} className="w-16 h-16 rounded-full" alt="React logo" />
          </a>
        </div>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          count is {count}
        </button>
        <div className="text-center mt-8"> {/* Container for "Read the Docs" text */}
          <a href="https://legacy.reactjs.org/docs/getting-started.html" target="_blank" className="text-gray-600 underline text-xl">
            Read the React Docs
          </a>
        </div>
    </div>
    );
}

export default Hello;