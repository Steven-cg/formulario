import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { loginUsuario } from '../../service/usuarioService';
import './Login.css';

const SUCCESS_MESSAGE = 'Bienvenido, Steven!';
const ERROR_MESSAGE = 'Credenciales incorrectas.';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login.js
const handleLogin = async (values) => {
  const { usuario_name, password } = values;

  try {
    setLoading(true);
    const response = await loginUsuario({ usuario_name, contrasena: password });

    // Almacenar el token y el ID del usuario en localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.userId); // Asegúrate de que el backend devuelva el userId

    message.success(SUCCESS_MESSAGE);
    setTimeout(() => {
      navigate('/store');
    }, 1000);
  } catch (error) {
    message.error(ERROR_MESSAGE);
  } finally {
    setLoading(false);
  }
};


  const handleRegister = () => {
    navigate('/registro');
  };

  return (
    <div className="login-container">
      <div className="login-image" />
      <div className="login-content">
        <h1 className="shop-title">Veterinario Shop</h1>
        <h2>Iniciar Sesión</h2>
        <Form name="login" onFinish={handleLogin}>
          <Form.Item
            label="Usuario"
            name="usuario_name"
            rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
          >
            <Input placeholder="Ingrese su usuario" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password placeholder="Ingrese su contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Iniciar Sesión
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" onClick={handleRegister} block>
              Registrarse
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
