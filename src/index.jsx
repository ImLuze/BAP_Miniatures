import './reset.css';
import React from 'react';
import { render } from 'react-dom';

import TableTop from './components/TableTop.jsx';

const App = () => {
  document.body.addEventListener('gesturestart', e => {
    e.preventDefault();
  });
  return <TableTop />;
};

render(<App />, document.getElementById('app'));
