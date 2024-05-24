import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/login');
        }
    }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 border border-blue-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">Product List</h2>
      {products.length === 0 ? (
        <div className="text-center">No products found.</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Name</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Price</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Description</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Category</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Brand</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b border-blue-200">{product.name}</td>
                <td className="py-2 px-4 border-b border-blue-200">{product.price}</td>
                <td className="py-2 px-4 border-b border-blue-200">{product.description}</td>
                <td className="py-2 px-4 border-b border-blue-200">{product.category}</td>
                <td className="py-2 px-4 border-b border-blue-200">{product.brand}</td>
                <td className="py-2 px-4 border-b border-blue-200">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;