import React, { useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
// import Modal from "../../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../../actions/AppointmentActions";

export default function Calendar() {
  const dispatch = useDispatch();

  const allAppointments = useSelector(
    ({ AppointmentData }) => AppointmentData.allAppointments
  );

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  return (
    <main>
      <Fullcalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={allAppointments.data}
        droppable={true}
      />
    </main>
  );
}
