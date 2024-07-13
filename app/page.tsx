"use client";

import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import ProductSelectionForm from '../components/ProductSelectionForm';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleUserInfoChange = (info: any) => {
    setUserInfo(info);
  };

  const handleProductSelectionChange = (selected: number[]) => {
    setSelectedProducts(selected);
    const total = selected.reduce((sum, productId) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price : 0);
    }, 0);
    setTotalPrice(total);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userInfo || selectedProducts.length === 0) {
      alert('Por favor, complete toda la información y seleccione al menos un producto.');
      return;
    }

    try {
      // Crear usuario
      const userResponse = await axios.post('http://localhost:4000/api/usuarios', {
        nombre: userInfo.nombre,
        apellidos: userInfo.apellidos,
        correo: userInfo.correo
      });
      const usuarioId = userResponse.data.data.id;

      // Crear asistencia
      const asistenciaResponse = await axios.post('http://localhost:4000/api/asistencias', {
        usuarioId,
        fechaHora: userInfo.fechaHora,
        montoFinal: totalPrice
      });
      const asistenciaId = asistenciaResponse.data.data.id;

      // Registrar productos
      await axios.post('http://localhost:4000/api/asistenciaProductos', {
        asistenciaId,
        productos: selectedProducts
      });

      alert('Información registrada con éxito');
    } catch (error) {
      console.error('Error al registrar la información:', error);
      alert('Hubo un error al registrar la información. Por favor, verifica los registros para más detalles.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Evento de Promociones Anuales</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. Ingrese su información</h2>
            <UserForm onChange={handleUserInfoChange} />
          </div>
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Seleccione Servicios y Productos de su interés</h2>
            <ProductSelectionForm products={products} onSelectionChange={handleProductSelectionChange} />
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold">Total: Q. {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Enviar Información Completa
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
