// src/components/Layout.js

import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Layout.css'; // Import the CSS file

const { Header, Content } = Layout;

const Layouts = ({ children }) => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false); // State to control menu visibility

  // Define the menu items as an array
  const menuItems = [
    {
      key: '1',
      label: 'Editar Información',
      onClick: () => {
        setMenuVisible(false);
        navigate('/edit-profile');
      },
    },
    {
      key: '2',
      label: 'Shop',
      onClick: () => {
        setMenuVisible(false);
        navigate('/store');
      },
    },
    {
      key: '3',
      label: 'Carrito',
      onClick: () => {
        setMenuVisible(false);
        navigate('/cart');
      },
    },
    {
      key: '4',
      label: 'Facturas',
      onClick: () => {
        setMenuVisible(false);
        navigate('/factura');
      },
    },
    {
      key: '5',
      label: 'Cerrar Sesión',
      onClick: () => {
        setMenuVisible(false);
        localStorage.removeItem('token'); // Elimina el token
        navigate('/'); // Redirige a la página de inicio
      },
    },
  ];

  // Handle avatar click to toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="user-info">Un gusto volverte a ver</div>
        <div style={{ position: 'relative' }}>
          <Avatar 
            icon={<UserOutlined />} 
            className="avatar" 
            onClick={toggleMenu} 
          />
          {menuVisible && (
            <Menu
              items={menuItems} // Use the items prop instead of children
              className="menu"
              selectable={false} // Prevent selection of menu items
            />
          )}
        </div>
      </Header>
      <Content className="site-layout-content">
        {children}
      </Content>
    </Layout>
  );
};

export default Layouts;
