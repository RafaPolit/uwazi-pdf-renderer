import React from 'react';
import path from 'path';
import fs from 'fs';
import pdfjsLib from 'pdfjs-dist';
import { shallow } from 'enzyme';

import PDF from '../PDF';
import Page from '../Page';

/* Check where is the better place for this? */
pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';

describe('PDF', () => {
  let component;
  let Loading;

  const readPDFData = pdfURL => new Promise((resolve, reject) => {
    fs.readFile(pdfURL, (err, rawData) => {
      if (err) { reject(err); }
      resolve(new Uint8Array(rawData));
    });
  });

  const render = async (props) => {
    const data = await readPDFData(path.join(__dirname, 'files/batman.pdf'));
    const serverClientMock = {
      data,
      disableFontFace: true,
      nativeImageDecoderSupport: 'none',
    };

    component = shallow(<PDF url={serverClientMock} {...props} />);
  };

  it('should render a default Loading', async () => {
    await render();
    expect(component.type()).toBe(component.instance().props.Loading);
  });

  it('should render the passed component when loading', async () => {
    Loading = () => <div className="Loading" />;
    await render({ Loading });
    expect(component.type()).toBe(Loading);
  });

  it('should render one Page component for each page', async () => {
    await render();
    await component.update();
    expect(component.find(Page).length).toBe(28);
  });
});
