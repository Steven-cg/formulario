import axios from 'axios';
import { BASE_URL } from '../config/config';

// Interceptor to add JWT token to all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User Services
export const getUsuarioById = async (id_usuario) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving user with ID ${id_usuario}:`, error);
    throw error;
  }
};

export const createUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/register`, usuario, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateUsuario = async (id_usuario, usuario) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/users/${id_usuario}`, usuario, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id_usuario}:`, error);
    throw error;
  }
};

export const deleteUsuario = async (id_usuario) => {
  try {
    await axios.delete(`${BASE_URL}/api/users/${id_usuario}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id_usuario}:`, error);
    throw error;
  }
};

export const loginUsuario = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};
