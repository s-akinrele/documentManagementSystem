import React from 'react';
import { shallow } from 'enzyme';
import { Row, Col } from 'react-materialize';
import { expect } from 'chai';
import NotFound from '../../src/components/notFoundPage/notFoundPage';
import '../../src/main.scss';

describe('Not found page', () => {
  it('should render itself', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.length).to.eql(1);
  });
  it('should have row and column', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find(Row).length).to.eql(2);
    expect(wrapper.find(Col).length).to.eql(3);
  });
  it('h3 text to be not found', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('h3').text('Page Not Found'));
  });
  it('expect Whoops! Sorry there is nothing to see here to exist', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('#sorry').text('Whoops! Sorry there is nothing to see here'));
  });
  it('h2 text to be Document Management System', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('h2').text('Document Management System'));
  });
  it('expect dms information to exist', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('#dms').text('Document Management System helps you to manage your documents in an organized way.You can create a document, edit it and share it with other users.'));
  });
});
