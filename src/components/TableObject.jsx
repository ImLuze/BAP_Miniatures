import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  position: absolute;
  transition: transform 0.2s;
`;

const getPointFromTouch = (touch, element, _scale) => {
  const rect = element.getBoundingClientRect();
  return {
    x: (touch.clientX - rect.left) / _scale,
    y: (touch.clientY - rect.top) / _scale
  };
};

const TableObject = ({ image, scale }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });
  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleTouchStart = e => {
    if (e.touches.length == 1) {
      setInitPos(getPointFromTouch(e.touches[0], ref.current, scale));
    }
  };

  const handleTouchMove = e => {
    if (e.touches.length == 1) {
      e.preventDefault();
      const newPos = getPointFromTouch(e.touches[0], ref.current, scale);
      setPos({
        x: prevPos.x + (newPos.x - initPos.x),
        y: prevPos.y + (newPos.y - initPos.y)
      });
    }
  };

  const handleTouchEnd = () => {
    if (pos) setPrevPos(pos);
  };

  return (
    <Img
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      src={image}
      width={100}
      height={200}
      style={{
        position: 'absolute',
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }}
    />
  );
};

TableObject.propTypes = {
  image: PropTypes.string,
  scale: PropTypes.float
};

export default TableObject;
