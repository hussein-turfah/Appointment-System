
import React from 'react';

// Sample invoice data
const Invoice = [
  { patientName: 'John Doe', doctor: 'Dr. Smith', date: '2024-02-09', amount: 100, currency: 'USD', status: 'Paid' },
  { patientName: 'Jane Doe', doctor: 'Dr. Johnson', date: '2024-02-10', amount: 150, currency: 'USD', status: 'Pending' },
  { patientName: 'John Doe', doctor: 'Dr. Smith', date: '2024-02-09', amount: 100, currency: 'USD', status: 'Paid' },
  { patientName: 'Jane Doe', doctor: 'Dr. Johnson', date: '2024-02-10', amount: 150, currency: 'USD', status: 'Pending' },
  // Add more invoice data as needed
];

const InvoiceTable = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Patient Name
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Currency
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Invoice.map((invoice, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b dark:bg-gray-800 dark:border-gray-700`}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoice.patientName}</td>
              <td className="px-6 py-4">{invoice.doctor}</td>
              <td className="px-6 py-4">{invoice.date}</td>
              <td className="px-6 py-4">{invoice.amount}</td>
              <td className="px-6 py-4">{invoice.currency}</td>
              <td className="px-6 py-4">{invoice.status}</td>
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

export default InvoiceTable;
