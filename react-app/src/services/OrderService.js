import axios from 'axios';

const API_URL = 'https://localhost:7182/api/Order'; // Adjust based on your API URL

const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data; // Return the order data
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Rethrow the error to be handled by the component
  }
};

const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};
const updateOrder = async (orderId, orderDto) => {
  try {
    console.log('Updating order with payload:', orderDto); // Log the payload
    await axios.put(`${API_URL}/${orderId}`, orderDto);
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
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
