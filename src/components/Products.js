import React, { useState } from 'react';
import { Card, Button, message } from 'antd';

const Product = ({ product }) => {
  const [inCart, setInCart] = useState(() => {
    // Check if the product is already in the cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.some((item) => item.id_producto === product.id_producto);
  });

  const handleCartToggle = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (inCart) {
      // Remove from cart
      const updatedCart = cart.filter((item) => item.id_producto !== product.id_producto);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      message.success('Producto quitado del carrito');
    } else {
      // Add to cart with initial quantity of 1
      const cartItem = {
        ...product,
        cantidad: 1, // Initial quantity set to 1
        maxQuantity: product.cantidad, // Set maxQuantity to available quantity
      };
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      message.success('Producto añadido al carrito');
    }

    setInCart(!inCart); // Toggle the cart state
  };

  const imageUrl = product.imagen
    ? require(`../assets/images/producto/${product.imagen}`)
    : 'https://via.placeholder.com/150';

  return (
    <Card
      style={styles.card} // Use styles defined below
      cover={<img alt={product.nombre} src={imageUrl} style={styles.image} />}
    >
      <Card.Meta title={product.nombre} description={`$${product.valor}`} />
      <p style={styles.available}>Cantidad disponible: {product.cantidad}</p>
      <Button onClick={handleCartToggle} style={styles.button}>
        {inCart ? 'Quitar del carrito' : 'Añadir al carrito'}
      </Button>
    </Card>
  );
};

const styles = {
  card: {
    width: 350,
    height: 350,
    margin: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    objectFit: 'cover',
  },
  available: {
    margin: '8px 0',
  },
  button: {
    marginTop: 'auto',
  },
};

export default Product;
