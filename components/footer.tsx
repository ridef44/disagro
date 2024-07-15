import React from 'react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 py-2">
      <div className="container mx-auto text-center text-white">
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/disagro.corp" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.facebook.com/disagro.corp" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.youtube.com/@disagro8234" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaYoutube size={24} />
          </a>
        </div>
        <p className="mt-4">© 2024 DISAGRO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
