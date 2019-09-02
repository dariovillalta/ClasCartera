import React from 'react';
import PropTypes from 'prop-types';

import AccordionTile from './AccordionTile.js';

export default class Accordion extends React.Component {
    static propTypes = {
        allowMultipleOpen: PropTypes.bool,
        children: PropTypes.instanceOf(Object).isRequired,
    };

    constructor(props) {
        super(props);
        const openSections = {};
        this.state = { openSections };
        if (this.props.children.length != undefined && this.props.children.length > 1) {
            this.props.children.forEach(child => {
                if (child.props.isOpen) {
                    openSections[child.props.label] = true;
                }
            });
        }
    }

    onClick = label => {
        const {
            props: { allowMultipleOpen },
            state: { openSections },
        } = this;

        const isOpen = !!openSections[label];

        if (allowMultipleOpen) {
            this.setState({
                openSections: {
                    ...openSections,
                    [label]: !isOpen
                }
            });
        } else {
            this.setState({
                openSections: {
                    [label]: !isOpen
                }
            });
        }
    };

    render() {
        const {
            onClick,
            props: { children },
            state: { openSections },
        } = this;

        if(children.length != undefined && children.length > 1) {
            return (
                <div style={{width: "100%"}}>
                    {children.map((child, i) => (
                        <AccordionTile showTrash={this.props.showTrash} deleteVariable={this.props.deleteVariable} key={i} isOpen={!!openSections[child.props.label]} label={child.props.label} onClick={onClick} color={this.props.color}>
                            {child.props.children}
                        </AccordionTile>
                    ))}
                </div>
            );
        } else {
            return (
                <div style={{width: "100%"}}>
                    <AccordionTile showTrash={this.props.showTrash} deleteVariable={this.props.deleteVariable} isOpen={!!openSections[children.props.label]} label={children.props.label} onClick={onClick} color={this.props.color}>
                        {children}
                    </AccordionTile>
                </div>
            );
        }
      }
}
