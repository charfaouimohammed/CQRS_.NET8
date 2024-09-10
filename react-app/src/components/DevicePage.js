// src/components/DevicePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDevices,
  deleteDevice,
} from '../services/deviceService';
import './DevicePage.css';
import Navbar from './Navbar';

const DevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (err) {
      setError('Failed to fetch devices');
    }
  };

const handleDelete = async (id) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        await deleteDevice(id);
        fetchDevices();
      } catch (err) {
        setError('Failed to delete device');
      }
    }
  };

  const handleEdit = (device) => {
    navigate('/AddDevice', { state: { device } });
  };

  return (
    <div className="device-page-container">
      <Navbar />
      <h1>Devices</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Device Table */}
      <table className="device-table">
        <thead>
          <tr>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.deviceID}>
              <td>{device.deviceName}</td>
              <td>{device.manufacturer}</td>
              <td>{device.deviceType}</td>
              <td>{device.os}</td>
              <td>{formatDate(device.releaseDate)}</td> {/* Formatted Date */}
              <td>{device.serialNumber}</td>
              <td>{device.warrantyStatus}</td>
              <td>{formatDate(device.purchaseDate)}</td> {/* Formatted Date */}
              <td>{device.price}</td>
              <td>{device.location}</td>
              <td>{device.owner}</td>
              <td>{device.status}</td>
              <td>
                <button onClick={() => handleEdit(device)}>Edit</button>
                <button onClick={() => handleDelete(device.deviceID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevicePage;
