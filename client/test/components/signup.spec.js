import React from 'react';
import { shallow } from 'enzyme';
import { Input } from 'react-materialize';
import { expect } from 'chai';
import Signup from '../../src/components/authentication/Signup.jsx';
import '../../src/style/main.scss';

describe(' Test for Signup Component', () => {
  const setUp = () => {
    const props = {
      handleChange: () => {},
      user: {},
      roles: [],
      handleSignup: () => {}
    };
    const wrapper = shallow(<Signup {...props} />);
    return { wrapper, props };
  };

  it('should render self', () => {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
    expect(wrapper.find(Input).length).to.eql(5);
  });

  it('should consist of props', () => {
    const { wrapper } = setUp();
    expect(wrapper.props().handleSignup).to.be.defined;
    expect(wrapper.props().handleChange).to.be.defined;
    expect(wrapper.props().user).to.be.defined;
    expect(wrapper.props().roles).to.be.defined;
  });
});
