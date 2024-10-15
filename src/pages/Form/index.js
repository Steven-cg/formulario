import React from 'react';
import { Tabs } from 'antd';
import PersonaForm from './Persona/persona';
import MascotaTable from './Mascota/mascota';

const FormsIndex = () => {
  const tabItems = [
    {
      key: "1",
      label: "Datos Personales",
      children: <PersonaForm />
    },
    {
      key: "2",
      label: "Mascota",
      children: <MascotaTable />
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Editar Información</h1>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};

export default FormsIndex;
