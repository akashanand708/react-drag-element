import React, { Component } from 'react';
import PropTypes from 'prop-types';

const HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical';
class CustomDrag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position1: 0,
            position2: 0,
            position3: 0,
            position4: 0,
            top: 0,
            left: 0,
        };

    }
    componentDidMount() {
        let { dragId, dragItemId } = this.props;
        if (dragId !== undefined && dragId !== '' && dragId !== null &&
            dragItemId !== undefined && dragItemId !== '' && dragItemId !== null) {
            let element = document.getElementById(`${dragItemId}`);
            let dragIdElement = document.getElementById(`${dragId}`);
            if (element && dragIdElement) {
                this.dragElement(element, dragIdElement);
            }
        }
    }
    dragElement = (element, dragIdElement) => {
        if (dragIdElement && element) {
            /* if present, the header is where you move the DIV from:*/
            dragIdElement.onmousedown = (e) => this.dragMouseDown(e, element);
        }
    }

    dragMouseDown = (e, element) => {
        let { position1, position2, position3, position4 } = this.state;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        position3 = e.clientX;
        position4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = (e) => this.elementDrag(e, element);
        this.setState({ position1, position2, position3, position4 });
    }

    elementDrag = (e, element) => {
        let { position1, position2, position3, position4 } = this.state;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        position1 = position3 - e.clientX;
        position2 = position4 - e.clientY;
        position3 = e.clientX;
        position4 = e.clientY;
        // set the element's new position:
        let offsetTop = element.offsetTop;
        let offsetLeft = element.offsetLeft;
        offsetTop = Math.max(offsetTop,0);
        offsetLeft = Math.max(offsetLeft,0);
        
        let top = (offsetTop - position2),
            left = (offsetLeft - position1);
        let position = {};
        let { draggingType } = this.props;
        switch (draggingType) {
            case HORIZONTAL:
                position = { top: null, left };
                element.style.left = (offsetLeft - position1) + 'px';
                break;
            case VERTICAL:
                position = { top, left: null };
                element.style.top = (offsetTop - position2) + 'px';
                break;
            default:
                position = { top, left };
                element.style.top = (offsetTop - position2) + 'px';
                element.style.left = (offsetLeft - position1) + 'px';
                break;
        }
        this.setState({ position1, position2, position3, position4, top, left });
        this.props.getPositions(position)
    }

    closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    render() {
        return (
            <div id="custom-drag-id">
                {this.props.children}
            </div>
        );
    }
}
CustomDrag.defaultProps = {
    draggingType: 'RANDOM',
    getPositions: () => { }
};
CustomDrag.propTypes = {
    draggingType: PropTypes.string,
    getPositions: PropTypes.func,
    dragId: PropTypes.string.isRequired,
    dragItemId: PropTypes.string.isRequired
};

export default CustomDrag;
