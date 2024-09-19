// src/App.js
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Layout } from 'antd';
import FormularioPersona from './Vista/Persona/formulario_persona';
import FormularioMascota from './Vista/Mascota/formulario_mascota';
import ConsultaEdit from './Vista/Consulta-edit/consulta-edit';

const { Content, Sider } = Layout;

function App() {
  const [formVisible, setFormVisible] = useState(null);
  const navigate = useNavigate();

  const showForm = (formType) => {
    setFormVisible(formType);
    if (formType === 'persona') {
      navigate('/persona');
    } else if (formType === 'mascota') {
      navigate('/mascota');
    }
  };

  const hideForm = () => {
    setFormVisible(null);
    navigate('/');
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={300} className="site-layout-background">
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h1 style={{ marginBottom: '10px', color: 'white' }}>Bienvenido</h1>
          {!formVisible && <h2 style={{ color: 'white', marginBottom: '20px' }}>Selecciona un formulario para continuar</h2>}
          <Button
            type="primary"
            size="large"
            style={{ marginBottom: '10px' }}
            onClick={() => showForm('persona')}
          >
            Registrar Persona
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ marginBottom: '10px' }}
            onClick={() => showForm('mascota')}
          >
            Registrar Mascota
          </Button>
          {formVisible && (
            <Button
              type="default"
              size="large"
              style={{ marginTop: 'auto' }}
              onClick={hideForm}
            >
              Ocultar Formulario
            </Button>
          )}
        </div>
      </Sider>
      <Layout style={{ padding: '0 24px', minHeight: 280 }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/" element={<ConsultaEdit />} />
            <Route path="/persona" element={formVisible === 'persona' ? <FormularioPersona /> : null} />
            <Route path="/mascota" element={formVisible === 'mascota' ? <FormularioMascota /> : null} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
