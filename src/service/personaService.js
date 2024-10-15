import axios from 'axios';
import { BASE_URL } from '../config/config';

// Servicios de Persona
export const getPersonas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/formulario`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las personas:', error);
    throw error;
  }
};

export const getPersonaById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/formulario/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la persona con ID ${id}:`, error);
    throw error;
  }
};

export const createPersona = async (persona) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/formulario`, persona, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la persona:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updatePersona = async (id, persona) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/formulario/${id}`, persona, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la persona con ID ${id}:`, error);
    throw error;
  }
};

export const deletePersona = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/formulario/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la persona con ID ${id}:`, error);
    throw error;
  }
};
