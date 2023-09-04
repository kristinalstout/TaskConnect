import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../calendarStyles.scss';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ tasks, searchQuery, darkMode }) => {
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