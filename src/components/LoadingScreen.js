import React from 'react';

export default class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", position: "absolute", top: "0px", left: "0px", backgroundColor: "rgba(189,189,189,0.3)", zIndex: "10"}}>
                <div>
                    <div className={"row"} style={{display: "flex", justifyContent: "center"}}>
                        <span className="dashboard-spinner spinner-lg"></span>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <h3 className={"text-center"}>{this.props.mensaje}</h3>
                    </div>
                </div>
            </div>
        );
    }
}
