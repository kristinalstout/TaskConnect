import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(Day);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}

export default MyCalendar;
