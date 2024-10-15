import axios from 'axios';
import { BASE_URL } from '../config/config';

export const getServicios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Servicio`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getHistorialCompras = async (id_usuario) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/HistorialCompra/usuario/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historial de compras:', error);
    throw error;
  }
};

export const savePurchase = async (purchaseData) => {
  try {
    console.log(purchaseData);
    const response = await axios.post(`${BASE_URL}/api/HistorialCompra`, purchaseData);
    console.log("response",response);

    return response.data;
  } catch (error) {
    console.error("Error saving purchase:", error);
    throw error;
  }
};

