"use client";

import React, { useState, useEffect } from 'react';

const UserForm = ({ onChange }: { onChange: (userInfo: any) => void }) => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaHora, setFechaHora] = useState('');

  useEffect(() => {
    onChange({ nombre, apellidos, correo, fechaHora });
  }, [nombre, apellidos, correo, fechaHora]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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
          onChange={(e) => setApellidos(e.target.value)}
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
          onChange={(e) => setCorreo(e.target.value)}
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
          onChange={(e) => setFechaHora(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
    </div>
  );
};

export default UserForm;
