import React from 'react';
import { mount } from 'enzyme';
import { Input } from 'react-materialize';
import { expect } from 'chai';
import SearchUser from '../../src/components/user/searchUser';
import '../../src/main.scss';

describe('User search', () => {
  const setUp = () => {
    const props = {
      handleSearch: () => {}
    };
    const wrapper = mount(<SearchUser {...props} />);
    return { wrapper, props };
  };
  it('should render self', () => {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
    expect(wrapper.find(Input).length).to.equal(1);
  });
  it('should expect component to have props handleSearch', () => {
    const { wrapper } = setUp();
    expect(wrapper.props().handleSearch).to.be.defined;
  });
});
