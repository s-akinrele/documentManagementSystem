import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../main.scss';
import { filterDocuments, filterAccessibleDocuments, fetchUserDocument } from '../../actions/actionCreator';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleOption = this.handleOption.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    this.handleOption();
  }
  handleOption() {
    $('#documentOption').change((e) => {
      const selectedValue = $(e.target).val();
      if (selectedValue === 'privateDoc') {
        this.props.filterPrivateDocuments();
        if (this.props.documents.length < 0) {
          Materialize.toast('You have no private documents', 4000, 'rounded');
        }
      } else if (selectedValue === 'otherDoc') {
        this.props.filterAccessibleDocuments();
      } else {
        this.props.fetchUserDocument();
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

const mapStateToProps = state => ({
  metadata: state.documents
});

const mapDispatchToProps = dispatch => ({
  filterPrivateDocuments: bindActionCreators(filterDocuments, dispatch),
  filterAccessibleDocuments: bindActionCreators(filterAccessibleDocuments, dispatch),
  fetchUserDocument: bindActionCreators(fetchUserDocument, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
