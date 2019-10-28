import React from 'react';

export default class InlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      texto: this.props.texto
    }
  }

  showEditMode() {
    this.setState({
      editMode: true
    });
  }

  hideEditMode() {
    this.setState({
      editMode: false
    });
  }

  updateTexto() {
    this.setState({
      texto: $("#"+this.props.id).val(),
      editMode: false
    });
  }

  render(){
    if(this.state.editMode) {
      return (
        <div>
          <input id={this.props.id} defaultValue={this.state.texto} type="text" className={"form-control"}/>
          <div style={{margin: "2% 0% 0% 0%"}}>
            <img src={"../assets/confirm-icons/cancel.png"} onClick={this.hideEditMode.bind(this)} style={{height: "20px", width: "20px", display: "block", float: "right", marginRight: "10px", cursor: "pointer"}}></img>
            <img src={"../assets/confirm-icons/ok.png"} onClick={this.updateTexto.bind(this)} style={{height: "20px", width: "20px", display: "block", float: "right", marginRight: "10px", cursor: "pointer"}}></img>
          </div>
        </div>
      );
    } else {
      return (
        <div onClick={this.showEditMode.bind(this)}>
          <h4 id={this.props.id} style={{fontFamily: 'Circular Std Medium', color: "#71748d", cursor: "pointer"}} className={"alert-heading"} >{this.state.texto}</h4>
        </div>
      );
    }
  }
}