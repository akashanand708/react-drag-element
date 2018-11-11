import React, { Component } from 'react';
import PropTypes from 'prop-types';

const HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical';
class CustomDrag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos1: 0,
            pos2: 0,
            pos3: 0,
            pos4: 0,
            top: 0,
            left: 0,
        };

    }
    componentDidMount() {
        let { dragId, dragItemId } = this.props;
        if (dragId !== undefined && dragId !== '' && dragId !== null &&
            dragItemId !== undefined && dragItemId !== '' && dragItemId !== null) {
            let elmnt = document.getElementById(`${dragItemId}`);
            let dragIdElement = document.getElementById(`${dragId}`);
            if (elmnt && dragIdElement) {
                this.dragElement(elmnt, dragIdElement);
            }
        }
    }
    dragElement = (elmnt, dragIdElement) => {
        if (dragIdElement && elmnt) {
            /* if present, the header is where you move the DIV from:*/
            dragIdElement.onmousedown = (e) => this.dragMouseDown(e, elmnt);
        }
    }

    dragMouseDown = (e, elmnt) => {
        let { pos1, pos2, pos3, pos4 } = this.state;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = (e) => this.elementDrag(e, elmnt);
        this.setState({ pos1, pos2, pos3, pos4 });
    }

    elementDrag = (e, elmnt) => {
        let { pos1, pos2, pos3, pos4 } = this.state;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let offsetTop = elmnt.offsetTop;
        let offsetLeft = elmnt.offsetLeft;
        if (offsetTop < 0) {
            offsetTop = 0;
        }
        if (offsetLeft < 0) {
            offsetLeft = 0;
        }
        let top = (offsetTop - pos2),
            left = (offsetLeft - pos1);
        let position = {};
        let { draggingType } = this.props;
        switch (draggingType) {
            case HORIZONTAL:
                position = { top: null, left };
                elmnt.style.left = (offsetLeft - pos1) + 'px';
                break;
            case VERTICAL:
                position = { top, left: null };
                elmnt.style.top = (offsetTop - pos2) + 'px';
                break;
            default:
                position = { top, left };
                elmnt.style.top = (offsetTop - pos2) + 'px';
                elmnt.style.left = (offsetLeft - pos1) + 'px';
                break;
        }
        this.setState({ pos1, pos2, pos3, pos4, top, left });
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
