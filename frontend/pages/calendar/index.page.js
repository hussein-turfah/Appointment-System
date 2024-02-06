import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function Calendar() {
  const events = [
    {
      title: "All Day Event",
      start: "2024-02-01",
      allDay: true,
      groupId: 1
    },
    {
      id:1, 
      title: "Event 2",
      start: "2024-02-02",
      end: "2024-02-02",
      groupId: 2
    },
    {
      id: 2,
      title: "Event 2",
      // start: "2024-02-02",
      // end: "2024-02-02T12:30:00",
      groupId: 1,
      daysOfWeek: [
        ""
      ]
    },
  ];

  return (
    <main>
      <Fullcalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        // timegridday => show the day view
        // timegridweek => show the week view

        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        events={events}

        


      />
    </main>
  );
}
