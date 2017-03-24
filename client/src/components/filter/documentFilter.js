import React, { Component } from 'react';
import request from '../../helpers/request';
import '../../main.scss';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleOption = this.handleOption.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    this.handleOption();
  }
  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) { return false; }
    }
    return true;
  }
  handleOption() {
    $('#documentOption').change((e) => {
      const selectedValue = $(e.target).val();
      if (selectedValue === 'privateDoc') {
        request('http://localhost:5000/documents/access/private', 'get', null, (err, res) => {
          if (err) {
        // show toast that create failed
          } else {
            if (this.isEmpty(res.body)) {
              Materialize.toast('You have no private documents', 4000, 'rounded');
            }
            this.props.dispatch(this.props.fetchUserDocument(res.body));
          }
        });
      } else if (selectedValue === 'otherDoc') {
        request('http://localhost:5000/accessible/documents', 'get', null, (err, res) => {
          if (err) {
        // show toast that create failed
          } else {
            this.props.dispatch(this.props.fetchUserDocument(res.body));
          }
        });
      } else {
        request('http://localhost:5000/users/documents', 'get', null, (err, res) => {
          if (err) {
        // show toast that create failed
          } else {
            this.props.dispatch(this.props.fetchUserDocument(res.body));
          }
        });
      }
    });
  }
  render() {
    return (
      <div>
        <div className="input-field col s4" style={{ width: '200px' }}>
          <select id="documentOption" defaultValue="0">
            <option value="0" disabled >Choose an Option</option>
            <option value="myDoc">My documents</option>
            <option value="otherDoc">Other Documents</option>
            <option value="privateDoc">Private Documents</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Filter;
