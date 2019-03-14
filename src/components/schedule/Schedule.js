import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";
import Modal from "../modal/Modal";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DatePicker from "react-datepicker";
import {
  addEvent,
  deleteEvent,
  updateEvent,
  addParticipant,
  removeParticipant
} from "../../store/actions/eventActions";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/modal.css";
import "../../styles/schedule.css";
import Participate from "./Participate";

// This component will render and handle the schedule. It will get events from the
// firestore database and also add events to the database while also saving the events in
// redux store.

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment);

class Schedule extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      addShow: false,
      editShow: false,
      eventid: "",
      startDate: new Date(),
      endDate: new Date(),
      title: "",
      participants: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.formatDates();
      //If there are events in the schedule and an event has been selected, update the participants for that event
      //when props or state in schedule updates
      if (this.props.events && this.state.eventid && this.state.eventid !== "") {
        this.updateParticipants();
      }
    }
  }

  //Handles closing and opening of addmodal
  toggleAddModal = e => {
    if (this.state.addShow)
      this.setState({
        title: ""
      });
    this.setState({
      addShow: !this.state.addShow
    });
  };

  //Handles closing and opening of editmodal
  toggleEditModal = e => {
    if (this.state.editShow)
      this.setState({
        title: ""
      });
    this.setState({
      editShow: !this.state.editShow
    });
  };

  //Updates startdate when a date is picked while adding an event
  updateStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  //Updates enddate when a date is picked while adding an event
  updateEndDate = date => {
    this.setState({
      endDate: date
    });
  };
  //When a date is clicked or dragged on schedule this function will fire and update startdate and enddate
  //with the chosen date/dates
  handleSelect = ({ start, end }) => {
    this.setState({
      startDate: start,
      endDate: end
    });
    this.toggleAddModal();
  };

  //Formats timestamps from the firebase server to valid dates
  formatDates = () => {
    let tmpList = this.props.events;
    for (let i = 0; i < tmpList.length; i++) {
      if (tmpList[i].start.seconds || tmpList[i].end.seconds) {
        tmpList[i].start = new Date(tmpList[i].start.seconds * 1000);
        tmpList[i].end = new Date(tmpList[i].end.seconds * 1000);
      }
    }
  };

  //Update the title for the event
  handleTitle = title => {
    this.setState({
      title: title.target.value
    });
  };

  //When editbutton is clicked inside editModal this function will fire and update the
  //selected event with new data and save it on the db, then close the modal.
  handleSelectEvent = event => {
    this.setState({
      eventid: event.id,
      startDate: event.start,
      endDate: event.end,
      title: event.title,
      participants: event.participants
    });
    this.toggleEditModal();
  };

  //When submitbutton is clicked in the modal this function will fire and update db and redux store
  //with an event(start time, end time,title and organization) and close modal
  handleSubmit = (start, end, title) => {
    const org = this.props.profile.organization;
    this.props.addEvent(
      {
        start,
        end,
        title
      },
      org
    );
    this.toggleAddModal();
  };

  //When deletebutton is clicked in the modal this function will fire and delete the event
  //connected with an id from both db and redux store and close modal
  handleDelete = eventid => {
    this.props.deleteEvent(eventid);
    this.toggleEditModal();
    this.setState({
      eventid: null
    })
  };

  //When editbutton is clicked in the modal this function will fire and update the event
  //connected to the current eventid on db and redux store, then close modal
  handleEdit = (start, end, title) => {
    const id = this.state.eventid;
    this.props.updateEvent(
      {
        start,
        end,
        title
      },
      id
    );
    this.toggleEditModal();
  };

  //Updates the state of participants to the participants of the selected event from firestore
  updateParticipants = () => {
    //Find the selected event from the events in the schedule
    let filtered = this.props.events.filter(e => {
      return e.id === this.state.eventid;
    });
    //Set the state of participants to the participants of the selected event
    this.setState({ participants: filtered[0].participants });
  };

  //Dispatches the addParticipant(uid, name, eventid) action.
  //Used when the "PARTICIPATE" button is pressed
  handleAddParticipant = () => {
    this.props.addParticipant(
      this.props.auth.uid,
      this.props.profile.firstName + " " + this.props.profile.lastName,
      this.state.eventid
    );
  };

  //Dispatches the removeParticipant(uid, eventid) action.
  //Used when the "LEAVE" button is pressed
  handleRemoveParticipant = () => {
    this.props.removeParticipant(this.props.auth.uid, this.state.eventid);
  };

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    let select; //This variable handles if the user should be able to create events
    let adminButtons; //This variable handles if the adminbuttons should be visible or not
    if (profile.authority === 1 && profile.organization) { //This condition will check if the current user is and admin and has an organization
      select = true;
      adminButtons = (
        <>
          <button
            className="btn blue lighten-1 z-depth-0"
            style={{ marginBottom: "10px" }}
            onClick={() =>
              this.handleEdit(
                this.state.startDate,
                this.state.endDate,
                this.state.title
              )
            }
          >
            Edit
          </button>
          <button
            className="btn blue lighten-1 z-depth-0"
            style={{ marginBottom: "10px" }}
            onClick={() => this.handleDelete(this.state.eventid)}
          >
            Delete
          </button>
        </>
      );
    } else {
      select = false;
      adminButtons = null;
    }
    if (!profile.organization) {//This condition will check if the current user has an organization, if not, the schedule wont render
      return (
        <div className="center red-text">
          You need to be a member of an organization to view schedule!
        </div>
      );
    } else
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <div className="schedule-container">
            <BigCalendar
              selectable={select}
              showMultiDayTimes
              events={this.props.events}
              localizer={localizer}
              onSelectSlot={this.handleSelect}
              onSelectEvent={event => this.handleSelectEvent(event)}
            />
          </div>
          <div>
            <Modal show={this.state.addShow} close={this.toggleAddModal}>
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
              <button
                className="btn blue lighten-1 z-depth-0"
                style={{ marginBottom: "10px" }}
                onClick={() =>
                  this.handleSubmit(
                    this.state.startDate,
                    this.state.endDate,
                    this.state.title
                  )
                }
              >
                Submit
              </button>
            </Modal>
            <Modal show={this.state.editShow} close={this.toggleEditModal}>
              <h5>Edit Event</h5>
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
              {/*Component to show the participants of the selected event and a button to participate or leave*/}
              <Participate
                participants={this.state.participants}
                uid={this.props.auth.uid}
                onParticipate={this.handleAddParticipant}
                onLeave={this.handleRemoveParticipant}
              />
              <br />
              {adminButtons}
            </Modal>
          </div>
        </div>
      );
  }
}

//Handles add,delete and update event. When called upon it will dispatch its actions
const mapDispatchToProps = dispatch => {
  return {
    addEvent: (event, org) => dispatch(addEvent(event, org)),
    deleteEvent: eventid => dispatch(deleteEvent(eventid)),
    updateEvent: (event, eventid) => dispatch(updateEvent(event, eventid)),
    addParticipant: (uid, name, eventid) =>
      dispatch(addParticipant(uid, name, eventid)),
    removeParticipant: (uid, eventid) =>
      dispatch(removeParticipant(uid, eventid))
  };
};

//Mapping the current states inside redux store and map it as props to schedule component
const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.events
      ? state.firestore.ordered.events
      : [],
    auth: state.firebase.auth ? state.firebase.auth : {},
    profile: state.firebase.profile ? state.firebase.profile : {}
  };
};

//This function will connect the component to the redux store and also connect the component to the firestore to listen
//on the collection "events" where the field organization is matching the current users organization
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "events",
      where: [
        [
          "organization",
          "==",
          props.profile.organization ? props.profile.organization : ""
        ]
      ]
    }
  ])
)(Schedule);
