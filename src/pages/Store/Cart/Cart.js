import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Space, Modal, Typography, message } from 'antd';
import { getServicios, savePurchase } from '../../../service/service';

const { Title } = Typography;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [services, setServices] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to calculate service charges based on the total value
  const calculateServiceCharges = useCallback((totalValue) => {
    return services.reduce((acc, service) => {
      return service.otro === '+' ? acc + (totalValue * service.valor) : acc - (totalValue * service.valor);
    }, 0);
  }, [services]);

  // Fetch services and cart from localStorage
  const fetchServices = useCallback(async () => {
    try {
      const servicesData = await getServicios();
      if (servicesData?.$values && Array.isArray(servicesData.$values)) {
        setServices(servicesData.$values);
      } else {
        console.error("Los datos de servicios no tienen el formato esperado:", servicesData);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, []);

  // Calculate total and subtotal whenever cart changes
  const calculateTotal = useCallback((cartItems) => {
    const totalValue = cartItems.reduce((sum, item) => sum + (item.valor * item.cantidad), 0);
    const charges = calculateServiceCharges(totalValue);
    setSubtotal(totalValue);
    setTotal(totalValue + charges);
  }, [calculateServiceCharges]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const userId = JSON.parse(localStorage.getItem('userId')) || null;
    setUser(userId);
    setCart(storedCart);
    fetchServices();
    calculateTotal(storedCart);
  }, [fetchServices, calculateTotal]); // Added dependencies here

  // Calculate total whenever the cart changes
  useEffect(() => {
    calculateTotal(cart);
  }, [cart, calculateTotal]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map(item => {
      if (item.id_producto === id) {
        const newQuantity = item.cantidad + change;
        if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
          return { ...item, cantidad: newQuantity };
        }
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id_producto !== id);
    updateCart(updatedCart);
    message.success('Elemento eliminado del carrito'); // Message for item removal
  };

  const handlePurchase = async () => {
    const purchaseData = {
      id_usuario: user,
      valorapagar: total,
      valorpagado: total,
      valordevuelto: 0,
      estado: 'A',
      ip: '192.168.0.1',
      detalle_compra: cart.map(item => ({
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        valor: item.valor,
        total: item.valor * item.cantidad
      })),
      detalle_servicio: services.map(service => ({
        id_servicio: service.id_servicio,
        valor: service.valor,
        operacion: service.otro
      }))
    };

    try {
      const response = await savePurchase(purchaseData);
      console.log("Purchase saved successfully!", response);
      localStorage.removeItem('cart');
      setCart([]);
      setSubtotal(0);
      setTotal(0);
      setIsModalVisible(false);
      message.success('Compra realizada con éxito! Puede ver su historial en la sección de facturas.'); // Success message
    } catch (error) {
      console.error("Error saving purchase:", error.response ? error.response.data : error);
      message.error('Error al realizar la compra.'); // Error message
    }
  };

  
  const showModal = () => {
    // Verifica si el carrito está vacío
    if (cart.length === 0) {
      message.error('No puedes abrir el modal sin productos en el carrito.');
      return; // Evita abrir el modal si no hay productos
    }
  
    setIsModalVisible(true); // Abre el modal solo si hay productos
  };

  const handleOk = async () => {
    await handlePurchase();
  };

  const handleCancel = () => setIsModalVisible(false);

  const columns = [
    {
      title: 'Nombre del producto',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Cantidad',
      key: 'cantidad',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleQuantityChange(record.id_producto, -1)} disabled={record.cantidad <= 1}>
            -
          </Button>
          <span>{`${record.cantidad}/${record.maxQuantity}`}</span>
          <Button onClick={() => handleQuantityChange(record.id_producto, 1)} disabled={record.cantidad >= record.maxQuantity}>
            +
          </Button>
        </Space>
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'valor',
      key: 'valor',
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => `$${(record.valor * record.cantidad).toFixed(2)}`,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Button type="danger" onClick={() => handleRemoveItem(record.id_producto)}>
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={1}>Carrito de Compras</Title>
      <Table
        columns={columns}
        dataSource={cart}
        rowKey="id_producto"
        pagination={false}
      />

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
          <h2>Subtotal:</h2>
          <h2>${subtotal.toFixed(2)}</h2>
        </div>

        {Array.isArray(services) && services.length > 0 && services.map(service => (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }} key={service.id_servicio}>
            <h3>{service.nombre} ({service.concepto}):</h3>
            <h3>{service.otro === '+' ? '+' : '-'}${(subtotal * service.valor).toFixed(2)}</h3>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', borderTop: '1px solid #ddd', marginTop: 10 }}>
          <h2>Total:</h2>
          <h2>${total.toFixed(2)}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button type="primary" onClick={showModal}>
          Realizar Compra
        </Button>
      </div>

      <Modal
        title="Confirmación de compra"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Sí"
        cancelText="No"
      >
        <p>¿Estás seguro de que deseas realizar la compra?</p>
      </Modal>
    </div>
  );
};

export default Cart;
