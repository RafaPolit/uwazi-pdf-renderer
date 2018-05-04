/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pdfjsLib from 'pdfjs-dist';

import SelectionArea from './SelectionArea';
import SelectionLayer from './SelectionLayer';
import Page from './Page';

export default class PDF extends Component {
  static defaultProps = {
    Loading: () => <div>Loading ...</div>,
    pageClass: 'pdf-page',
    pageNumberProperty: 'page-number',
  }

  static propTypes = {
    url: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
    Loading: PropTypes.func,
    pageClass: PropTypes.string,
    pageNumberProperty: PropTypes.string,
  };

  state = { pdfDocument: null }

  componentDidMount() {
    // Where should this go? Prop?
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'http://localhost:8080/node_modules/pdfjs-dist/build/pdf.worker.js';
    // ---------------------------
    pdfjsLib.getDocument(this.props.url)
      .then((pdfDocument) => {
        this.setState({ pdfDocument });
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
  }

  pdfViewer = require('../../node_modules/pdfjs-dist/web/pdf_viewer.js')
  pdfViewerCss = require('../../node_modules/pdfjs-dist/web/pdf_viewer.css');

  render() {
    const { Loading, pageClass, pageNumberProperty } = this.props;
    const { pdfDocument } = this.state;

    if (!pdfDocument) {
      return <Loading />;
    }

    return (
      <SelectionArea pageClass={pageClass} pageNumberProperty={pageNumberProperty}>
        {() => [...Array(pdfDocument.numPages).keys()].map(pageNumber => (
          <SelectionLayer pageNumber={pageNumber + 1} key={pageNumber + 1}>
            <Page
              pdfDocument={pdfDocument}
              pdfViewer={this.pdfViewer}
              pageClass={pageClass}
              pageNumberProperty={pageNumberProperty}
            />
          </SelectionLayer>
        ))}
      </SelectionArea>
    );
  }
}
