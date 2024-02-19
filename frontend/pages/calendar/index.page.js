import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles/index.module.scss";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAppointment,
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
  const calendarRef = useRef(null);

  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [isSelected, setIsSelected] = useState({});

  const user = useSelector(({ UserData }) => UserData.data);
  const allAppointments = useSelector(
    ({ AppointmentData }) => AppointmentData.allAppointments
  );
  const doctorAppointments = useSelector(
    ({ AppointmentData }) => AppointmentData.appointmentsByDoctor
  );
  const allDoctors = useSelector(({ DoctorData }) => DoctorData.allDoctors);

  const removeAppointment = useCallback(() => {
    dispatch(deleteAppointment(isSelected?.id));
  }, [dispatch, isSelected]);

  useEffect(() => {
    if (user.role === "admin" || user.type === "secretary") {
      dispatch(getAllDoctors());
      dispatch(getAllAppointments());
      dispatch(getAllPatients());
    } else if (user.type === "doctor") {
      dispatch(getAppointmentsByDoctorId(user.id));
    }
  }, [dispatch, user.role, user.type, user.id]);

  // useEffect for double click and single click on event
  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    let clickCnt = 0;

    const handleEventClick = (info) => {
      clickCnt++;

      if (clickCnt === 1) {
        setTimeout(() => {
          if (clickCnt === 1) {
            router.push(`/patients/${info.event.extendedProps.patient}`);
          }
          clickCnt = 0;
        }, 400);
      } else if (clickCnt === 2) {
        setIsSelected(info.event);
        clickCnt = 0;
      }
    };

    calendarApi.on("eventClick", handleEventClick);

    return () => {
      calendarApi.off("eventClick", handleEventClick);
    };
  }, []);

  // useEffect for setting isSelected to empty object after 2 seconds
  useEffect(() => {
    if (Object.keys(isSelected).length > 0) {
      setTimeout(() => {
        setIsSelected({});
      }, 3000);
    }
  }, [isSelected]);

  return (
    <main className={styles.container}>
      {(user?.role === "admin" || user?.type === "secretary") && (
        <div className={styles.select}>
          <button
            onClick={() => setModal(true)}
            className="btn btn-primary mb-3 w-50"
          >
            Create User
          </button>
          {isSelected?.id ? (
            <>
              <button
                onClick={() => setAppointmentModal(true)}
                className="btn btn-primary mb-3 w-50"
              >
                Edit Appointment
              </button>
              <button
                onClick={removeAppointment}
                className="btn btn-primary mb-3 w-50"
              >
                Delete Appointment
              </button>
            </>
          ) : (
            <button
              onClick={() => setAppointmentModal(true)}
              className="btn btn-primary mb-3 w-50"
            >
              Create Appointment
            </button>
          )}
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
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        // initialView="dayGridMonth"
        initialView="timeGridWeek"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={
          user.type === "doctor"
            ? doctorAppointments.data
            : selectedDoctor === "all"
            ? allAppointments.data
            : allAppointments.data.filter(
                (appointment) => appointment.doctor === selectedDoctor
              )
        }
        editable={user?.role === "admin" || user?.type === "secretary"}
        droppable={user?.role === "admin" || user?.type === "secretary"}
        selectable={user?.role === "admin" || user?.type === "secretary"}
        slotDuration="00:15:00"
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        eventContent={(e) => {
          return (
            <div className={styles.eventContent}>
              {(user?.role === "admin" || user?.type === "secretary") && (
                <p>
                  Doctor: {e?.event?.extendedProps?.doctor?.firstName}{" "}
                  {e?.event?.extendedProps?.doctor?.lastName}
                </p>
              )}
              <p>
                Patient: {e?.event?.extendedProps?.patient?.firstName}{" "}
                {e?.event?.extendedProps?.patient?.lastName}
              </p>
              <p>Status: {e?.event?.extendedProps?.status}</p>
              {console.log(e?.event?.extendedProps.doctor)}
            </div>
          );
        }}
        eventBackgroundColor={
          // user?.role === "admin" || user?.type === "secretary"?
          (info) => {
            if (info?.event?.extendedProps?.status === "created") {
              return "blue";
            } else if (info?.event?.extendedProps?.status === "done") {
              return "green";
            } else if (info?.event?.extendedProps?.status === "canceled") {
              return "red";
            } else if (info?.event?.extendedProps?.status === "absent") {
              return "yellow";
            } else if (info?.event?.extendedProps?.status === "rescheduled") {
              return "purple";
            } else {
              return "black";
            }
          }
          // : null
        }
      />
      <Modal
        active={appointmentModal}
        setActive={setAppointmentModal}
        title={isSelected?.id ? "Edit Appointment" : "Create Appointment"}
        children={
          <CreateAppointmentModal
            active={appointmentModal}
            setActive={setAppointmentModal}
            selectedAppointment={isSelected?.extendedProps}
            appointmentId={isSelected?.id}
            appointmentRange={{
              start: isSelected.startStr,
              end: isSelected.endStr,
            }}
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
