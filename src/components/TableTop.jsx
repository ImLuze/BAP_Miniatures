import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import bg from '../assets/img/bg.jpg';
import miniature from '../assets/img/miniature.jpg';

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  display: block;
  position: absolute;
`;

const Miniature = styled.img`
  width: 20rem;
  height: 23rem;
  transform: rotate(17deg);
  margin-left: 7rem;
  margin-top: 7rem;
`;

const getPointFromTouch = (touch, element, _scale) => {
  const rect = element.getBoundingClientRect();
  return {
    x: (touch.clientX - rect.left) / _scale,
    y: (touch.clientY - rect.top) / _scale
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
  const ref = useRef(null);

  const handleTouchStart = e => {
    if (e.touches.length == 2) {
      const pointA = getPointFromTouch(e.touches[0], ref.current, scale);
      const pointB = getPointFromTouch(e.touches[1], ref.current, scale);
      setInitDistance(getDistanceBetweenPoints(pointA, pointB));
      setMidpoint(getMidpoint(pointA, pointB));
    }
  };

  const handleTouchMove = e => {
    if (e.touches.length == 2) {
      e.preventDefault();
      const pointA = getPointFromTouch(e.touches[0], ref.current, prevScale);
      const pointB = getPointFromTouch(e.touches[1], ref.current, prevScale);
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
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `url(${bg})`,
        transform: `scale(${scale})`,
        transformOrigin: midpoint.x + 'px ' + midpoint.y + 'px'
      }}
    >
      <Miniature src={miniature} />
    </Container>
  );
};

export default TableTop;
