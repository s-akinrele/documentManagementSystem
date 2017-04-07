import React, { PropTypes } from 'react';
import '../../style/main.scss';

const SetLimit = ({ handleLimitChange, value }) =>
 ( <div className="limit">
  <label htmlFor="limitset">Set limit</label>
  <input
    name="limitset"
    type="number"
    className="validate"
    value={value}
    onChange={handleLimitChange}
    />
  </div>);

export default SetLimit;