import React from 'react';
import { shallow } from 'enzyme';

import PDF from '../PDF';
import Page from '../Page';

describe('PDF', () => {
  it('should render one Page component for each page', () => {
    const component = shallow(<PDF />);
    expect(component.find(Page).length).toBe(29);
  });
});
