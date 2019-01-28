import React from 'react';
import ReactDOM from 'react-dom';
import ConnectSpotify from './connect-spotify';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConnectSpotify />, div);
  ReactDOM.unmountComponentAtNode(div);
});
