// pages/index.tsx
"use client"
import React, { useState } from 'react';
import QueryBuilder from '../components/QueryBuilder';
import { Rule } from '../components/QueryBuilder';


type QueryType = {
    rules: Rule[]
  };

  type Product = {
    title: string;
    description: string;
    price: number;
    quantity: number;
    inStock: boolean;
  };

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  {console.log(products)}

  const fetchProducts = async (query: QueryType): Promise<void> => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });
    const data = await response.json();
    setProducts(data.products);
  };

  return (
    <div>
      <QueryBuilder onSubmit={async (rules: Rule[]) => fetchProducts({rules})} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product, index) => (
            <tr key={index}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.inStock ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;