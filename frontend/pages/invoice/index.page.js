// components/InvoiceTable.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllInvoices } from '../../actions/InvoiceAction';

const InvoiceTable = ({ invoices, getAllInvoices }) => {
  useEffect(() => {
    getAllInvoices();
  }, [getAllInvoices]);

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
          {invoices.map((invoice, index) => (
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

const mapStateToProps = (state) => ({
  invoices: state.invoices 
});

export default connect(mapStateToProps, { getAllInvoices })(InvoiceTable);
