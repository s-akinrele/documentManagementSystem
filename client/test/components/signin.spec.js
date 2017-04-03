import React from 'react';
import { shallow } from 'enzyme';
import { Input } from 'react-materialize';
import { expect } from 'chai';
import Signin from '../../src/components/authentication/signin';
import '../../src/main.scss';

describe(' Test for SignIn Component', () => {
  const setUp = () => {
    const props = {
      document: () => {},
      handleLogin: () => {},
      handleChange: () => {}
    };
    const wrapper = shallow(<Signin {...props} />);
    return { wrapper, props };
  };

  it('should render self', () => {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
    expect(wrapper.find(Input).length).to.eql(2);
  });

  it('should consist of props', () => {
    const { wrapper } = setUp();
    expect(wrapper.props().handleLogin).to.be.defined;
    expect(wrapper.props().handleChange).to.be.defined;
  });
});
