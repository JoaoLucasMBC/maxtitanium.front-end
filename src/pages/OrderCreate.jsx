import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCreate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/login');
        }
    }, []);

  const [form, setForm] = useState({
    client_id: '',
    address: '',
    products: [{ product_id: '', quantity: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOrderDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...form.products];
    updatedProducts[index][name] = value;
    setForm({ ...form, products: updatedProducts });
  };

  const addOrderDetail = () => {
    setForm({ ...form, products: [...form.products, { product_id: '', quantity: '' }] });
  };

  const removeOrderDetail = (index) => {
    const updatedProducts = [...form.products];
    updatedProducts.splice(index, 1);
    setForm({ ...form, products: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      idClient: form.client_id,
      address: form.address,
      products: form.products.map(detail => ({
        idProduct: detail.product_id,
        quantity: parseInt(detail.quantity, 10),
      })),
    };

    console.log(order)

    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order created:', result);
        alert('Order created successfully!');
      } else {
        console.error('Failed to create order');
        alert('Failed to create order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the order');
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-5 border border-blue-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">Create Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">Client Information</h3>
          <div className="form-group">
            <label htmlFor="client_id" className="block text-sm font-medium text-blue-700">Client ID:</label>
            <input
              type="text"
              id="client_id"
              name="client_id"
              value={form.client_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-blue-700">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <hr className="my-6 border-t-2 border-blue-300" />
        <div>
          <h3 className="text-xl font-semibold mb-3">Order Details</h3>
          <div className="space-y-4">
            {form.products.map((detail, index) => (  
              <div key={index} className="form-group">
                <h2 className="font-bold">Product {index+1}</h2>
                <label htmlFor={`product_id_${index}`} className="block text-sm font-medium text-blue-700">Product ID:</label>
                <input
                  type="text"
                  id={`product_id_${index}`}
                  name="product_id"
                  value={detail.product_id}
                  onChange={(e) => handleOrderDetailChange(index, e)}
                  required
                  className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <label htmlFor={`quantity_${index}`} className="block text-sm font-medium text-blue-700 mt-2">Quantity:</label>
                <input
                  type="number"
                  id={`quantity_${index}`}
                  name="quantity"
                  value={detail.quantity}
                  onChange={(e) => handleOrderDetailChange(index, e)}
                  required
                  className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => removeOrderDetail(index)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addOrderDetail}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-4"
          >
            Add Product
          </button>
        </div>
        <hr className="my-6 border-t-2 border-blue-300" />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default OrderCreate;

