import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDevices, addDevice, updateDevice } from '../services/deviceService';
import { Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import './AddDevice.css';


const AddDevice = () => {
  const [, setDevices] = useState([]);
  const [formData, setFormData] = useState({
    deviceID: '',
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
    status: '',
  });
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const editingDevice = location.state?.device;

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (editingDevice) {
      setFormData({
        deviceID: editingDevice.deviceID,
        deviceName: editingDevice.deviceName,
        manufacturer: editingDevice.manufacturer,
        deviceType: editingDevice.deviceType,
        os: editingDevice.os,
        releaseDate: editingDevice.releaseDate,
        serialNumber: editingDevice.serialNumber,
        warrantyStatus: editingDevice.warrantyStatus,
        purchaseDate: editingDevice.purchaseDate,
        price: editingDevice.price,
        location: editingDevice.location,
        owner: editingDevice.owner,
        status: editingDevice.status,
      });
    }
  }, [editingDevice]);

  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (err) {
      setError('Failed to fetch devices');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingDevice) {
        // Update existing device
        await updateDevice(formData.deviceID, formData);
      } else {
        // Add new device
        await addDevice(formData);
      }
      setFormData({
        deviceID: '',
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
        status: '',
      });
      navigate('/device'); // Redirect to the DevicePage after saving
    } catch (err) {
      setError('Failed to save device');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="addDev">
      <h1>{editingDevice ? 'Edit Device' : 'Add Device'}</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Device Form */}
      <form onSubmit={handleSave} className="device-form">
        <TextField
          label="Device Name"
          name="deviceName"
          value={formData.deviceName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Device Type"
          name="deviceType"
          value={formData.deviceType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Operating System"
          name="os"
          value={formData.os}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.releaseDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Serial Number"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Warranty Status"
          name="warrantyStatus"
          value={formData.warrantyStatus}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.purchaseDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{ step: '0.01' }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Owner"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          sx={{ mt: 2 }}
        >
          {editingDevice ? 'Update Device' : 'Add Device'}
        </Button>
        {editingDevice && (
          <Button
            type="button"
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            sx={{ mt: 2, ml: 2 }}
            onClick={() => navigate('/device')}
          >
            Cancel
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddDevice;
