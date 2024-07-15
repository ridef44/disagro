import React, { useState, useEffect } from 'react';

const UserForm = ({ onChange }: { onChange: (userInfo: any) => void }) => {

  // manejar los valores de los campos del formulario de usuario -Estados-
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaHora, setFechaHora] = useState('');

  // cambios en la información del usuario al componente padre cada vez que se modifica algún campo
  useEffect(() => {
    onChange({ nombre, apellidos, correo, fechaHora });
  }, [nombre, apellidos, correo, fechaHora]);


 
  return (
    <div className="space-y-6 h-full min-h-80 p-4">
      <div>
        <label htmlFor="nombre" className="block text-md font-semibold text-gray-700">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          placeholder="Introduzca su nombre "
          onChange={(e) => setNombre(e.target.value)} 
          className=" text-sm mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="apellidos" className="block text-md font-semibold text-gray-700">Apellidos:</label>
        <input
          type="text"
          value={apellidos}
          placeholder="Introduzca sus apellidos "
          id="apellidos"
          onChange={(e) => setApellidos(e.target.value)} 
          className=" text-sm mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="correo" className="block text-md font-semibold text-gray-700">Correo electrónico:</label>
        <input
          type="email"
          value={correo}
          placeholder="Introduzca su correo"
          id="correo"
          onChange={(e) => setCorreo(e.target.value)} 
          className=" text-sm mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="fechaHora" className="block text-md font-semibold text-gray-700">Fecha y Hora de Asistencia:</label>
        <input
          type="datetime-local"
          id="fechaHora"
          placeholder="Fecha y hora que asistirá "
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)} 
          className=" text-sm mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>
    </div>
  );
};

export default UserForm;