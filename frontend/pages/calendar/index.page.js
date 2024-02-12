import React, { useEffect, useState } from "react";
import styles from "./styles/index.module.scss";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  getAppointmentsByDoctorId,
  updateAppointment,
} from "../../actions/AppointmentActions";
import { getAllDoctors } from "../../actions/DoctorActions";
import Modal from "../../common/Modal";
import CreateAppointmentModal from "../../common/CreateAppointmentMoodal";
import { getAllPatients } from "../../actions/PatientActions";
import { useRouter } from "next/router";
import CreatePatientModal from "../../common/CreatePatientModal";
import CreateUserModal from "../../common/CreateUserModal";

export default function Calendar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [modal, setModal] = useState(false);

  const user = useSelector(({ UserData }) => UserData.data);
  const allAppointments = useSelector(
    ({ AppointmentData }) => AppointmentData.allAppointments
  );
  const allDoctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);

  // const updateAppointmentTime = useCallback(
  //   (start, end, id) => {
  //     dispatch(updateAppointment(id, { start, end }));
  //   },
  //   [dispatch]
  // );

  useEffect(() => {
    if (user.role === "admin" || user.type === "secretary") {
      dispatch(getAllDoctors());
      dispatch(getAllAppointments());
      dispatch(getAllPatients());
    } else if (user.type === "doctor") {
      dispatch(getAppointmentsByDoctorId(user.id));
    }
  }, [dispatch, user.role, user.type, user.id]);

  return (
    <main>
      {(user?.role === "admin" || user?.type === "secretary") && (
        <div className={styles.select}>
          <button
            onClick={() => setModal(true)}
            className="btn btn-primary mb-3 w-50"
          >
            Create User
          </button>
          <button
            onClick={() => setAppointmentModal(true)}
            className="btn btn-primary mb-3 w-50"
          >
            Create Appointment
          </button>
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
      )}
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
          user.type === "doctor"
            ?
              Array.isArray(allAppointments?.data) && allAppointments?.data?.filter((appointment) => appointment.doctor === user.id)
                .map((appointment) => ({
                  ...appointment,
                  eventColor: `#${appointment.doctor.slice(-6)}`,
                }))
            : selectedDoctor === "all"
            ? allAppointments?.data?.map((appointment) => ({
                ...appointment,
                eventColor: `#${appointment.doctor.slice(-6)}`,
              }))
            : allAppointments.data
                .filter((appointment) => appointment.doctor === selectedDoctor)
                .map((appointment) => ({
                  ...appointment,
                  eventColor: `#${appointment.doctor.slice(-6)}`,
                }))
        }
        editable={user?.role === "admin" || user?.type === "secretary"}
        droppable={user?.role === "admin" || user?.type === "secretary"}
        eventDragStop={(info) => {
          // updateAppointmentTime(
          console.log(info.event.start, info.event.end, info.event.id);
        }}
      />
      <Modal
        active={appointmentModal}
        setActive={setAppointmentModal}
        title="Create Appointment"
        children={
          <CreateAppointmentModal
            active={appointmentModal}
            setActive={setAppointmentModal}
          />
        }
      />
      <Modal
        active={modal}
        setActive={setModal}
        title="Create User"
        children={<CreateUserModal open={modal} setOpen={setModal} />}
      />
    </main>
  );
}
