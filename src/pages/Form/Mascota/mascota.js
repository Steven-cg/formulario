import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, message, Modal } from 'antd';
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getMascotas,  createMascota,  updateMascota,  deleteMascota,} from '../../../service/mascotaService';

const Mascota = () => {
  const [mascotas, setMascotas] = useState(null); 
  const [editKey, setEditKey] = useState(null);
  const [newMascota, setNewMascota] = useState(false);
  const [formValues, setFormValues] = useState({nombre: '',edad: '',raza: '',especie: ''});
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIdUsuario(parseInt(storedUserId, 10));
      fetchMascotas(parseInt(storedUserId, 10));
    }
  }, []);

  const fetchMascotas = async (usuarioId) => {
      const data = await getMascotas(usuarioId);
      setMascotas(data.$values);
  };

  const handleEdit = (record) => {
    setEditKey(record.id_mascota);
    setFormValues({ ...record });
  };

  const confirmDelete = (key) => {
    Modal.confirm({
      title: '¿Está seguro de que desea eliminar esta mascota?',
      content: 'Esta acción es irreversible y eliminará permanentemente la mascota.',
      okText: 'OK',
      cancelText: 'Cancelar',
      onOk: () => handleDelete(key),
    });
  };

  const handleDelete = async (key) => {
    try {
      await deleteMascota(key);
      setMascotas(mascotas.filter((mascota) => mascota.id_mascota !== key));
      message.success('Mascota eliminada con éxito.');
    } catch (error) {
      message.error('Error al eliminar la mascota.');
    }
  };

  const handleSave = async () => {
    try {
      if (newMascota) {
        const newRecord = { ...formValues, id_usuario: idUsuario };
        const response = await createMascota(newRecord);
        setMascotas([...mascotas, response]);
        message.success('Nueva mascota guardada con éxito.');
      } else {
        const updatedMascota = { ...formValues, id_mascota: editKey };
        await updateMascota(editKey, updatedMascota);
        setMascotas(mascotas.map((mascota) => (mascota.id_mascota === editKey ? updatedMascota : mascota)));
        message.success('Mascota actualizada con éxito.');
      }
      handleCancel();
    } catch (error) {
      message.error('Error al guardar la mascota.');
    }
  };

  const handleCancel = () => {
    setEditKey(null);
    setNewMascota(false);
    setFormValues({ nombre: '', edad: '', raza: '', especie: '' });
  };

  const handleChange = (e, field) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const handleAddMascota = () => {
    setNewMascota(true);
    setFormValues({ nombre: '', edad: '', raza: '', especie: '' });
  };

  const columns = getColumnsMascota(editKey, newMascota, handleEdit, confirmDelete, handleSave, handleCancel, formValues, handleChange);

  return (
    <div>
      {!newMascota && (
        <Button type="primary" onClick={handleAddMascota}>
          Agregar Nueva Mascota
        </Button>
      )}
      {newMascota && (
        <>
          <Button type="primary" onClick={handleSave}>
            Guardar
          </Button>
          <Button onClick={handleCancel}>
            Cancelar
          </Button>
        </>
      )}
    <Table
      columns={columns}
      dataSource={newMascota ? [...(mascotas || []), { id_mascota: 'new', ...formValues }] : mascotas || []}
      rowKey="id_mascota"
    />

    </div>
  );
};

const getColumnsMascota = (editKey, newMascota, handleEdit, confirmDelete, handleSave, handleCancel, formValues, handleChange) => [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text, record) => (
      editKey === record.id_mascota || (newMascota && record.id_mascota === 'new') ? 
      <Input value={formValues.nombre} onChange={(e) => handleChange(e, 'nombre')} /> :
      text
    ),
  },
  {
    title: 'Edad',
    dataIndex: 'edad',
    key: 'edad',
    render: (text, record) => (
      editKey === record.id_mascota || (newMascota && record.id_mascota === 'new') ? 
      <Input value={formValues.edad} onChange={(e) => handleChange(e, 'edad')} /> :
      text
    ),
  },
  {
    title: 'Raza',
    dataIndex: 'raza',
    key: 'raza',
    render: (text, record) => (
      editKey === record.id_mascota || (newMascota && record.id_mascota === 'new') ? 
      <Input value={formValues.raza} onChange={(e) => handleChange(e, 'raza')} /> :
      text
    ),
  },
  {
    title: 'Especie',
    dataIndex: 'especie',
    key: 'especie',
    render: (text, record) => (
      editKey === record.id_mascota || (newMascota && record.id_mascota === 'new') ? 
      <Input value={formValues.especie} onChange={(e) => handleChange(e, 'especie')} /> :
      text
    ),
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        {editKey === record.id_mascota || (newMascota && record.id_mascota === 'new') ? (
          <>
            <Button icon={<CheckOutlined />} onClick={handleSave} />
            <Button icon={<CloseOutlined />} onClick={handleCancel} />
          </>
        ) : (
          <>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            <Button icon={<DeleteOutlined />} onClick={() => confirmDelete(record.id_mascota)} />
          </>
        )}
      </Space>
    ),
  },
];

export default Mascota;
