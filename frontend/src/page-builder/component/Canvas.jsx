import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const Canvas = ({ children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: () => ({ name: 'Canvas' }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const backgroundColor = isOver ? '#f0f0f0' : 'white';

  return (
    <div ref={drop} style={{ minHeight: '300px', border: '1px dashed #ccc', padding: '20px', backgroundColor }}>
      {children}
    </div>
  );
};

Canvas.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Canvas;