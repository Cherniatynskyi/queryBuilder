"use client"
import React, { useState } from 'react';
import QueryBuilder from '../components/QueryBuilder';
import { Rule } from '@/utils/builderTypes';

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
    <div className='p-10'>
      <QueryBuilder onSubmit={async (rules: Rule[]) => fetchProducts({rules})} />
      <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
        <thead>
          <tr >
            <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>Title</th>
            <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>Description</th>
            <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>Price</th>
            <th className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>Quantity</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
          {products.map((product: Product, index) => (
            <tr key={index}>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ' >{product.title}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ' >{product.description}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ' >{product.price}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ' >{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;