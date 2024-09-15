import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/OrderService';
import { getid, getUsername } from '../services/AuthService';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = getid();
    const loggedInUsername = getUsername();

    if (loggedInUserId && loggedInUsername) {
      setUserId(loggedInUserId);
      setUsername(loggedInUsername);

      const fetchOrders = async () => {
        try {
          const ordersData = await OrderService.getOrdersByUser(loggedInUserId);

          // Add an incrementing order number (index) to each order
          const combinedData = ordersData.map((order, index) => ({
            id: order.id, // Keep the original id as a hidden reference
            orderNumber: index + 1, // Incremental order number starting from 1
            orderDate: order.orderDate,
            comments: order.comments,
          }));

          setData(combinedData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      console.error('User ID or Username not found.');
      setLoading(false);
    }
  }, []);

  const handleEdit = (row) => {
    navigate(`/edit/${row.id}`, { state: { order: row } });
  };

  const handleDelete = async (orderId) => {
    try {
      await OrderService.deleteOrder(orderId);
      setData((prevData) => prevData.filter((row) => row.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const columns = [
    { field: 'orderNumber', headerName: 'Order ID', width: 150 }, // Use orderNumber instead of id
    {
      field: 'orderDate',
      headerName: 'Order Date',
      width: 200,
      type: 'date',
      valueGetter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    { field: 'comments', headerName: 'Comments', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <Typography>Loading...</Typography>;
  if (data.length === 0) return <Typography>No data found for this user.</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders for User ID: {userId}
      </Typography>

      <div style={{ height: 500, width: '100%' }}>
        <Typography variant="h5">Orders</Typography>
        <DataGrid rows={data} columns={columns} pageSize={10} />
      </div>
    </Container>
  );
};

export default OrderPage;
