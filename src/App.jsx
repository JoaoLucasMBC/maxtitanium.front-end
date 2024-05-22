  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Hello from './pages/Hello';

  function App() {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Hello />} />
          </Routes>
        </Router>
      </>
    );
  }

  export default App;
