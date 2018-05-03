import React from 'react';
import ReactDOM from 'react-dom';

import PDF from '../src';

const wrapper = document.getElementById('root');
if (wrapper) {
  ReactDOM.render(<PDF url="../src/components/specs/files/batman.pdf" />, wrapper);
}
