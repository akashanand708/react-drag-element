# react-drag-element
react-drag-element provides a very simple way to make any react component draggable or floating on the screen. It also calculates top and left positions for draggable component.

# Installation
`npm install react-drag-element`

# Sample
![](ezgif.com-crop.gif)
# Quick Start

```
import CustomDrag from 'react-drag-element';


getFloatingComponentPosition = (positions) => {
        console.log("FLOATING COMPONENT POSITIONS....", positions);
}

render{

    return(
          <CustomDrag
                getPositions={this.getFloatingComponentPosition}
                dragItemId={'floating-component-id'}
                dragId={'draggable-area-id'}
                draggingType="horizontal"
            >
            <div id="floating-component-id"
              <div id="draggable-area-id">
              Header
              </div>
            </div>
          </CustomDrag>
         );
}

```

# Props
1. getPositions --> Methods to get positions. (Optional)
2. dragItemId   --> Id for the draggable component. (Required)
3. dragId       --> Id for the div inside draggable component,user can drag and drop the draggable component by clicking and dragging this area.  (Required)
4. draggingType --> horizontal/vertical (optional), if this value is not provided, it will behave random movement.