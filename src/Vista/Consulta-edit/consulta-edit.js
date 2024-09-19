import React, { useState, useEffect } from 'react';
import { Table, Tabs, Button, Input, Space, message, Select } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { getPersonas, deletePersona, updatePersona, getMascotas, deleteMascota, updateMascota } from '../../service/service';

const { Option } = Select;

const getColumnsPersona = (editKey, handleEdit, handleDelete, handleSave, handleCancel, formValues, handleChange) => [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.nombre} onChange={(e) => handleChange(e, 'nombre')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Apellido',
    dataIndex: 'apellido',
    key: 'apellido',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.apellido} onChange={(e) => handleChange(e, 'apellido')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Fecha Nacimiento',
    dataIndex: 'fecha_nacimiento',
    key: 'fecha_nacimiento',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.fecha_nacimiento} onChange={(e) => handleChange(e, 'fecha_nacimiento')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Estatura',
    dataIndex: 'estatura',
    key: 'estatura',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.estatura} onChange={(e) => handleChange(e, 'estatura')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Estado Civil',
    dataIndex: 'estado_civil',
    key: 'estado_civil',
    render: (text, record) => (
      editKey === record.key ? 
      <Select 
        value={formValues.estado_civil} 
        onChange={(value) => handleChange({ target: { value } }, 'estado_civil')}
      >
        <Option value="Soltero">Soltero</Option>
        <Option value="Casado">Casado</Option>
        <Option value="Divorciado">Divorciado</Option>
        <Option value="Viudo">Viudo</Option>
      </Select> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        {editKey === record.key ? (
          <>
            <Button icon={<CheckOutlined />} onClick={() => handleSave(record.key)} />
            <Button icon={<CloseOutlined />} onClick={() => handleCancel()} />
          </>
        ) : (
          <>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record, 'persona')} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key, 'persona')} />
          </>
        )}
      </Space>
    ),
  },
];

const getColumnsMascota = (editKey, handleEdit, handleDelete, handleSave, handleCancel, formValues, handleChange) => [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.nombre} onChange={(e) => handleChange(e, 'nombre')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Edad',
    dataIndex: 'edad',
    key: 'edad',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.edad} onChange={(e) => handleChange(e, 'edad')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Raza',
    dataIndex: 'raza',
    key: 'raza',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.raza} onChange={(e) => handleChange(e, 'raza')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Especie',
    dataIndex: 'especie',
    key: 'especie',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.especie} onChange={(e) => handleChange(e, 'especie')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    render: (text, record) => (
      editKey === record.key ? 
      <Input value={formValues.color} onChange={(e) => handleChange(e, 'color')} /> :
      <Input value={text} disabled />
    ),
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        {editKey === record.key ? (
          <>
            <Button icon={<CheckOutlined />} onClick={() => handleSave(record.key)} />
            <Button icon={<CloseOutlined />} onClick={() => handleCancel()} />
          </>
        ) : (
          <>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record, 'mascota')} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key, 'mascota')} />
          </>
        )}
      </Space>
    ),
  },
];

const ConsultaEdit = () => {
  const [personas, setPersonas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [editKey, setEditKey] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [editType, setEditType] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const result = await getPersonas();
        setPersonas(result.map(persona => ({ ...persona, key: persona.id })));
      } catch (error) {
        message.error('Error al cargar los datos de las personas');
      }
    };

    const fetchMascotas = async () => {
      try {
        const result = await getMascotas();
        setMascotas(result.map(mascota => ({ ...mascota, key: mascota.id })));
      } catch (error) {
        message.error('Error al cargar los datos de las mascotas');
      }
    };

    fetchPersonas();
    fetchMascotas();
  }, []);

  const handleEdit = (record, type) => {
    setEditKey(record.key);
    setFormValues({ ...record });
    setEditType(type);
  };

  const handleChange = (e, field) => {
    setFormValues({
      ...formValues,
      [field]: e.target ? e.target.value : e, // Manejo de select y campos de input
    });
  };

  const handleSave = async (key) => {
    try {
      if (editType === 'persona') {
        await updatePersona(key, formValues);
        const updatedData = personas.map(persona => persona.key === key ? { ...formValues, key } : persona);
        setPersonas(updatedData);
      } else if (editType === 'mascota') {
        await updateMascota(key, formValues);
        const updatedData = mascotas.map(mascota => mascota.key === key ? { ...formValues, key } : mascota);
        setMascotas(updatedData);
      }
      setEditKey(null);
      setFormValues({});
      setEditType(null);
      message.success('Registro actualizado con éxito');
    } catch (error) {
      message.error('Error al actualizar el registro');
    }
  };

  const handleCancel = () => {
    setEditKey(null);
    setFormValues({});
    setEditType(null);
  };

  const handleDelete = async (key, type) => {
    try {
      if (type === 'persona') {
        await deletePersona(key);
        setPersonas(personas.filter(persona => persona.key !== key));
      } else if (type === 'mascota') {
        await deleteMascota(key);
        setMascotas(mascotas.filter(mascota => mascota.key !== key));
      }
      message.success('Registro eliminado con éxito');
    } catch (error) {
      message.error('Error al eliminar el registro');
    }
  };

  const tabItems = [
    {
      key: '1',
      label: 'Persona',
      children: (
        <Table 
          columns={getColumnsPersona(editKey, handleEdit, handleDelete, handleSave, handleCancel, formValues, handleChange)} 
          dataSource={personas} pagination={{ pageSize: 5 }}
        />
      ),
    },
    {
      key: '2',
      label: 'Mascota',
      children: (
        <Table 
          columns={getColumnsMascota(editKey, handleEdit, handleDelete, handleSave, handleCancel, formValues, handleChange)} 
          dataSource={mascotas} pagination={{ pageSize: 5 }}
        />
      ),
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={tabItems} />
  );
};

export default ConsultaEdit;
