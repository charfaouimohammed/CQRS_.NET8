// src/components/AddDevice.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDevices, addDevice, updateDevice } from '../services/deviceService';
import './AddDevice.css';
import Navbar from './Navbar';

const AddDevice = () => {
  const [, setDevices] = useState([]);
  const [formData, setFormData] = useState({
    deviceID:'',
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
        deviceID:'',
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
      <Navbar />
      <h1>{editingDevice ? 'Edit Device' : 'Add Device'}</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Device Form */}
      <form onSubmit={handleSave} className="device-form">
        <input
          type="text"
          name="deviceName"
          placeholder="Device Name"
          value={formData.deviceName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
        />
        <input
          type="text"
          name="deviceType"
          placeholder="Device Type"
          value={formData.deviceType}
          onChange={handleChange}
        />
        <input
          type="text"
          name="os"
          placeholder="Operating System"
          value={formData.os}
          onChange={handleChange}
        />
        <input
          type="date"
          name="releaseDate"
          placeholder="Release Date"
          value={formData.releaseDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="serialNumber"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="warrantyStatus"
          placeholder="Warranty Status"
          value={formData.warrantyStatus}
          onChange={handleChange}
        />
        <input
          type="date"
          name="purchaseDate"
          placeholder="Purchase Date"
          value={formData.purchaseDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="owner"
          placeholder="Owner"
          value={formData.owner}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />
        
        <button type="submit">
          {editingDevice ? 'Update Device' : 'Add Device'}
        </button>
        {editingDevice && (
          <button type="button" onClick={() => navigate('/device')}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AddDevice;
