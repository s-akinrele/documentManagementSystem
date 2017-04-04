import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../../main.scss';
import { filterPrivateDocuments, filterAccessibleDocuments, fetchUserDocument, fetchAllDocuments } from '../../actions/actionCreator';
import { currentUser } from '../../helpers/auth';

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
      } else if (selectedValue === 'alldocuments') {
        this.props.fetchAllDocuments();
      } else {
        this.props.fetchUserDocument();
      }
    });
  }
  render() {
    const isAdmin = currentUser().RoleId === 1;
    return (
      <div>
        <div className="input-field col s4" style={{ width: '200px' }}>
          <select id="documentOption" defaultValue="0">
            <option value="0" disabled >Choose an Option</option>
            <option value="myDoc">My documents</option>
            <option value="otherDoc">Other Documents</option>
            <option value="privateDoc">Private Documents</option>
            { isAdmin ? <option value="alldocuments"> All Documents </option> : null }
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  metadata: state.documents
});

const mapDispatchToProps = {
  filterPrivateDocuments,
  filterAccessibleDocuments,
  fetchUserDocument,
  fetchAllDocuments
};

Filter.propTypes = {
  filterPrivateDocuments: PropTypes.func.isRequired,
  filterAccessibleDocuments: PropTypes.func.isRequired,
  fetchAllDocuments: PropTypes.func.isRequired,
  fetchUserDocument: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
