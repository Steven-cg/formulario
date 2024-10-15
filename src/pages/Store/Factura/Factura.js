// src/page/Facturas/factura.js

import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { getHistorialCompras } from '../../../service/service'; // Ajusta la ruta según tu estructura de archivos

const Factura = () => {
  const [facturas, setFacturas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(null);

  const userId = JSON.parse(localStorage.getItem('userId')) || null;

  useEffect(() => {
    const fetchFacturas = async () => {
      if (userId) {
        const response = await getHistorialCompras(userId);
        setFacturas(response.$values);
      }
    };

    fetchFacturas();
  }, [userId]);

  const handleViewDetails = (factura) => {
    console.log("factura", factura);

    // Extraer los valores correctamente
    const detalleCompra = factura.detalleCompra.$values || [];
    const detalleServicio = factura.detalleServicio.$values || [];

    setDetalle({ 
      ...factura, 
      DetalleCompra: detalleCompra, 
      DetalleServicio: detalleServicio 
    });
    setVisible(true);
};

const formatDate = (fecha) => {
    if (!fecha) return ''; // Manejar caso de fecha nula

    const date = new Date(fecha);
    return date.toISOString().split('T')[0]; // Extrae la parte de la fecha en formato AAAA-MM-DD
  };

  const columns = [
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
        render: (text) => formatDate(text), // Usar la función formatDate
      },
    {
      title: 'Valor Pagado',
      dataIndex: 'valorpagado',
      key: 'valorpagado',
    },
    {
      title: 'Detalles',
      key: 'detalles',
      render: (text, factura) => (
        <Button 
          icon={<EyeOutlined />} 
          onClick={() => handleViewDetails(factura)}
        />
      ),
    },
  ];

  return (
    <div>
      <h1>Facturas del Cliente</h1>
      <Table 
        dataSource={facturas} 
        columns={columns} 
        rowKey="id_historial_compra" 
      />
    <Modal
    title="Detalles de la Factura"
    open={visible}
    onCancel={() => setVisible(false)}
    footer={null}
>
    {detalle && (
        <div>
            <h2>Detalles de la Factura {detalle.id_historial_compra}</h2>
            <h3>Detalle Compra</h3>
            <ul>
                {detalle.DetalleCompra.map((item) => (
                    <li key={item.id_detalle_compra}>
                        {item.productoNombre}: {item.cantidad} x ${item.valor} = ${item.total}
                    </li>
                ))}
            </ul>
            <h3>Detalle Servicio</h3>
            <ul>
                {detalle.DetalleServicio.map((item) => (
                    <li key={item.id_detalle_servicio}>
                        {item.servicioNombre}: {item.valor} ({item.operacion})
                    </li>
                ))}
            </ul>
        </div>
    )}
</Modal>

    </div>
  );
};

export default Factura;
