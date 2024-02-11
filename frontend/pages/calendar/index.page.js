import React, { useEffect, useState } from "react";
import styles from "./styles/index.module.scss";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../../actions/AppointmentActions";
import { getAllDoctors } from "../../actions/DoctorActions";
import Modal from "../../common/Modal";
import CreateAppointmentModal from "../../common/CreateAppointmentMoodal";

export default function Calendar() {
  const dispatch = useDispatch();

  const [selectedDoctor, setSelectedDoctor] = useState("all");

  const allAppointments = useSelector(
    ({ AppointmentData }) => AppointmentData.allAppointments
  );
  const allDoctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);

  useEffect(() => {
    dispatch(getAllAppointments());
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <main>
      <div className={styles.select}>
        <select
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="form-select form-select-lg mb-3 w-50 "
        >
          <option value="all">All</option>
          {allDoctors.data.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.firstName} {doctor.lastName}
            </option>
          ))}
        </select>
      </div>
      <Fullcalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={
          selectedDoctor === "all"
            ? allAppointments.data
            : allAppointments.data.filter(
                (appointment) => appointment.doctor === selectedDoctor
              )
        }
        editable={true}
        droppable={true}
      />
      <Modal
        active={true}
        setActive={true}
        title="Create Appointment"
        children={<CreateAppointmentModal />}
      />
    </main>
  );
}
