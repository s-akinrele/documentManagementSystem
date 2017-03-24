import React, { Component } from 'react';
import '../../main.scss';

class Filter extends Component {
  componentDidMount() {
    $('select').material_select();
  }
  render() {
    return (
      <div>
        <div className="input-field col s4" style={{ width : '200px' }}>
          <select ref="documentOption" id="documentOption" defaultValue="0">
            <option value="0" disabled >Choose an Option</option>
            <option value="private">My documents</option>
            <option value="public">Other Documents</option>
            <option value="role">Private Documents</option>
          </select>
        </div>
      </div>
      );
  }
}

export default Filter;
