import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pdfjsLib from 'pdfjs-dist';

import Page from './Page';

export default class PDF extends Component {
  static defaultProps = {
    Loading: () => <div>Que dice algo</div>,
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
    console.log('URL:', this.props.url);
    pdfjsLib.getDocument(this.props.url)
      .then((pdfDocument) => {
        console.log('about to set state');
        this.setState({ pdfDocument });
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
  }

  render() {
    console.log('Render!');
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
