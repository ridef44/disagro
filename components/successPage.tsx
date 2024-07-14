"use client"; // Indica que este componente se ejecuta en el cliente

import React from 'react';
import { FaSeedling } from "react-icons/fa";
//Para uso de rutas
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/'); // Redirige a la página inicial
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center relative">
      <img 
        className="h-24 absolute top-0 left-0 mt-8 ml-4 mb-8"
        src="https://disagro-s3.s3.us-east-2.amazonaws.com/web-disagro/logotipo-disagro-verde.png"
        alt="Logotipo Disagro"
      />
      <h1 className="text-3xl font-bold text-green-900 mb-8 text-center mt-12">Registro Exitoso</h1>
      <FaSeedling className="text-green-700 text-6xl mb-4" />
      <p className="text-center text-lg mb-8">Gracias por registrarte. Hemos recibido tu información con éxito.</p>
      <button
        onClick={handleReturnHome}
        className="py-2 px-4 bg-green-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-75"
      >
        Regresar
      </button>
    </div>
  );
};

export default SuccessPage;
