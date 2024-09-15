import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderService from '../services/OrderService';

const EditOrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};
  const [orderData, setOrderData] = useState({
    id: '',
    orderDate: '',
    comments: '',
  });

  useEffect(() => {
    if (order) {
      setOrderData({
        id: order.id,
        orderDate: new Date(order.orderDate).toISOString().slice(0, 10), // Format date for input
        comments: order.comments,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderService.updateOrder(orderData.id, {
        id: orderData.id,
        orderDate: new Date(orderData.orderDate).toISOString(),
        comments: orderData.comments,
      });
      navigate('/orders'); // Redirect to orders page after update
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Order ID"
          name="id"
          value={orderData.id}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Order Date"
          name="orderDate"
          type="date"
          value={orderData.orderDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comments"
          name="comments"
          value={orderData.comments}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditOrderForm;
