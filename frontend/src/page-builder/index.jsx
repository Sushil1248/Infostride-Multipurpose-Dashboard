import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import Canvas from './component/Canvas';
import TextBox from './component/TextBox';
import ImageBox from './component/ImageBox';
import Button from './component/Button';
import Editor from './TestComponent';

const PageBuilder = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Page Builder</h2>
        <Canvas>
          <TextBox text="Drag me onto the canvas" />
          <ImageBox imageUrl="https://via.placeholder.com/150" />
          <Button label="Click me" />
        </Canvas>
        <Editor />
      </div>
    </DndProvider>
  );
};

PageBuilder.propTypes = {
  // Add any additional props if needed
};

export default PageBuilder;
