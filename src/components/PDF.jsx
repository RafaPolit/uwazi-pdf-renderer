import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pdfjsLib from 'pdfjs-dist';

import Page from './Page';

export default class PDF extends Component {
  static defaultProps = {
    Loading: () => <div>Loading ...</div>,
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
    pdfjsLib.getDocument(this.props.url)
      .then((pdfDocument) => {
        this.setState({ pdfDocument });
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
