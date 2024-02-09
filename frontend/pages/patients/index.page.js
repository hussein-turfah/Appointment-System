import React from 'react';

// Sample invoice data
const Invoice = [
  {
    "firstName": "John",
    "lastName": "Doe",
    "dob": "1990-01-01",
    "gender": "male",
    "email": "john.doe@example.com",
    "phone": "1234567890",
  }  
];

const PatientTable = () => {
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Invoice.map((invoice, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b dark:bg-gray-800 dark:border-gray-700`}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{`${invoice.firstName} ${invoice.lastName}` }</td>
              <td className="px-6 py-4">{invoice.dob}</td>
              <td className="px-6 py-4">{invoice.gender}</td>
              <td className="px-6 py-4">{invoice.phone}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Records</a>
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">Prescrpetions</a>
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">Billing</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
