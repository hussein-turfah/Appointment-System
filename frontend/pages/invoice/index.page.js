import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices } from "../../actions/InvoiceActions";

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(({ InvoiceData }) => InvoiceData?.allInvoices);

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);


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
          {invoices.data.map((invoice, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b dark:bg-gray-800 dark:border-gray-700`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {`${invoice.patient.firstName} ${invoice.patient.lastName}`}
              </td>
              <td className="px-6 py-4">{invoice.doctor}</td>
              <td className="px-6 py-4">{invoice.date}</td>
              <td className="px-6 py-4">{invoice.amount}</td>
              <td className="px-6 py-4">{invoice.currency}</td>
              <td className={`px-6 py-4 ${invoice.paymentStatus === 'Unpaid' ? 'text-red-500' : ''}`}>{invoice.paymentStatus}</td>
              <td className="px-6 py-4">
                <a
                  href={`/invoice/${invoice._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
