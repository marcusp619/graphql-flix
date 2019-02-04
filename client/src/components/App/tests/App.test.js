import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme'
import App from '../App';

describe('App', () => {
  it('works', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  });  
})
