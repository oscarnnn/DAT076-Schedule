import React, { Component, alert } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import EventModal from './EventModal';
import { Redirect } from 'react-router-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './modal.css';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Schedule extends Component {
    constructor(...args) {
      super(...args)
      this.state = {
                     show: false,
                     startDate: new Date(),
                     endDate: new Date(),
                     tmp: []
                    }
    }

    componentDidUpdate (prevProps) {
      if (this.props.events !== prevProps.events) {
        this.formatDates()
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

    // Formats timestamps from the firebase server to valid dates
    formatDates = () => {
      let tmpList = this.props.events
      for (let i = 0; i < tmpList.length; i++) {
        if(tmpList[i].start.seconds || tmpList[i].end.seconds) {
          tmpList[i].start = new Date(tmpList[i].start.seconds*1000)
          tmpList[i].end = new Date(tmpList[i].end.seconds*1000)
        }
      }
      this.setState({tmp: tmpList})
    }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div>
        <div style={{zIndex:900, position:"fixed", height: "100%"}}>
          <BigCalendar
                selectable
                showMultiDayTimes
                events={this.state.tmp}
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

const mapStateToProps = ( state ) => {
  if (state.firestore.ordered.events) {
    return {
      events: state.firestore.ordered.events,
      auth: state.firebase.auth
    }
  } else {
    return {
      events: [],
      auth: state.firebase.auth
    }
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'events' }
  ])
)(Schedule)
