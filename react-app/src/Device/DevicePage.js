// src/components/DevicePage.js

import React, { useState, useEffect } from 'react';
import {
  getDevices,
  addDevice,
  updateDevice,
  deleteDevice,
} from '../services/deviceService';
import './DevicePage.css';

const DevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
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

  useEffect(() => {
    fetchDevices();
  }, []);

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
        await updateDevice(editingDevice.deviceID, formData);
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
      setEditingDevice(null);
      fetchDevices();
    } catch (err) {
      setError('Failed to save device');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      fetchDevices();
    } catch (err) {
      setError('Failed to delete device');
    }
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
    setFormData({
      deviceID: device.deviceID,
      deviceName: device.deviceName,
      manufacturer: device.manufacturer,
      deviceType: device.deviceType,
      os: device.os,
      releaseDate: device.releaseDate,
      serialNumber: device.serialNumber,
      warrantyStatus: device.warrantyStatus,
      purchaseDate: device.purchaseDate,
      price: device.price,
      location: device.location,
      owner: device.owner,
      status: device.status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="device-page-container">
      <h1>Devices</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Device Form */}
      <form onSubmit={handleSave} className="device-form">
        <input 
        type="text"
        name ="DeviceId"
        placeholder="device ID"
        value={formData.deviceID}
        onChange={handleChange}
        required
        />
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
          <button type="button" onClick={() => setEditingDevice(null)}>
            Cancel
          </button>
        )}
      </form>

      {/* Device Table */}
      <table className="device-table">
        <thead>
          <tr>
            <th>DeviceId</th>
            <th>Device Name</th>
            <th>Manufacturer</th>
            <th>Device Type</th>
            <th>OS</th>
            <th>Release Date</th>
            <th>Serial Number</th>
            <th>Warranty Status</th>
            <th>Purchase Date</th>
            <th>Price</th>
            <th>Location</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.deviceID}>
              <td>{device.deviceName}</td>
              <td>{device.manufacturer}</td>
              <td>{device.deviceType}</td>
              <td>{device.os}</td>
              <td>{device.releaseDate}</td>
              <td>{device.serialNumber}</td>
              <td>{device.warrantyStatus}</td>
              <td>{device.purchaseDate}</td>
              <td>{device.price}</td>
              <td>{device.location}</td>
              <td>{device.owner}</td>
              <td>{device.status}</td>
              <td>
                <button onClick={() => handleEdit(device)}>Edit</button>
                <button onClick={() => handleDelete(device.deviceID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevicePage;
                                                                                                                                      