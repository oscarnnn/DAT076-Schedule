import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { addEvent } from '../../actions/eventActions';
import 'react-datepicker/dist/react-datepicker.css';
import './modal.css';



class EventModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            title: ''
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleStart = (date) => {
        this.setState({
            startDate:date
        });
        this.props.updateStart(date);
      }

      handleEnd = (date) => {
        this.setState({
            endDate:date
        });
        this.props.updateEnd(date);
      }

    handleOnChange = (t) => {
        this.setState({
            title:t.target.value
        })
    }

    handleSubmit = (title,start,end) => {
     this.props.addEvent({
            start,
            end,
            title,
        })
    }

    render() {
        if(!this.props.show){
            return null;
        }
        return (   
            <div>
            <div className="modal-wrapper">
                <div className="modal-body">
                <span className="close-modal-btn" onClick={this.props.close}>×</span>
                        <h5>Add Event</h5>
                    <div>
                        <label>Title</label>
                        <input type="text" value={this.state.title} onChange={this.handleOnChange}/>
                    </div>
                    <div>
                        <label>Start time</label>
                        <DatePicker
                            selected={this.props.start}
                            onChange={this.handleStart}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                        /> 
                    </div>
                    <div>
                        <label>End time</label>
                        <DatePicker
                            selected={this.props.end}
                            onChange={this.handleEnd}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                        />                    
                    </div>
                    <div>
                        <button onClick={() => this.handleSubmit(this.state.title,this.state.startDate,this.state.endDate)}>Submit</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      addEvent: (event) =>  dispatch(addEvent(event))
    }
  }
  
  export default connect(null,mapDispatchToProps)(EventModal);