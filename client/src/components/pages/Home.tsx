import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  priceCent: number;
  // Додайте інші поля, які ви маєте в об'єктах продуктів
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/products') // URL сервера
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <h2 className="text-center mt-2">Продукти</h2>
      <div className="product-list cols-md-3">
        {products.map(product => (
          <div key={product.id} className="card product-card">
            <img src="..." className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text product-price">{product.priceCent / 100} $</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


export default function Home() {
  return (
    <ProductList/>
  );
}