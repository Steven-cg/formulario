import axios from 'axios';
import { BASE_URL } from '../config/config';

// Servicios de Mascota
export const getMascotas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/formularioMascota`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    throw error;
  }
};

export const getMascotaById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/formularioMascota/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la mascota con ID ${id}:`, error);
    throw error;
  }
};

export const createMascota = async (mascota) => {
  console.log("mascota",mascota);
  try {
    const response = await axios.post(`${BASE_URL}/api/formularioMascota`, mascota, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la mascota:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateMascota = async (id, mascota) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/formularioMascota/${id}`, mascota, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la mascota con ID ${id}:`, error);
    throw error;
  }
};

export const deleteMascota = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/formularioMascota/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la mascota con ID ${id}:`, error);
    throw error;
  }
};
