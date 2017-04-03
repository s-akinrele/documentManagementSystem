import React, { PropTypes } from 'react';

const App = props =>
      <div className="app">
        {React.cloneElement(props.children, props)}
      </div>;

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
