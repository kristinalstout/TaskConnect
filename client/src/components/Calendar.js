import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../calendarStyles.scss';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'Event 1',
    start: new Date(2023, 8, 1, 10, 0), // September 1, 2023 at 10:00 AM
    end: new Date(2023, 8, 1, 12, 0),   // September 1, 2023 at 12:00 PM
  },
  {
    title: 'Event 2',
    start: new Date(2023, 8, 5, 14, 0), // September 5, 2023 at 2:00 PM
    end: new Date(2023, 8, 5, 16, 0),   // September 5, 2023 at 4:00 PM
  },
];

const MyCalendar = ({ tasks, darkMode }) => {
  const eventList = tasks.map((task) => ({
    title: task.task,
    start: new Date(task.dueDate + "T00:00:00Z"),
    end: new Date(task.dueDate + "T00:00:00Z"),
  }));

  const eventListAdjusted = eventList.map((event) => ({
    ...event,
    start: new Date(event.start.getTime() + 86400000), // Add 1 day (in milliseconds)
    end: new Date(event.end.getTime() + 86400000),     // Add 1 day (in milliseconds)
  }));

  return (
    <div className={`my-calendar-container ${darkMode ? 'dark-mode' : ''}`}>
      <Calendar
        localizer={localizer}
        events={eventListAdjusted}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
