import React from 'react';
import { mount } from 'enzyme';
import { Modal, Button, Icon } from 'react-materialize';
import { expect } from 'chai';
import Dialog from '../../src/components/diaLog/confirmDialog';
import '../../src/main.scss';

describe(' Test for Dialog Component', () => {
  const setUp = () => {
    const props = {
      onContinue: () => {},
      header: '',
      message: ''
    };
    const wrapper = mount(<Dialog {...props} />);
    return { wrapper, props };
  };

  it('should render self', () => {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
    expect(wrapper.find(Modal).length).to.equal(1);
    expect(wrapper.find(Button).length).to.equal(1);
    expect(wrapper.find(Icon).length).to.equal(1);
  });

  it('should consist of props', () => {
    const { wrapper } = setUp();
    expect(wrapper.props().onContinue).to.be.defined;
    expect(wrapper.props().header).to.be.defined;
    expect(wrapper.props().message).to.be.defined;
  });
});
