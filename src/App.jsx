import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hello from './pages/Hello';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProductCreate from './pages/ProductCreate';
import ProductList from './pages/ProductList';
import OrderCreate from './pages/OrderCreate';
import OrderList from './pages/OrderList';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-product" element={<ProductCreate />} />
          <Route path="/list-product" element={<ProductList />} />  
          <Route path="/create-order" element={<OrderCreate />} />
          <Route path="/list-order" element={<OrderList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
