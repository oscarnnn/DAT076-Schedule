import React, { Component } from 'react';

export default class EventModal extends Component {

    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div>
                <div>
                    {this.props.startState}
                </div>
                <div>
                    <button
                    onClick={this.props.onClose}
                    >
                    Close
                    </button>
                </div>
            </div>
        );
    }
}
