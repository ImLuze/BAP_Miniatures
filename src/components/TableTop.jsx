import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import bg from '../assets/img/bg.jpg';

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  display: block;
  position: absolute;
`;

const getPointFromTouch = (touch, element) => {
  const rect = element.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
};

const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2
});

const getDistanceBetweenPoints = (pointA, pointB) =>
  Math.sqrt(
    Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2)
  );

const TableTop = () => {
  const [scale, setScale] = useState(1);
  const [prevScale, setPrevScale] = useState(1);
  const [initDistance, setInitDistance] = useState(0);
  const [midpoint, setMidpoint] = useState({ x: 0, y: 0 });
  const container = useRef(null);

  const handleTouchStart = e => {
    if (e.touches.length == 2) {
      const pointA = getPointFromTouch(e.touches[0], container.current);
      const pointB = getPointFromTouch(e.touches[1], container.current);
      setInitDistance(getDistanceBetweenPoints(pointA, pointB));
      setMidpoint(getMidpoint(pointA, pointB));

      console.log({
        x: midpoint.x / screen.width,
        y: midpoint.y / screen.height
      });
    }
  };

  const handleTouchMove = e => {
    if (e.touches.length == 2) {
      e.preventDefault();
      const pointA = getPointFromTouch(e.touches[0], container.current);
      const pointB = getPointFromTouch(e.touches[1], container.current);
      const distance = getDistanceBetweenPoints(pointA, pointB);

      if (prevScale + (distance - initDistance) / 100 > 1) {
        setScale(prevScale + (distance - initDistance) / 100);
      } else setScale(1);
    }
  };

  const handleTouchEnd = () => {
    if (scale) setPrevScale(scale);
  };

  return (
    <Container
      ref={container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `url(${bg})`,
        transform: `scale(${scale})`,
        transformOrigin: midpoint.x + 'px ' + midpoint.y + 'px'
      }}
    />
  );
};

export default TableTop;
