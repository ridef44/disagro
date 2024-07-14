// Importa los hooks useState y useEffect de React
import React, { useState, useEffect } from 'react';

// Componente UserForm que recibe una función onChange como prop para comunicar cambios al componente padre
const UserForm = ({ onChange }: { onChange: (userInfo: any) => void }) => {
  // Estados para manejar los valores de los campos del formulario de usuario
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaHora, setFechaHora] = useState('');

  // Efecto para emitir cambios en la información del usuario al componente padre cada vez que se modifica algún campo
  useEffect(() => {
    onChange({ nombre, apellidos, correo, fechaHora });
  }, [nombre, apellidos, correo, fechaHora]);

  // Renderiza el formulario para la entrada de datos del usuario
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Actualiza el estado del nombre cuando cambia el input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos:</label>
        <input
          type="text"
          id="apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)} // Actualiza el estado de los apellidos cuando cambia el input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado del correo electrónico cuando cambia el input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="fechaHora" className="block text-sm font-medium text-gray-700">Fecha y Hora:</label>
        <input
          type="datetime-local"
          id="fechaHora"
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)} // Actualiza el estado de la fecha y hora cuando cambia el input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
    </div>
  );
};

// Exporta el componente para su uso en otros lugares de la aplicación
export default UserForm;
