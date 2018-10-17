import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

ReactDOM.render(<Home />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
