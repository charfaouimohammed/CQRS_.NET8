// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';

// Define columns for the DataGrid
const columns = [
  { field: 'id', headerName: 'Order ID', width: 200 },
  { field: 'username', headerName: 'Username', width: 150 },
//   { field: 'author', headerName: 'Author', width: 150 },
  { field: 'orderDate', headerName: 'Order Date', width: 180 },
  { field: 'totalPrice', headerName: 'Total Price', width: 150, type: 'number' },
  { field: 'orderStatus', headerName: 'Order Status', width: 180 },
  { field: 'comments', headerName: 'Comments', width: 250 },
//   { field: 'dateOfCommand', headerName: 'Date Of Command', width: 180 },
  { field: 'departement', headerName: 'Department', width: 150 },
];

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders (or their IDs) on component mount
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // Step 1: Fetch all orders or their IDs
        const response = await axios.get('https://localhost:7182/api/Order'); // Adjust to the correct endpoint
        const orderSummaries = response.data;

        // Step 2: Fetch detailed data for each order
        const detailedOrders = await Promise.all(
          orderSummaries.map(async (order) => {
            const detailsResponse = await axios.get(`https://localhost:7182/api/Order/details/${order.id}`);
            return detailsResponse.data;
          })
        );

        setOrders(detailedOrders);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchAllOrders();
  }, []);

  // Map fetched order details to DataGrid rows
  const rows = orders.map((order, index) => ({
    id: order.id || `${index}`, // Ensure a unique id for each row; fallback to index if id is missing
    username: order.username || 'Unknown',
    // author: `${order.firstname || ''} ${order.lastname || ''}`,
    orderDate: order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A',
    totalPrice: order.totalPrice || 0,
    orderStatus: order.orderStatus || 'Unknown',
    comments: order.comments || 'No comments',
    // dateOfCommand: order.dateOfCommand ? new Date(order.dateOfCommand).toLocaleDateString() : 'N/A',
    departement: order.departement || 'Unknown',
  }));

  return (
    
    <div>
        <Navbar />
      <h1>Order Details</h1>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id} // Use id as the row identifier
        />
      </Box>
    </div>
  );
};

export default OrderPage;
