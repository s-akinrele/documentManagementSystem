import React from 'react';
import { shallow } from 'enzyme';
import { Col, CardPanel, Icon, Dropdown } from 'react-materialize';
import { Link } from 'react-router';
import { expect } from 'chai';
import '../../src/main.scss';
import DocumentPreview from '../../src/components/documents/documentPreview';

describe('Test for document preview', () => {
  const setUp = () => {
    const props = {
      document: {}
    };
    const wrapper = shallow(<DocumentPreview {...props} />);
    return { wrapper, props };
  };
  it('document preview should be rendered', () => {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
    expect(wrapper.find(Dropdown).length).to.eql(1);
    expect(wrapper.find(Link).length).to.eql(1);
    expect(wrapper.find(Col).length).to.eql(1);
    expect(wrapper.find(CardPanel).length).to.eql(1);
    expect(wrapper.find(Icon).length).to.eql(1);
  });
  it('component should have props', () => {
    const { wrapper } = setUp();
    expect(wrapper.props().document).to.be.defined;
  });
  it('div with id access to have class', () => {
    const { wrapper } = setUp();
    expect(wrapper.find('#access').hasClass('access')).to.equal(true);
  });
  it('CardPanel to have class lighten-4 black-text ', () => {
    const { wrapper } = setUp();
    expect(wrapper.find(CardPanel).hasClass('lighten-4 black-text'));
  });
  it('span should have a class ', () => {
    const { wrapper } = setUp();
    expect(wrapper.find('span').hasClass('truncate'));
  });
});
