import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, DatePicker } from 'antd';
import { getUsuarioById, updateUsuario } from '../../../service/usuarioService'; 
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const PersonaForm = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: null, // Cambiado a null para manejarlo con DatePicker
    estatura: '',
    estado_civil: '',
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Obtener el ID del usuario del localStorage
    if (userId) {
      // Llamada al servicio para obtener los datos del usuario
      getUsuarioById(userId)
        .then((data) => {
          setFormValues({
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            // Se convierte la fecha a un objeto moment
            fecha_nacimiento: data.fecha_nacimiento ? moment(data.fecha_nacimiento) : null,
            estatura: data.estatura || '',
            estado_civil: data.estado_civil || '',
          });
        })
        .catch((error) => {
          message.error('Error al cargar los datos del usuario');
          console.error(error);
        });
    }
  }, []);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e, key) => {
    setFormValues({ ...formValues, [key]: e.target ? e.target.value : e });
  };

  // Manejar cambios en el Select
  const handleSelectChange = (value) => {
    setFormValues({ ...formValues, estado_civil: value });
  };

  // Manejar cambios en la fecha
  const handleDateChange = (date, dateString) => {
    setFormValues({ ...formValues, fecha_nacimiento: date });
  };

  // Guardar cambios del formulario
  const handleSave = () => {
    const userId = localStorage.getItem('userId'); // Obtener el ID del usuario
    
    console.log("Datos enviados:", { userId, formValues }); // Log para verificar datos

    updateUsuario(userId, {
      ...formValues,
      fecha_nacimiento: formValues.fecha_nacimiento ? formValues.fecha_nacimiento.format('YYYY-MM-DD') : null // Formato a enviar
    })
      .then(() => {
        message.success('Datos actualizados correctamente');
        setEditMode(false);
      })
      .catch((error) => {
        message.error('Error al actualizar los datos');
        console.error("Error al actualizar usuario:", error); // Log del error para mejor depuración
      });
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Nombre">
        <Input
          value={formValues.nombre}
          onChange={(e) => handleChange(e, 'nombre')}
          disabled={!editMode}
        />
      </Form.Item>
      <Form.Item label="Apellido">
        <Input
          value={formValues.apellido}
          onChange={(e) => handleChange(e, 'apellido')}
          disabled={!editMode}
        />
      </Form.Item>
      <Form.Item label="Fecha de Nacimiento">
        <DatePicker
          value={formValues.fecha_nacimiento} // Usar DatePicker aquí
          onChange={handleDateChange}
          disabled={!editMode}
        />
      </Form.Item>
      <Form.Item label="Estatura">
        <Input
          value={formValues.estatura}
          onChange={(e) => handleChange(e, 'estatura')}
          disabled={!editMode}
        />
      </Form.Item>
      <Form.Item label="Estado Civil">
        <Select
          value={formValues.estado_civil}
          onChange={handleSelectChange}
          disabled={!editMode}
        >
          <Option value="Soltero">Soltero</Option>
          <Option value="Casado">Casado</Option>
          <Option value="Divorciado">Divorciado</Option>
          <Option value="Viudo">Viudo</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => setEditMode(true)} disabled={editMode}>
          Editar
        </Button>
        {editMode && (
          <>
            <Button type="primary" onClick={handleSave} style={{ marginLeft: 10 }}>
              Guardar
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
              Cancelar
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default PersonaForm;
