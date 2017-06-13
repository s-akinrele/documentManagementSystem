import React from 'react';
import { shallow } from 'enzyme';
import { Col, CardPanel, Icon, Dropdown } from 'react-materialize';
import { Link } from 'react-router';
import { expect } from 'chai';
import '../../src/style/main.scss';
import DocumentPreview from '../../src/components/documents/DocumentPreview.jsx';


describe('Test for document preview', () => {
  const setUp = () => {
    const props = {
      document: { id: 1,
        title: 'my doc',
        content: 'this is my doc' }
    };

    const wrapper = shallow(<DocumentPreview {...props} />);
    return { wrapper, props };
  };

  it('should render itself', () => {
    const { wrapper } = setUp();
    expect(wrapper.length).to.eql(1);
    expect(wrapper.find(Dropdown).length).to.eql(1);
    expect(wrapper.find(Link).length).to.eql(1);
    expect(wrapper.find(Col).length).to.eql(1);
    expect(wrapper.find(CardPanel).length).to.eql(1);
    expect(wrapper.find(Icon).length).to.eql(1);
  });

  it('should have props ', () => {
    const { wrapper } = setUp();
    expect(wrapper.props().document).to.be.defined;
  });

  it('should have props for content', () => {
    const { wrapper, props } = setUp();
    expect(wrapper.instance().props.document).to.equal(props.document);
  });

  it('should have a class name access', () => {
    const { wrapper } = setUp();
    expect(wrapper.find('#access').hasClass('access')).to.equal(true);
  });

  it('should to have class lighten-4 black-text ', () => {
    const { wrapper } = setUp();
    expect(wrapper.find(CardPanel).hasClass('lighten-4 black-text'));
  });

  it('should have a class truncate ', () => {
    const { wrapper } = setUp();
    expect(wrapper.find('span').hasClass('truncate'));
  });
});
