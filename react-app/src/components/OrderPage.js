import React, { useState, useEffect } from 'react';
import { Container, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/OrderService';
import { getid, getUsername } from '../services/AuthService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // For dialog confirmation
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Track the order to be deleted
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
            // orderDate: order.orderDate,
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

  const handleDelete = async () => {
    try {
      if (selectedOrderId) {
        await OrderService.deleteOrder(selectedOrderId);
        setData((prevData) => prevData.filter((row) => row.id !== selectedOrderId));
      }
      setOpenDialog(false); // Close the dialog after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleOpenDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true); // Open dialog on delete click
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog without deleting
  };

  const columns = [
    { field: 'orderNumber', headerName: 'Order ID', width: 130 }, // Use orderNumber instead of id
    // {
    //   field: 'orderDate',
    //   headerName: 'Order Date',
    //   width: 200,
    //   type: 'date',
    //   valueGetter: (params) =>
    //     params.value ? new Date(params.value).toLocaleDateString() : '',
    // },
    { field: 'comments', headerName: 'Comments', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleOpenDialog(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  if (loading) return <Typography>Loading...</Typography>;
  if (data.length === 0) return <Typography>No data found for this user.</Typography>;

  return (
    <Container>
      <div>
        <Navbar />
      </div>
      <Typography style={{ margin: 30 }} variant="h4" gutterBottom>
        Orders for {username}
      </Typography>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={10} />
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this order? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderPage;
