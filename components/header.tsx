import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-stone-800 py-2 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-white">DISAGRO</h1>
          <h2 className="text-lg text-gray-300 mt-2">Feria de promociones - 2024</h2>
        </div>
        <div className="flex-shrink-0">
          <img
            className="h-12"
            src="https://disagro-s3.s3.us-east-2.amazonaws.com/web-disagro/Disagro-Logo.svg"
            alt="Disagro Logo"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
