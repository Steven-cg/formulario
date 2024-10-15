import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, DatePicker, Select, Space, message, Row, Col, Card } from 'antd';
import { createUsuario, updateUsuario, getUsuarioById } from '../../../service/usuarioService'; // Asegúrate de que la ruta es correcta
import dayjs from 'dayjs';

const { Option } = Select;

const FormularioPersona = ({ personaId }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (personaId) {
      // Fetch user data for editing
      const fetchUsuario = async () => {
        try {
          const data = await getUsuarioById(personaId);
          form.setFieldsValue({
            ...data,
            fecha_nacimiento: data.fecha_nacimiento ? dayjs(data.fecha_nacimiento) : null, // Parse date correctly
          });
        } catch (error) {
          message.error('Error al cargar los datos del usuario');
        }
      };
      fetchUsuario();
    } else {
      form.resetFields();
    }
  }, [personaId, form]);

  const handleSubmit = async (values) => {
    try {
      values.estatura = parseFloat(values.estatura).toFixed(2); // Asegúrate de que estatura es decimal
      if (values.fecha_nacimiento) {
        values.fecha_nacimiento = values.fecha_nacimiento.format('YYYY-MM-DDTHH:mm:ssZ'); // Formatear fecha
      }

      if (personaId) {
        await updateUsuario(personaId, values); // Usar updateUsuario
        message.success('Usuario actualizado con éxito');
      } else {
        await createUsuario(values); // Usar createUsuario
        message.success('Usuario registrado con éxito');
      }
      form.resetFields(); // Limpiar el formulario después de guardar
    } catch (error) {
      message.error('Error al guardar el usuario');
      console.error('Error de guardado:', error); // Mejora del registro de errores
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card>
          <h2 style={{ textAlign: 'center' }}>{personaId ? 'Editar Usuario' : 'Registro de Usuario'}</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Cédula"
              name="cedula"
              rules={[{ required: true, message: 'Por favor ingrese la cédula' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Apellido"
              name="apellido"
              rules={[{ required: true, message: 'Por favor ingrese el apellido' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Correo Electrónico"
              name="correo"
              rules={[
                { type: 'email', message: 'Por favor ingrese un correo válido' },
                { required: true, message: 'Por favor ingrese el correo electrónico' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nombre de Usuario"
              name="usuario_name" // Cambia esto a 'usuario_name' si así está en tu modelo
              rules={[{ required: true, message: 'Por favor ingrese el nombre de usuario' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="contrasena"
              rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
              rules={[{ required: true, message: 'Por favor ingrese la fecha de nacimiento' }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Estatura (m)"
              name="estatura"
              rules={[{ required: true, message: 'Por favor ingrese la estatura' }]}
            >
              <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Estado Civil"
              name="estado_civil" // Asegúrate que el nombre sea exactamente igual al modelo
              rules={[{ required: true, message: 'Por favor seleccione el estado civil' }]}
            >
              <Select placeholder="Selecciona el estado civil">
                <Option value="soltero">Soltero</Option>
                <Option value="casado">Casado</Option>
                <Option value="divorciado">Divorciado</Option>
                <Option value="viudo">Viudo</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit" block>
                  {personaId ? 'Actualizar Usuario' : 'Registrar Usuario'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default FormularioPersona;
