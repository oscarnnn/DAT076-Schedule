import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { addEvent } from "../../actions/eventActions";
import "react-datepicker/dist/react-datepicker.css";
import "./modal.css";

// This component will render a modal with a form to create a new event and add to schedule.
// The event will be saved in firestore database with help of redux dispatch
class EventModal extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      title: ""
    };
  }

  // Update startdate with the selected date from datepicker
  handleStart = date => {
    this.props.updateStart(date);
  };

  // Update enddate with the selected date from datepicker
  handleEnd = date => {
    this.props.updateEnd(date);
  };

  // Update the title for the event
  handleTitle = title => {
    this.setState({
      title: title.target.value
    });
  };

  // Fired when user clicks on submitbutton and will call on the addEvent reducer
  // to save event on firestore and add to schedule
  handleSubmit = (title, start, end) => {
    this.props.addEvent({
      start,
      end,
      title
    });
    this.props.close();
    this.setState({
      title: ""
    });
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="modal-background" />
        <div className="modal-wrapper">
          <span className="close-modal-btn" onClick={this.props.close}>
            ×
          </span>
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
            selected={this.props.start}
            onChange={this.handleStart}
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
            selected={this.props.end}
            onChange={this.handleEnd}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy HH:mm"
            timeCaption="time"
            style={{ width: "50%" }}
          />
          <br />
          <button
            className="btn pink lighten-1 z-depth-0"
            style={{ marginBottom: "10px" }}
            onClick={() =>
              this.handleSubmit(
                this.state.title,
                this.props.start,
                this.props.end
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

// Mapping the addEvent function to the component from redux store
const mapDispatchToProps = dispatch => {
  return {
    addEvent: event => dispatch(addEvent(event))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EventModal);
