"use client"; // Indica que este componente se ejecuta en el cliente

import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm'; // Importa el formulario de usuario
import ProductSelectionForm from '../components/ProductSelectionForm'; // Importa el formulario de selección de productos
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

// Importa el CSS de react-toastify para los estilos
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

//Para uso de rutas
import { useRouter } from 'next/navigation';

// Define la interfaz para los productos
interface Product {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  type: string;  // 'producto' o 'servicio'
}

const Home = () => {
  // Define los estados para la información del usuario, productos seleccionados, precio total y la lista de productos
  const [userInfo, setUserInfo] = useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();


  // useEffect para obtener los productos de la API cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        setProducts(response.data.data); // Actualiza el estado de productos con los datos obtenidos
      } catch (error) {
        console.error("Error fetching products:", error); // Manejo de errores
      }
    };

    fetchProducts();
  }, []);

  // Maneja los cambios en la información del usuario
  const handleUserInfoChange = (info: any) => {
    setUserInfo(info);
  };


  const [discountMessage, setDiscountMessage] = useState("");
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState<number>(0);  
  
  const handleProductSelectionChange = (selected: number[]) => {
    setSelectedProducts(selected);
    const selectedItems = products.filter(p => selected.includes(p.id));
  
    const totalServices = selectedItems.filter(p => p.type === 'servicio');
    const totalProducts = selectedItems.filter(p => p.type === 'producto');
  
    let total = 0;
    let totalDiscountPercentage = 0; // Acumulador para el porcentaje de descuento
    let message = "";
  
    // Cálculo para servicios
    if (totalServices.length >= 2) {
      const totalPriceServices = totalServices.reduce((acc, curr) => acc + curr.price, 0);
      if (totalPriceServices > 1500) {
        totalDiscountPercentage += 0.05; // Sumar al descuento total
        message += "5% de descuento por más de Q.1,500 en servicios. \n";
      } else {
        totalDiscountPercentage += 0.03; // Sumar al descuento total
        message += "3% de descuento por seleccionar 2 o más servicios. \n";
      }
      total += totalPriceServices;
    }
  
    // Cálculo para productos
    if (totalProducts.length >= 5) {
      totalDiscountPercentage += 0.05; // Sumar al descuento total
      message += "5% de descuento por seleccionar 5 o más productos. \n";
    } else if (totalProducts.length >= 3) {
      totalDiscountPercentage += 0.03; // Sumar al descuento total
      message += "3% de descuento por seleccionar 3 o más productos. \n";
    }
    total += totalProducts.reduce((acc, curr) => acc + curr.price, 0);
  
    // Asegúrate de que el descuento total no exceda el 10%
    totalDiscountPercentage = Math.min(totalDiscountPercentage, 0.10);
  
    // Guarda el total antes de aplicar el descuento
    setTotalBeforeDiscount(total);
  
    // Aplicar el descuento acumulado
    const discountedTotal = total * (1 - totalDiscountPercentage);
    setTotalPrice(discountedTotal);
    setDiscountMessage(message);
  };
  

  // Maneja el envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verifica si la información del usuario y los productos seleccionados están completos
    if (!userInfo || selectedProducts.length === 0) {
      toast.info('Por favor, complete toda la información y seleccione al menos un producto.');
      return;
    }
    try {
      // Crear usuario
      const userResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
        nombre: userInfo.nombre,
        apellidos: userInfo.apellidos,
        correo: userInfo.correo
      });
      const usuarioId = userResponse.data.data.id;

      // Crear asistencia
      const asistenciaResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/asistencias`, {
        usuarioId,
        fechaHora: userInfo.fechaHora,
        montoFinal: totalPrice
      });
      const asistenciaId = asistenciaResponse.data.data.id;

      // Registrar productos seleccionados
      for (const productoId of selectedProducts) {
        console.log(`Enviando producto con ID ${productoId} para la asistencia con ID ${asistenciaId}`);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/seleccionProducto`, {
          asistenciaId,
          productoId
        });
      }

      toast.success('Información registrada con éxito');

      setTimeout(() => {
        router.push('/success'); // Redirige a la página de éxito después de 2 segundos
      }, 4000);




    } catch (error) {
      console.error('Error al registrar la información:', error);
      toast.warning('El correo ingresado ya se encuentra registrado.');
    }
  };

  return (
   
  
    <div className="bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8 my-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-stretch gap-8">
            <div className="w-full lg:w-5/12 bg-white p-6 rounded-lg shadow-lg flex flex-col h-full">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex">

              <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full mr-4">
                  1
                </div>
                Ingrese su información</h2>
              <UserForm onChange={handleUserInfoChange} />
            </div>
            <div className="w-full lg:w-5/12 bg-white p-6 rounded-lg shadow-lg flex flex-col h-full">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex ">
                
              <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full mr-4">
                  2
                </div>
                
                Seleccione Servicios y Productos de su interés</h2>
              <ProductSelectionForm
                products={products}
                onSelectionChange={handleProductSelectionChange}
                discountMessage={discountMessage}
                totalBeforeDiscount={totalBeforeDiscount}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="py-2 px-4 bg-green-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
            >
              CONFIRMAR ASISTENCIA
            </button>
          </div>
        </form>
        <div className="text-right mt-2">
          <span className="text-xl font-bold text-green-700">Total: Q. {totalPrice.toFixed(2)}</span>
          <p className="text-red-600">Total Sin Descuento: Q. {totalBeforeDiscount.toFixed(2)}</p>
        </div>
        

        <ToastContainer />
      </div>
      <Footer />
      
    </div>
   
  );
};


export default Home;
