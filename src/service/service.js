import axios from 'axios';

const API_URL_PERSONA = 'http://localhost:5028/api/formulario';
const API_URL_MASCOTA = 'http://localhost:5028/api/formularioMascota';

// Servicios de Persona
export const getPersonas = async () => {
  try {
    const response = await axios.get(API_URL_PERSONA);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las personas:', error);
    throw error;
  }
};

export const getPersonaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_PERSONA}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la persona con ID ${id}:`, error);
    throw error;
  }
};

export const createPersona = async (persona) => {
  try {
    const response = await axios.post(API_URL_PERSONA, persona, {
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
    const response = await axios.put(`${API_URL_PERSONA}/${id}`, persona, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la persona con ID ${id}:`, error);
    throw error;
  }
};

export const deletePersona = async (id) => {
  try {
    await axios.delete(`${API_URL_PERSONA}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la persona con ID ${id}:`, error);
    throw error;
  }
};

// Servicios de Mascota
export const getMascotas = async () => {
  try {
    const response = await axios.get(API_URL_MASCOTA);
      return response.data;
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    throw error;
  }
};

export const getMascotaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_MASCOTA}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la mascota con ID ${id}:`, error);
    throw error;
  }
};

export const createMascota = async (mascota) => {
  try {
    const response = await axios.post(API_URL_MASCOTA, mascota, {
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
    const response = await axios.put(`${API_URL_MASCOTA}/${id}`, mascota, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la mascota con ID ${id}:`, error);
    throw error;
  }
};

export const deleteMascota = async (id) => {
  try {
    await axios.delete(`${API_URL_MASCOTA}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la mascota con ID ${id}:`, error);
    throw error;
  }
};