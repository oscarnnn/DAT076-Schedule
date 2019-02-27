import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
import Modal from "../modal/Modal";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DatePicker from "react-datepicker";
import { addEvent } from "../../store/actions/eventActions";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/modal.css";
import "../../styles/schedule.css";

//This component will render and handle the schedule. It will get events from the
// firestore database and also add events to the database while also saving the events in
// redux store.

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment);

class Schedule extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      show: false,
      startDate: new Date(),
      endDate: new Date(),
      title: "",
      tmp: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.formatDates();
    }
  }

  // Handling closing and opening of modal
  toggleModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  // Updates startdate when a date is picked while adding an event
  updateStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  // Updates enddate when a date is picked while adding an event
  updateEndDate = date => {
    this.setState({
      endDate: date
    });
  };
  // When a date is clicked or dragged on schedule this function will fire and update startdate and enddate
  // with the chosen date/dates
  handleSelect = ({ start, end }) => {
    this.setState({
      startDate: start,
      endDate: end
    });
    this.toggleModal();
  };

  // When submitbutton is clicked in the modal this function will fire and update db and redux store
  // with an event(start time, end time and title)
  handleSubmit = (start, end, title) => {
    this.props.addEvent({
      start,
      end,
      title
    });
    this.setState({
      title: ""
    });
    this.toggleModal();
  };

  // Formats timestamps from the firebase server to valid dates
  formatDates = () => {
    let tmpList = this.props.events;
    for (let i = 0; i < tmpList.length; i++) {
      if (tmpList[i].start.seconds || tmpList[i].end.seconds) {
        tmpList[i].start = new Date(tmpList[i].start.seconds * 1000);
        tmpList[i].end = new Date(tmpList[i].end.seconds * 1000);
      }
    }
    this.setState({ tmp: tmpList });
  };

  // Update the title for the event
  handleTitle = title => {
    this.setState({
      title: title.target.value
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="schedule-container">
          <BigCalendar
            selectable
            showMultiDayTimes
            events={this.state.tmp}
            localizer={localizer}
            onSelectSlot={this.handleSelect}
          />
        </div>
        <div>
          <Modal
            show={this.state.show}
            close={this.toggleModal}
            submit={() =>
              this.handleSubmit(
                this.state.startDate,
                this.state.endDate,
                this.state.title
              )
            }
          >
            <h5>Add Event</h5>
            <br />
            <label>Title</label>
            <input
              style={{ width: "50%" }}
              type="text"
              value={this.state.title}
              onChange={this.handleTitle}
            />
            <br />
            <label>Start time</label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.updateStartDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy HH:mm"
              timeCaption="time"
              style={{ width: "50%" }}
            />
            <br />
            <label>End time</label>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.updateEndDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy HH:mm"
              timeCaption="time"
              style={{ width: "50%" }}
            />
            <br />
          </Modal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEvent: event => dispatch(addEvent(event))
  };
};

const mapStateToProps = state => {
  if (state.firestore.ordered.events) {
    return {
      events: state.firestore.ordered.events,
      auth: state.firebase.auth
    };
  } else {
    return {
      events: [],
      auth: state.firebase.auth
    };
  }
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "events" }])
)(Schedule);
