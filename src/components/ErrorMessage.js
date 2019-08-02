import React from 'react';

export default class ErrorMessage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={"alert alert-danger alert-dismissible fade show"} style={{padding: "2% 2%"}} role="alert">
                <strong>Campo:</strong> {this.props.campo}
                <br/>
                <p>{this.props.descripcion}</p>
                <a className={"close"} data-dismiss="alert" onClick={this.props.dismissTableError}>
                    <span>×</span>
                </a>
            </div>
        );
    }
}
