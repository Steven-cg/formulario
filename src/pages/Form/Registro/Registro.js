// import React from 'react';
// import { Tabs } from 'antd';
// import FormularioPersona from '../Persona/formulario_persona'; // Asegúrate de que esta ruta sea correcta
// import FormularioMascota from '../Mascota/formulario_mascota'; // Asegúrate de que esta ruta sea correcta

// const Registro = () => {
//     const items = [
//       {
//         key: '1',
//         label: 'Registro de Usuario',
//         children: <FormularioPersona />,
//       },
//       {
//         key: '2',
//         label: 'Registro de Mascota',
//         children: <FormularioMascota />,
//       },
//     ];
  
//     return (
//       <div>
//         <h2>Registro</h2>
//         <Tabs defaultActiveKey="1" items={items} />
//       </div>
//     );
//   };
  
//   export default Registro;


import React from 'react';
import FormularioPersona from '../Persona/formulario_persona'; // Asegúrate de que esta ruta sea correcta

const Registro = () => {
  return (
    <div>
      <FormularioPersona />
    </div>
  );
};

export default Registro;
