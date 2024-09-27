import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, DatePicker, Select, Space, message } from 'antd';
import { createPersona, updatePersona, getPersonaById } from '../../service/service';

const { Option } = Select;

function FormularioPersona({ personaId }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (personaId) {
      // Obtener la persona si se está editando
      const fetchPersona = async () => { 
        try {
          const data = await getPersonaById(personaId);
          form.setFieldsValue({
            ...data,
            fecha_nacimiento: data.fecha_nacimiento ? data.fecha_nacimiento.slice(0, 10) : null,
            estatura: data.estatura, // Asume que estatura es un entero
          });
        } catch (error) {
          message.error('Error al cargar los datos de la persona');
        }
      };
      fetchPersona();
    } else {
      form.resetFields();
    }
  }, [personaId, form]);

  const handleSubmit = async (values) => {
    // Convertir estatura a entero
    values.estatura = parseInt(values.estatura, 10);

    // Convertir fecha a formato ISO 8601
    if (values.fecha_nacimiento) {
      values.fecha_nacimiento = values.fecha_nacimiento.format('YYYY-MM-DDTHH:mm:ssZ');
    }

    try {
      if (personaId) {
        // Actualizar una persona existente
        await updatePersona(personaId, values);
        message.success('Persona actualizada con éxito');
      } else {
        // Crear una nueva persona
        await createPersona(values);
        message.success('Persona creada con éxito');
      }
      form.resetFields();
    } catch (error) {
      message.error('Error al guardar la persona');
      console.error(error); // Añadido para depuración
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
          label="Apellido"
          name="apellido"
          rules={[{ required: true, message: 'Por favor ingrese el apellido' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Fecha de Nacimiento"
          name="fecha_nacimiento"
          rules={[{ required: true, message: 'Por favor ingrese la fecha de nacimiento' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Estatura (cm)"
          name="estatura"
          rules={[{ required: true, message: 'Por favor ingrese la estatura' }]}
        >
          <InputNumber min={0} step={1} />
        </Form.Item>

        <Form.Item
          label="Estado Civil"
          name="estadoCivil"
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
          <Space>
            <Button type="primary" htmlType="submit">
              {personaId ? 'Actualizar Persona' : 'Registrar Persona'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormularioPersona;
