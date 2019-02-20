import React, { Component, alert } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Schedule extends Component {
    constructor(...args) {
      super(...args)
  
      this.state = {
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
      this.props.addEvent({
            start,
            end,
            title,
      })
    }



  render() {
    return (
      <div style={{height:500}}>
        <BigCalendar
            selectable
            events={this.props.events}
            localizer={localizer}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect}
        />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (event) => { dispatch({type: 'ADD_EVENT', event: event})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)