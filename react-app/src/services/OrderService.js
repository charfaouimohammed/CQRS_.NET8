// src/services/OrderService.js
import axios from 'axios';

const API_URL = 'https://localhost:7182/api/Order'; // Adjust based on your API URL

const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getOrdersByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

const updateOrder = async (orderId, orderData) => {
  const response = await axios.put(`${API_URL}/${orderId}`, orderData);
  return response.data;
};

const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${API_URL}/${orderId}`);
  return response.data;
};

export default {
  getAllOrders,
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteOrder,
};
