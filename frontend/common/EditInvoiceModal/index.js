import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice, updateInvoice } from "../../actions/InvoiceActions";

const InvoiceForm = ({
  onSubmit,
  isAddForm = false,
  editing = false,
  initialValues = {
    id: "",
    doctor: "",
    paymentStatus: "Unpaid",
    amount: "",
    currency: "",
    date: new Date(),
  },
}) => {
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(initialValues.doctor);
  const [paymentStatus, setPaymentStatus] = useState(
    initialValues.paymentStatus
  );
  const [amount, setAmount] = useState(initialValues.amount);
  const [currency, setCurrency] = useState(initialValues.currency);
  const [date, setDate] = useState(initialValues.date);

  const patient = useSelector(
    ({ PatientData }) => PatientData?.selectedPatient?.data
  );
  const doctors = useSelector(({ DoctorData }) => DoctorData?.allDoctors?.data);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      editing
        ? dispatch(
            updateInvoice(initialValues.id, {
              doctor,
              paymentStatus,
              amount,
              currency,
              date,
            })
          )
        : dispatch(
            createInvoice({
              doctor,
              paymentStatus,
              amount,
              currency,
              patient,
              date,
            })
          );
    },
    [
      doctor,
      paymentStatus,
      amount,
      currency,
      patient,
      date,
      dispatch,
      initialValues.id,
      editing,
    ]
  );

  return (
    <form className="invoice-form gap-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="doctor">Doctor:</label>
        <select
          id="doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          required
          className="w-full border  border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
        >
          {doctors.map((doctor) => (
            <option value={doctor.id}>
              {doctor.firstName} {doctor.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="patient">Patient:</label>
        <input
          type="number"
          id="patient"
          value={patient?.firstName + " " + patient?.lastName}
          min={0}
          required
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="paymentStatus">Payment Status:</label>
        <select
          id="paymentStatus"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
        >
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
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
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
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Invoice Date:</label>
        <input
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setDate(e.target.value)}
          maxLength={3}
          required
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-indigo-900"
        />
      </div>
      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 w-full"
      >
        {editing ? "Edit Invoice" : "Create"}
      </button>
    </form>
  );
};

export default InvoiceForm;
