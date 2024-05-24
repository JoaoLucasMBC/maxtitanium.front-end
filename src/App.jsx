import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProductCreate from './pages/ProductCreate';
import ProductList from './pages/ProductList';
import OrderCreate from './pages/OrderCreate';
import OrderList from './pages/OrderList';
import NavBar from './components/NavBar';

const AppContent = () => {
  const location = useLocation();
  const noNavBarPaths = ['/login', '/signup'];

  return (
    <div className='max-width-100vh'>
      {!noNavBarPaths.includes(location.pathname) && <NavBar />}
        <Routes>
          <Route path="/create-order" element={<OrderCreate />} />
          <Route path="/list-order" element={<OrderList />} />
          <Route path="/create-product" element={<ProductCreate />} />
          <Route path="/list-product" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
