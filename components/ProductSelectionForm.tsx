// Importa los hooks useState y useEffect de React
import React from 'react';
import { useState, useEffect } from 'react';

// Define la interfaz de un producto utilizando TypeScript (tipado estático)
interface Product {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  type: string;  // 'producto' o 'servicio'
}

// Define las props del componente, incluyendo discountMessage
interface ProductSelectionFormProps {
  products: Product[];
  onSelectionChange: (selectedProducts: number[]) => void;
  discountMessage: string;
  totalBeforeDiscount: number;
}


// Componente ProductSelectionForm que recibe las props definidas
const ProductSelectionForm = ({
  products,
  onSelectionChange,
  discountMessage,
  totalBeforeDiscount
}: ProductSelectionFormProps) => {
  // Estado para controlar el término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para almacenar los productos filtrados basados en el término de búsqueda
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  // Estado para mantener un registro de los productos seleccionados
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Efecto para actualizar los productos filtrados cuando cambia la lista de productos
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Efecto para filtrar productos basado en el término de búsqueda
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Manejador para cambios en los checkboxes de los productos
  const handleCheckboxChange = (productId: number) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId];

    setSelectedProducts(updatedSelectedProducts);
    onSelectionChange(updatedSelectedProducts);
  };

  // Renderiza el formulario de selección de productos
  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Buscar Servicios y Productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
   
      <div className="space-y-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={`p-2 border-b border-gray-200 rounded-lg ${selectedProducts.includes(product.id) ? "bg-gray-100" : ""}`}>
              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded text-indigo-500"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                  <span className="text-gray-700">-{product.type}-</span>
                  <span className="text-gray-700">{product.name}</span>
                </label>
                <span className="text-gray-700 font-semibold">Q. {product.price.toFixed(2)}</span>
              </div>
            
              
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron productos.</p>
        )}
      </div>
      
      {discountMessage && (
  <div className="text-sm font-medium text-green-600 bg-green-100 border-l-4 border-green-500 p-2 rounded">
    {discountMessage.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </div>
)}
    </div>
  );
};

export default ProductSelectionForm;