import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'; // Import MUI Dialog components
import { getDevices, deleteDevice } from '../services/deviceService';
// import { getToken, getUsername } from '../services/AuthService'; // Import AuthService methods
import './DevicePage.css';
import Navbar from './Navbar';

const DevicePage = () => {
  const [devices, setDevices] = useState([]);;
  const [error, setError] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null); // State to hold the selected device for deletion
  const [open, setOpen] = useState(false); // State to control the dialog open/close
  const navigate = useNavigate();
  const [deviceCount, setDeviceCount] = useState({});

  useEffect(() => {
    fetchDevices();
  });

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
      handleClose(); // Close the dialog after successful deletion
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

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  // Open confirmation dialog
  const handleOpen = (device) => {
    setSelectedDevice(device);
    setOpen(true);
  };

  // Close confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedDevice(null);
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'deviceID', headerName: 'ID', width: 90, sortable: true },
    { field: 'deviceName', headerName: 'Device Name', width: 150, sortable: true },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150, sortable: true },
    { field: 'deviceType', headerName: 'Device Type', width: 150, sortable: true },
    { field: 'os', headerName: 'OS', width: 120, sortable: true },
    {
      field: 'releaseDate',
      headerName: 'Release Date',
      width: 150,
   
      sortable: true,
    },
    { field: 'serialNumber', headerName: 'Serial Number', width: 150, sortable: true },
    { field: 'warrantyStatus', headerName: 'Warranty Status', width: 150, sortable: true },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      width: 150,
  
      sortable: true,
    },
    { field: 'price', headerName: 'Price', width: 100, sortable: true },
    { field: 'location', headerName: 'Location', width: 150, sortable: true },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <div>
          {params.value} ({deviceCount[params.value] || 0})
        </div>
      ),
    },
    { field: 'status', headerName: 'Status', width: 120, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300, // Increase width to fit all buttons
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpen(params.row)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="info" // You can choose another color or style
            onClick={() => handleOrder(params.row)}
            style={{ marginLeft: 8 }}
          >
            Order
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="device-page-container">
      <Navbar />
      <h1>Devices</h1>
      {error && <p className="error-message">{error}</p>}

      {/* MUI DataGrid */}
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={devices}
          columns={columns}
          getRowId={(row) => row.deviceID}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          checkboxSelection
          sortingOrder={['asc', 'desc']}
        />
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the device{' '}
            <strong>{selectedDevice?.deviceName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedDevice?.deviceID)}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DevicePage;
