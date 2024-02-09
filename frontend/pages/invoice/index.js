// ProductTable.js

import React from 'react';
import { Invoice } from '../data/productsData';

const InvoiceTable = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              patient name
            </th>
            <th scope="col" className="px-6 py-3">
              doctor 
            </th>
            <th scope="col" className="px-6 py-3">
              date
            </th>
            <th scope="col" className="px-6 py-3">
              amount
            </th>
            <th scope="col" className="px-6 py-3">
            currency
            </th>
            <th scope="col" className="px-6 py-3">
            status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Invoice.map((invoice, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b dark:bg-gray-800 dark:border-gray-700`}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoice.productName}</td>
              <td className="px-6 py-4">{invoice.color}</td>
              <td className="px-6 py-4">{invoice.category}</td>
              <td className="px-6 py-4">{invoice.price}</td>
              <td className="px-6 py-4">{invoice.price}</td>
              <td className="px-6 py-4">{invoice.price}</td>
              <td className="px-6 py-4">{invoice.price}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
