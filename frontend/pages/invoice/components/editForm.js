import React, { useState } from "react";

const InvoiceForm = ({
  onSubmit,
  initialValues = { doctor: "", paymentStatus: "", amount: "", currency: "" },
  isAddForm = false,
}) => {
  const [doctor, setDoctor] = useState(initialValues.doctor);
  const [paymentStatus, setPaymentStatus] = useState(initialValues.paymentStatus);
  const [amount, setAmount] = useState(initialValues.amount);
  const [currency, setCurrency] = useState(initialValues.currency);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ doctor, paymentStatus, amount, currency });
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="doctor">Doctor:</label>
        <select id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          {isAddForm && <option value="">-- Select Doctor --</option>}
          {/* Options for doctors */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="paymentStatus">Payment Status:</label>
        <select id="paymentStatus" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={0}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="currency">Currency:</label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          maxLength={3}
          required
        />
      </div>
      <button type="submit" className="mt-6 px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
> Edit Invoice</button>
    </form>
  );
};

export default InvoiceForm;
