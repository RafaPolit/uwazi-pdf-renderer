import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pdfjsLib from 'pdfjs-dist';

import Page from './Page';

pdfjsLib.GlobalWorkerOptions.workerSrc = '../node_modules/pdfjs-dist/build/pdf.worker.js';

export default class PDF extends Component {
  static defaultProps = {
    Loading: () => {},
  }

  static propTypes = {
    url: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
    Loading: PropTypes.func,
  };

  state = { pdfDocument: null }

  componentDidMount() {
    // console.log('prior to get:', pdfjsLib);
  }

  getDocument() {
    return pdfjsLib.getDocument(this.props.url)
      .then((pdfDocument) => {
        console.log('about to set state');
        this.setState({ pdfDocument });
        return pdfDocument;
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
  }

  render() {
    const { Loading } = this.props;
    const { pdfDocument } = this.state;

    if (!pdfDocument) {
      return <Loading />;
    }

    console.log('numPages:', pdfDocument.numPages);

    const pages = [];
    for (let page = 1; page <= pdfDocument.numPages; page += 1) {
      pages.push(<Page
        key={page}
        page={page}
        pdf={pdfDocument}
      />);
    }

    return <div>{pages}</div>;
  }
}
