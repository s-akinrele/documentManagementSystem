import React, { PropTypes } from 'react';
import { Input } from 'react-materialize';
import '../../main.scss';

const SearchUser = ({ handleSearch }) => (
  <div className="row">
    <div className="col s6 ">
      <Input
        type="text"
        label="Search for a user"
        name="searchterm"
        icon="search"
        required s={6}
        onChange={handleSearch}
      />
    </div>
  </div>
);

SearchUser.propTypes = {
  handleSearch: PropTypes.func.isRequired
};
export default SearchUser;
