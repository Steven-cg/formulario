import React from 'react';
import { Form, Input, InputNumber, Button, Space,message } from 'antd';
import { createMascota } from '../../service/service'; // Asegúrate de que la ruta sea correcta


function FormularioMascota() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Llama al servicio createMascota sin asignar el resultado a una variable
      await createMascota(values);
      // Muestra un mensaje de éxito
      message.success('Mascota registrada exitosamente');
  
      // Resetea el formulario
      form.resetFields();
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      message.error('Error al registrar la mascota. Inténtalo de nuevo.');
    }
  };
  

  return (
    <div>
      <h2>Registro de formulario</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Edad"
          name="edad"
          rules={[{ required: true, message: 'Por favor ingrese la edad' }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Raza"
          name="raza"
          rules={[{ required: true, message: 'Por favor ingrese la raza' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Especie"
          name="especie"
          rules={[{ required: true, message: 'Por favor ingrese la especie' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Por favor ingrese el color' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Registrar Mascota</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormularioMascota;