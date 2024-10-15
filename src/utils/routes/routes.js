import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Home from '../../pages/Store/Home';
import FormsIndex from '../../pages/Form/index'; // Asegúrate de que el archivo sea Forms y no Form
import Registro from '../../pages/Form/Registro/Registro';
import Factura from '../../pages/Store/Factura/Factura'; 
import Cart from '../../pages/Store/Cart/Cart'; 
import Layout from '../../components/Layout/Layout';
import PrivateRoute from '../../components/PrivateRoute'; 


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/registro" element={
        <Registro />
    } /> 

    <Route path="/store" element={
      <PrivateRoute>
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
    } />
    
    <Route path="/edit-profile" element={
      <PrivateRoute>
        <Layout>
          <FormsIndex />
        </Layout>
      </PrivateRoute>
    } />

       <Route path="/cart" element={
      <PrivateRoute>
        <Layout>
          <Cart />
        </Layout>
      </PrivateRoute>
    } />

    <Route path="/factura" element={
          <PrivateRoute>
            <Layout>
              <Factura />
            </Layout>
          </PrivateRoute>
        } />
  </Routes>
);

export default AppRoutes;