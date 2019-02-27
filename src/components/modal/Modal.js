import React, { Component } from "react";
import "../../styles/modal.css";

// This component will render a modal with a close button and submit button.
// The component will render the children passed by its props
export default class EventModal extends Component {

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
          {this.props.children}
          <button
            className="btn pink lighten-1 z-depth-0"
            style={{ marginBottom: "10px" }}
            onClick={this.props.submit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
