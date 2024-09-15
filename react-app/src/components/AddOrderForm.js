import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import OrderService from '../services/OrderService'; // Import OrderService

const AddOrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract device and userId from location state
  const { device, idUser } = location.state || {};

  // State for form fields
  const [formData, setFormData] = useState({
    id:'',
    deviceId: '',
    deviceName: '',
    manufacturer: '',
    deviceType: '',
    os: '',
    releaseDate: '',
    serialNumber: '',
    warrantyStatus: '',
    purchaseDate: '',
    price: '',
    location: '',
    owner: '',
    orderDate:'',
    comments: '',
  });

  // Set initial values if device data exists
  useEffect(() => {
    if (device) {
      setFormData({
        id:device.id,
        deviceId: device.deviceID || '',
        deviceName: device.deviceName || '',
        manufacturer: device.manufacturer || '',
        deviceType: device.deviceType || '',
        os: device.os || '',
        releaseDate: device.releaseDate ? new Date(device.releaseDate).toISOString().substring(0, 10) : '',
        serialNumber: device.serialNumber || '',
        warrantyStatus: device.warrantyStatus || '',
        purchaseDate: device.purchaseDate ? new Date(device.purchaseDate).toISOString().substring(0, 10) : '',
        price: device.price || '',
        location: device.location || '',
        owner: device.owner || '',
        orderDate:'',
        comments: '',

      });
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the order data
    const orderData = {
      UserId: idUser,
      Devices: [{
        id : formData.id,
        DeviceID: formData.deviceId,
        DeviceName: formData.deviceName,
        Manufacturer: formData.manufacturer,
        DeviceType: formData.deviceType,
        OS: formData.os,
        ReleaseDate: new Date(formData.releaseDate).toISOString(),
        SerialNumber: formData.serialNumber,
        WarrantyStatus: formData.warrantyStatus,
        PurchaseDate: new Date(formData.purchaseDate).toISOString(),
        Price: parseFloat(formData.price),
        Location: formData.location,
        Owner: formData.owner,
        Status: formData.status || 'Available' // Default value if not provided
      }],
      orderDate: new Date().toISOString(),
    //   OrderStatus: formData.orderData,
      Comments: formData.comments,
    //   Department: formData.department
    };
    console.log(orderData);
    try {
      // Use createOrder method from OrderService
      await OrderService.createOrder(orderData);
      console.log("Order created successfully");
      navigate('/OrderConfirmation'); // Redirect to confirmation page or elsewhere
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Device ID"
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Device Name"
              name="deviceName"
              value={formData.deviceName}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="datetime-local"
              label="DateOrder"
              name="dateorder"
              value={formData.orderDate}
              onChange={handleChange}
              fullWidth
              disabled
            /> 
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddOrderForm;
