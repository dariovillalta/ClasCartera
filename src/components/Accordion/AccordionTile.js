import React from 'react';
import PropTypes from 'prop-types';

export default class AccordionTile extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div>
        <div onClick={onClick} style={{ cursor: 'pointer', width: '100%', backgroundColor: this.props.color}} className={"card-header"}>
          <span style={{ color: 'black', fontFamily: 'Circular Std Medium'}}>{label}</span>
          <div style={{ float: 'right' }}>
            {!isOpen && <span>&#9650;</span>}
            {isOpen && <span>&#9660;</span>}
          </div>
          { this.props.showTrash ? (
            <img onClick={this.props.deleteVariable} src={"../assets/trash.png"} style={{height: "20px", width: "20px", display: "block", float: "right", marginRight: "10px"}}></img>
          ) : (
            <span></span>
          )}
        </div>
        {isOpen && (
          <div className={"card-body"} style={{backgroundColor: this.props.color}}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
