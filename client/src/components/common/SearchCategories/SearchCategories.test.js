import React from 'react';
import { shallow } from 'enzyme';
import ProductSearch from './ProductSearch';

import * as redux from 'react-redux';

const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue([
  { id: 'bed', name: 'Bed' },
  { id: 'chair', name: 'Chair' },
  { id: 'sofa', name: 'Sofa' },
  { id: 'table', name: 'Table' },
  { id: 'dining', name: 'Dining' },
]);

describe('Component ProductSearch', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductSearch />);
    expect(component).toBeTruthy();
  });

  it('should contain ul element with class category_dropdown', () => {
    const component = shallow(<ProductSearch />);
    const ul = component.find('ul.category_dropdown');
    expect(ul.exists()).toBeTruthy();
  });

  it('should contain 5 li elements with class category_item', () => {
    const component = shallow(<ProductSearch />);
    const li = component.find('ul.category_dropdown li');
    expect(li.length).toBe(5);
  });

  it('first li should contain .category_item element with text Bed', () => {
    const component = shallow(<ProductSearch />);
    const li = component
      .find('ul.category_dropdown li .category_item')
      .first()
      .text();
    expect(li).toBe('Bed');
  });
});
