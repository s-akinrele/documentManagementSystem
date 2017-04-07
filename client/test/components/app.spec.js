import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import App from '../../src/components/App.jsx';
import '../../src/style/main.scss';

describe(' Test for App Component', () => {
  const setUp = () => {
    const props = {
      children: {},
    };
    const wrapper = mount(<App><div>Hello</div></App>);
    return { wrapper, props };
  };

  it('should render self', () => {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
  });
});
