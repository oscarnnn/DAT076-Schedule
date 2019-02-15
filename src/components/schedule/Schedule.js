import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const events = [
    {
        id: 0,
        title: 'Äta fiskpinne',
        allDay: true,
        start: new Date(2019, 1, 15),
        end: new Date(2019, 1, 16),
      },
      {
        id: 1,
        title: 'Klappa fågel',
        start: new Date(2019, 1, 17),
        end: new Date(2019, 1, 19),
      },
    
      {
        id: 2,
        title: 'Dricka ölen',
        start: new Date(2019, 1, 21, 13, 0, 0),
        end: new Date(2019, 1, 21, 23, 0, 0),
      },
]

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class schedule extends Component {
  render() {
    return (
        <BigCalendar
            events={events}
            localizer={localizer}
        />
    )
  }
}

