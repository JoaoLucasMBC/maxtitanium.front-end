import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
  const navigate = useNavigate();

    useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/login');
        }
    }, []);

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      category: form.category,
      brand: form.brand,
      stock: parseInt(form.stock, 10)
    };

    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product created:', result);
        alert('Product created successfully!');
      } else {
        console.error('Failed to create product');
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the product');
    }
  };

  return (
    <div className=" max-w-lg mx-auto my-10 p-5 border border-blue-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-blue-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="block text-sm font-medium text-blue-700">Price:</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-blue-700">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="block text-sm font-medium text-blue-700">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand" className="block text-sm font-medium text-blue-700">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock" className="block text-sm font-medium text-blue-700">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
