import React, { Component } from 'react';
import '../../main.scss';
// import DocumentView from '../documents/documentView';

class Preloader extends Component {
  componentDidMount() {
    // $('body').addClass('loaded');
  }
  render() {
    return (

      <div>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div><div className="gap-patch">
              <div className="circle" />
            </div><div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
        {/* div className="container">
        <div id="loader-wrapper">
          <div id="loader" />

          <div className="loader-section section-left" />
          <div className="loader-section section-right" />

        </div>
         <div id="content">
          <h2>Page title</h2>
        </div>
        <DocumentView />
      </div>*/}
      </div>
    );
  }
}

export default Preloader;
