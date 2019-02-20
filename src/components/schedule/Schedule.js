import React, { Component, alert } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from '../schedule/EventModal';
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
    constructor(...args) {
      super(...args)
  
      this.state = { events,
                     show: false
                    }
    }

    toggleModal = e => {
      this.setState({
        show: !this.state.show
      });
    };

  
  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if(title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
    }
  

  render() {
    return (
      <div style={{height:500}}>
        <BigCalendar
            selectable
            events={this.state.events}
            localizer={localizer}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect}
        />
        <button  onClick={e => {
              this.toggleModal(e);
         }}
          > show Modal 
        </button>
        <EventModal show={this.state.show}  onClose={this.toggleModal}>
        </EventModal>
        </div>
    )
  }
}
