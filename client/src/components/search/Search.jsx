import React, { PropTypes } from 'react';
import { Icon, Input } from 'react-materialize';
import '../../style/main.scss';

const Search = ({ onChange }) =>
  <div>
    <Input
       id="search"
       s={6}
       label="Search"
       onChange={onChange}
       validate
       className="search"
     ><Icon style={{ color: 'white' }} >search</Icon></Input>
  </div>;

Search.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Search;
