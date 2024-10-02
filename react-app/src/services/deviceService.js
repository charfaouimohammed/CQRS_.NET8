import axios from 'axios';

// Base URL for your API

const BASE_URL = 'https://localhost:7182/api/Device';

// Fetch all devices
export const getDevices = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Add a new device
export const addDevice = async (device) => {
  const response = await axios.post(BASE_URL, device);
  return response.data;
};

// Update an existing device
export const updateDevice = async (id, updatedDevice) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedDevice);
  return response.data;
};

// Delete a device
export const deleteDevice = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
