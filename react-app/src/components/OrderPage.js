import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import OrderService from '../services/OrderService';
import { getid, getUsername } from '../services/AuthService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order details
  const [openInfoModal, setOpenInfoModal] = useState(false); // State for info modal visibility
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
          const combinedData = ordersData.map((order, index) => ({
            id: order.id,
            orderNumber: index + 1,
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
      setOpenDialog(false);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleOpenDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenInfoModal = (order) => {
    setSelectedOrder(order);
    setOpenInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setOpenInfoModal(false);
  };

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

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.orderNumber}</td>
              <td>{row.comments}</td>
              <td>
                <IconButton color="primary" onClick={() => handleEdit(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleOpenDialog(row.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton color="info" onClick={() => handleOpenInfoModal(row)}>
                  <InfoIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {/* Order Info Modal */}
      <Dialog open={openInfoModal} onClose={handleCloseInfoModal}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder ? (
            <div>
              <Typography variant="body1">
                <strong>Order ID:</strong> {selectedOrder.orderNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Comments:</strong> {selectedOrder.comments}
              </Typography>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <Typography>No details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfoModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderPage;
