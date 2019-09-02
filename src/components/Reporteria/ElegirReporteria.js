import React from 'react';

export default class ElegirReporteria extends React.Component {
    render() {
        return (
            <div style={{height: '80vh', display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{width: '100%'}}>
                    <div className={"row"} style={{margin: '5% 0%', width: '100%'}}>
                        <a className={"btn btn-outline-success btn-block btnWhiteColorHover fontSize1EM"} style={{width: '100%'}} onClick={this.props.showReportsView}>Ver</a>
                    </div>
                    <div className={"row"} style={{margin: '5% 0%', width: '100%'}}>
                        <a className={"btn btn-outline-success btn-block btnWhiteColorHover fontSize1EM"} style={{width: '100%'}} onClick={this.props.showReportsDownload}>Descargar</a>
                    </div>
                </div>
            </div>
        );
    }
}
