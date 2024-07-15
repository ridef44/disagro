"use client"; // Indica que este componente se ejecuta en el cliente

import React from 'react';
import { FaSeedling } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/'); // Redirige a la página inicial
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <img 
          className="h-16 sm:h-24 mx-auto mb-8"
          src="https://disagro-s3.s3.us-east-2.amazonaws.com/web-disagro/logotipo-disagro-verde.png"
          alt="Logotipo Disagro"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-900 text-center mb-4">Registro Exitoso</h1>
        <FaSeedling className="text-green-700 text-4xl sm:text-6xl mb-4 mx-auto" />
        <p className="text-center text-base sm:text-lg mb-8">Gracias por registrarte. Hemos recibido tu información con éxito.</p>
        <button
          onClick={handleReturnHome}
          className="w-full py-2 px-4 bg-green-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-75"
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
