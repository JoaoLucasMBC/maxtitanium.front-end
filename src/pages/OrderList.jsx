import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error:', error);
        setOrders([
          {
              "orderId": "bb88668c-bec5-4969-a2bb-b0c64244caa1",
              "clientId": "123abc",
              "address": "Rua Quatá 200, Vila Olímpia",
              "orderDate": "2024-04-09",
              "products": [],
              "orderValue": 0
          },
          {
              "orderId": "716e8e98-c411-410e-94b6-d3742254d297",
              "clientId": "123abc",
              "address": "Rua Quatá 200, Vila Olímpia",
              "orderDate": "2024-04-09",
              "products": [
                  {
                      "idProduct": "bb9e8c23-f6ba-477e-a8c1-2fa453f72c60",
                      "quantity": 3
                  },
                  {
                      "idProduct": "6b54c9c7-8980-455a-9081-80ea58254288",
                      "quantity": 2
                  }
              ],
              "orderValue": 532.5
          },
          {
              "orderId": "2d6a0b8a-6ab6-4f78-9c45-77394298a1d3",
              "clientId": "123abc",
              "address": "Rua Quatá 200, Vila Olímpia",
              "orderDate": "2024-04-09",
              "products": [
                  {
                      "idProduct": "bb9e8c23-f6ba-477e-a8c1-2fa453f72c60",
                      "quantity": 3
                  },
                  {
                      "idProduct": "6b54c9c7-8980-455a-9081-80ea58254288",
                      "quantity": 2
                  }
              ],
              "orderValue": 532.5
          },
          {
              "orderId": "1e48a444-29d0-4083-a5ef-738b1a962104",
              "clientId": "123abc",
              "address": "Rua Quatá 200, Vila Olímpia",
              "orderDate": "2024-04-09",
              "products": [
                  {
                      "idProduct": "bb9e8c23-f6ba-477e-a8c1-2fa453f72c60",
                      "quantity": 3
                  },
                  {
                      "idProduct": "6b54c9c7-8980-455a-9081-80ea58254288",
                      "quantity": 2
                  }
              ],
              "orderValue": 532.5
          },
          {
              "orderId": "722df86b-904e-4e18-8cf0-32651c85c595",
              "clientId": "123abc",
              "address": "Rua Quatá 200, Vila Olímpia",
              "orderDate": "2024-04-10",
              "products": [
                  {
                      "idProduct": "03a54ed5-3f53-4e11-90fd-1bb53e6e9b6a",
                      "quantity": 100
                  },
                  {
                      "idProduct": "6b54c9c7-8980-455a-9081-80ea58254288",
                      "quantity": 2
                  }
              ],
              "orderValue": 2189.8
          }
      ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 border border-blue-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">Order List</h2>
      {orders.length === 0 ? (
        <div className="text-center">No orders found.</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider"></th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Order ID</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Client ID</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Address</th>
              <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <tr onClick={() => toggleExpand(order.orderId)} className="cursor-pointer">
                  <td className="py-2 px-4 border-b border-blue-200">
                    {expandedOrderId === order.orderId ? 'v' : '>'}
                  </td>
                  <td className="py-2 px-4 border-b border-blue-200">{order.orderId}</td>
                  <td className="py-2 px-4 border-b border-blue-200">{order.clientId}</td>
                  <td className="py-2 px-4 border-b border-blue-200">{order.address}</td>
                  <td className="py-2 px-4 border-b border-blue-200">{order.orderDate}</td>
                </tr>
                {expandedOrderId === order.orderId && (
                  <tr>
                    <td colSpan="5" className="py-2 px-4 border-b border-blue-200">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Product ID</th>
                            <th className="py-2 px-4 border-b border-blue-200 bg-blue-100 text-left text-sm leading-4 font-medium text-blue-700 uppercase tracking-wider">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b border-blue-200">{product.idProduct}</td>
                              <td className="py-2 px-4 border-b border-blue-200">{product.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
