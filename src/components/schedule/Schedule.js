import React, { Component, alert } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import EventModal from './EventModal';
import './modal.css';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Schedule extends Component {
    constructor(...args) {
      super(...args)
  
      this.state = {
                     show: false,
                     startDate: new Date(),
                     endDate: new Date()
                    }
    }

    toggleModal = (e) => {
      this.setState({
        show: !this.state.show
      });
    };

    updateStartDate = (date) => {
      this.setState({
        startDate: date
      })
    }

    updateEndDate = (date) => {
      this.setState({
        endDate: date
      })
    }

    handleSelect = ({ start, end }) => {
    this.setState({
      startDate:start,
      endDate: end
    })
    this.toggleModal();
    }

  render() {
    return (
      <div>
      <div style={{zIndex:900, position:"fixed", height: "100%", width: "100%"}}>
      <BigCalendar
            selectable
            events={this.props.events}
            localizer={localizer}
            onSelectSlot={this.handleSelect}
        />
      </div>
      <div>
        <EventModal 
          show={this.state.show} 
          start={this.state.startDate} 
          end={this.state.endDate} 
          close={this.toggleModal}
          updateStart={this.updateStartDate}
          updateEnd={this.updateEndDate}
          />
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.event.events
  }
}

export default connect(mapStateToProps)(Schedule)
