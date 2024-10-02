// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import DevicePage from './components/DevicePage';
import  AddDevice from './components/AddDevice';
import  OrderPage from './components/OrderPage';
import PrivateRoute from './services/PrivateRoute';
import AddOrderForm from './components/AddOrderForm';
import EditOrderForm from './components/EditOrderForm';
import SignUp from './components/SignUp';  // Corrected import path

function App() {
  return (
    <Router>
      <Routes>
      
      <Route path="/AddOrderForm" element={<AddOrderForm />} />
      {/* <Route path="/orders/userId" element={<OrderPage />} /> Ensure this path matches your setup */}
        <Route path="/OrderPage" element={<OrderPage />} />
        <Route path="/edit/:orderId" element={<EditOrderForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AddDevice" element={<AddDevice />} />
        <Route path="/device" element={<PrivateRoute><DevicePage /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
