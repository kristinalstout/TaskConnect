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

const MyCalendar = ({ tasks }) => {
  const eventList = tasks.map((task) => ({
    title: task.task,
    start: new Date(task.dueDate), // Uses the dueDate from the task
    end: new Date(task.dueDate),
  }));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList} 
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};


export default MyCalendar;
