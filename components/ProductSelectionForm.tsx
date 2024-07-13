import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProductSelectionForm = ({ products, onSelectionChange }: { products: Product[], onSelectionChange: (selectedProducts: number[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleCheckboxChange = (productId: number) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId];

    setSelectedProducts(updatedSelectedProducts);
    onSelectionChange(updatedSelectedProducts);
  };

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
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="p-4 border rounded-lg shadow-md">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
                <span className="text-gray-700">{product.name} - Q. {product.price.toFixed(2)}</span>
              </label>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSelectionForm;
