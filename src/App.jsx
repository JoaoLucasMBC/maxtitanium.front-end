  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Hello from './pages/Hello';
  import Login from './pages/Login';
  import SignUp from './pages/SignUp';

  function App() {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </>
    );
  }

  export default App;
