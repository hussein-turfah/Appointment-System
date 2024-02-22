import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAppointmentStatus } from "../../actions/AppointmentActions";
import Dropdown from "../Dropdown";

export default function AppointmentStatusModal({
  setActive,
  selectedAppointment,
  appointmentId,
}) {
  const [appointment, setAppointment] = useState(0);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const update = useCallback(async () => {
    await dispatch(updateAppointmentStatus(appointment, status));
  }, [dispatch, appointment, status]);

  useEffect(() => {
    setStatus(selectedAppointment?.status);
    setAppointment(appointmentId);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        update();
        setActive(false);
      }}
    >
      <h3 className="mb-3 font-semibold">
        Please update the appointment status
      </h3>
      <div className="mb-3">
        <label htmlFor="status" className="block mb-1">
          Status
        </label>
        <Dropdown
          value={status}
          values={[
            "scheduled",
            "cancelled",
            "completed",
            "absent",
            "rescheduled",
          ]}
          setValue={setStatus}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-50 mx-auto mb-3 w-full border-2 bg-gray-500 text-white border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      >
        Update Status
      </button>
    </form>
  );
}
