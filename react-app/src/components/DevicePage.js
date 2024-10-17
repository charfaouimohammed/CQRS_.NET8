import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info'; // Import Info Icon
import { getDevices, deleteDevice } from '../services/deviceService';
import './DevicePage.css';
import Navbar from './Navbar';

const DevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false); // State for info dialog
  const navigate = useNavigate();
  const [deviceCount, setDeviceCount] = useState({});

  useEffect(() => {
    fetchDevices();
  }); // Add empty dependency array to prevent infinite calls

  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
      calculateDeviceCount(data);
    } catch (err) {
      setError('Failed to fetch devices');
    }
  };

  const calculateDeviceCount = (devices) => {
    const count = devices.reduce((acc, device) => {
      acc[device.owner] = (acc[device.owner] || 0) + 1;
      return acc;
    }, {});
    setDeviceCount(count);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      fetchDevices();
      handleCloseDeleteDialog(); // Close the delete dialog after successful deletion
    } catch (err) {
      setError('Failed to delete device');
    }
  };

  const handleEdit = (device) => {
    navigate('/AddDevice', { state: { device } });
  };

  const handleOrder = (device) => {
    const idUser = localStorage.getItem('idUser');
    navigate('/AddOrderForm', { state: { device, idUser } });
  };

  const handleOpenDeleteDialog = (device) => {
    setSelectedDevice(device);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedDevice(null);
  };

  const handleOpenInfoDialog = (device) => {
    setSelectedDevice(device);
    setOpenInfoDialog(true);
  };

  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false);
    setSelectedDevice(null);
  };

  return (
    <div className="device-page-container">
      <Navbar />
      <h1>Devices</h1>
      {error && <p className="error-message">{error}</p>}

      {/* HTML Table */}
      <table className="devices-table">
        <thead>
          <tr>
            <td>deviceID</td>
              <td>deviceName</td>
              <td>manufacturer</td>
              <td>deviceType</td>
              <td>os</td>
              <td>owner</td>
              <td>action</td>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.deviceID}>
              <td>{device.deviceID}</td>
              <td>{device.deviceName}</td>
              <td>{device.manufacturer}</td>
              <td>{device.deviceType}</td>
              <td>{device.os}</td>
              <td>
                {device.owner} ({deviceCount[device.owner] || 0})
              </td>
              <td>
                <IconButton color="primary" onClick={() => handleEdit(device)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleOpenDeleteDialog(device)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton color="default" onClick={() => handleOrder(device)}>
                  <AddShoppingCartIcon />
                </IconButton>
                {/* Info Icon Button */}
                <IconButton color="info" onClick={() => handleOpenInfoDialog(device)}>
                  <InfoIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the device{' '}
            <strong>{selectedDevice?.deviceName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedDevice?.deviceID)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Info Dialog to display all information about the device */}
      <Dialog open={openInfoDialog} onClose={handleCloseInfoDialog}>
        <DialogTitle>Device Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Device ID:</strong> {selectedDevice?.deviceID}<br />
            <strong>Device Name:</strong> {selectedDevice?.deviceName}<br />
            <strong>Manufacturer:</strong> {selectedDevice?.manufacturer}<br />
            <strong>Device Type:</strong> {selectedDevice?.deviceType}<br />
            <strong>OS:</strong> {selectedDevice?.os}<br />
            <strong>Release Date:</strong> {selectedDevice?.releaseDate}<br />
            <strong>Serial Number:</strong> {selectedDevice?.serialNumber}<br />
            <strong>Warranty Status:</strong> {selectedDevice?.warrantyStatus}<br />
            <strong>Purchase Date:</strong> {selectedDevice?.purchaseDate}<br />
            <strong>Price:</strong> {selectedDevice?.price}<br />
            <strong>Location:</strong> {selectedDevice?.location}<br />
            <strong>Owner:</strong> {selectedDevice?.owner}<br />
            <strong>Status:</strong> {selectedDevice?.status}<br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfoDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DevicePage;
