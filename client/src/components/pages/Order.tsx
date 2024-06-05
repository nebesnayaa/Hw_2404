import React, { useState, useEffect, ChangeEvent } from 'react';

interface IProduct {
    id: number;
    name: string;
    price: number;
}

interface IOrder {
    idProduct: number;
    name: string;
    price: number;
}

const Order: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Failed to load products:', error));
    }, []);

    const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedProductId(event.target.value);
    };

    // Find the selected product based on selectedProductId
    const selectedProduct = products.find(product => product.id.toString() === selectedProductId);

    const submitOrder = (orderData: IOrder) => {
        return fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    };

    const handleOrderSubmit = () => {
        if (!selectedProduct) {
            alert('Please select a product');
            return;
        }

        const orderData: IOrder = {
            idProduct: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price
        };

        console.log(`Order submitted for product ID: ${selectedProduct.id}`);

        submitOrder(orderData)
            .then(response => {
                console.log('Order successfully submitted:', response);
            })
            .catch(error => {
                console.error('Error submitting order:', error);
            });
    };

    return (
        <div>
            <h1>Order Product</h1>
            <select value={selectedProductId} onChange={handleProductChange}>
                <option value="">Select a Product</option>
                {products.map(product => (
                    <option key={product.id} value={product.id.toString()}>
                        {product.name} - ${product.price}
                    </option>
                ))}
            </select>
            <button onClick={handleOrderSubmit}>Place Order</button>
        </div>
    );
};

export default Order;