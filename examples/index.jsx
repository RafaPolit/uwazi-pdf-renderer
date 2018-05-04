/* eslint-disable object-curly-newline */
import React from 'react';
import ReactDOM from 'react-dom';

import PDF from '../src';

const wrapper = document.getElementById('root');
if (wrapper) {
  const highlights = [
    { top: 434.875, left: 96.73516845703125, width: 207.80459594726562, height: 17, page: 1 },
    { top: 434.875, left: 304.546875, width: 83.22189331054688, height: 17, page: 1 },
    { top: 434.875, left: 387.765625, width: 4, height: 17, page: 1 },
    { top: 453.90625, left: 37.328125, width: 328.3543701171875, height: 17, page: 1 },
    { top: 472.9375, left: 37.328125, width: 128.60000610351562, height: 17, page: 1 },
    { top: 472.9375, left: 165.921875, width: 41.81414794921875, height: 17, page: 1 },
    { top: 472.9375, left: 207.734375, width: 145.0599365234375, height: 17, page: 1 },
    { top: 472.9375, left: 352.796875, width: 48.942108154296875, height: 17, page: 1 },
    { top: 472.9375, left: 401.734375, width: 4, height: 17, page: 1 },
    { top: 491.953125, left: 37.328125, width: 175.7444610595703, height: 17, page: 1 },
    { top: 491.953125, left: 213.0625, width: 39.15679931640625, height: 17, page: 1 },
  ];
  ReactDOM.render(<PDF url="../src/components/specs/files/batman.pdf" highlights={highlights} />, wrapper);
}
