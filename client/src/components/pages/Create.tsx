import { useState } from 'react';

interface ICategory {
  name: string;
}

export interface IProduct {
  name: string;
  price: number;
  idCategory: string;
}

const Create = () => {
  const [creatingType, setCreatingType] = useState<string>('');
  const [categoryData, setCategoryData] = useState<ICategory>({ name: '' });
  const [productData, setProductData] = useState<IProduct>({ name: '', price: 0, idCategory: '' });

  function saveCategory(categoryData: ICategory) {
    return fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryData)
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
  }

  function saveProduct(productData: IProduct) {
    return fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (creatingType === 'product') {
      setProductData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setCategoryData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
      if (creatingType === 'product') {
          saveProduct(productData);
      } else if (creatingType === 'category') {
          saveCategory(categoryData);
      }
  };

  return (
    <div>
      <h1>Create Product or Category</h1>
      <button onClick={() => setCreatingType('product')}>Create Product</button>
      <button onClick={() => setCreatingType('category')}>Create Category</button>
      {creatingType === 'product' && (
        <div>
          <input type="text" name="name" placeholder="Product Name" onChange={handleInputChange} />
          <input type="number" name="price" placeholder="Price" onChange={handleInputChange} />
          <input type="text" name="idCategory" placeholder="Category ID" onChange={handleInputChange} />
          <button onClick={handleSubmit}>Submit Product</button>
        </div>
      )}
      {creatingType === 'category' && (
        <div>
          <input type="text" name="name" placeholder="Category Name" onChange={handleInputChange} />
          <button onClick={handleSubmit}>Submit Category</button>
        </div>
      )}
    </div>
  );
};

export default Create;