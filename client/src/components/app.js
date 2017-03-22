import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div className="app"> 
              {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

export default App;