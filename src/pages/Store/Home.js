//src\pages\Store\Home.js
import React, { useEffect, useState } from 'react';
import Product from '../../components/Products';
import { Row, Col } from 'antd';
import { getProducts } from '../../service/productService'; // Adjust the import according to your service file


const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(); // Supone que esto obtiene los datos del producto
      console.log('Fetched products:', data); // Verifica la estructura de los datos

      // Accede a los productos a través de $values
      setProducts(data.$values); // Asegúrate de acceder correctamente a los productos
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Bienvenido a la Tienda</h1>
      <Row gutter={16}>
        {Array.isArray(products) && products.length > 0 ? ( // Verifica si products es un arreglo y tiene elementos
          products.map((product) => (
            <Col span={8} key={product.id_producto}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <p>No hay productos disponibles.</p> // Mensaje alternativo si no hay productos
        )}
      </Row>
    </div>
  );
};

export default Home;