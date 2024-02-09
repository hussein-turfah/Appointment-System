import React, { useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

export default function Calendar() {
  const events = [
    {
      title: "All Day Event",
      start: "2024-02-01",
      allDay: true,
      groupId: 1,
    },
    {
      id: 1,
      title: "Event 2",
      start: "2024-02-02",
      end: "2024-02-02",
      groupId: 2,
    },
    {
      id: 2,
      title: "Event 2",
      // start: "2024-02-02",
      // end: "2024-02-02T12:30:00",
      groupId: 1,
      daysOfWeek: [""],
    },
  ];

  useEffect(() => {
    // Ensure the DOM is loaded before initializing the calendar
    document.addEventListener('DOMContentLoaded', function() {
      // Get references to draggable element and calendar element
      const draggableEl = document.getElementById('mydraggable');
      const calendarEl = document.getElementById('mycalendar');

      // Initialize FullCalendar with the interaction plugin
      const calendar = new FullCalendar.Calendar(calendarEl, { // Update: FullCalendar.Calendar instead of Calendar
        plugins: [dayGridPlugin, interactionPlugin], // Add dayGridPlugin here
        droppable: true,
        initialView: 'dayGridMonth', // Add initialView option
        events: events, // Pass events array
      });

      // Render the calendar
      calendar.render();

      // Make the draggable element draggable
      new Draggable(draggableEl, {
        eventData: { // Specify event data
          title: "my event",
          duration: "02:00"
        }
      });
    });
  }, []); // Run this effect only once on mount

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
        droppable={true}
      />
      <div id="mydraggable">
        Drag me
      </div>
      <div id="mycalendar"></div>
    </main>
  );
}
