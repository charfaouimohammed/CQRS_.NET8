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
  IconButton,
} from '@mui/material'; // Import MUI Dialog components
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // Import Order Icon
import { getDevices, deleteDevice } from '../services/deviceService';
import './DevicePage.css';
import Navbar from './Navbar';

const DevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null); // State to hold the selected device for deletion
  const [open, setOpen] = useState(false); // State to control the dialog open/close
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

  const handleOpen = (device) => {
    setSelectedDevice(device);
    setOpen(true);
  };

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
      width: 200, // Adjust width to fit icons
      renderCell: (params) => (
        <>
          {/* Edit Icon Button */}
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          
          {/* Delete Icon Button */}
          <IconButton
            color="secondary"
            onClick={() => handleOpen(params.row)}
          >
            <DeleteIcon />
          </IconButton>
          
          {/* Order Icon Button */}
          <IconButton
            color="default"
            onClick={() => handleOrder(params.row)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="device-page-container">
      <Navbar/>
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
          // checkboxSelection
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
