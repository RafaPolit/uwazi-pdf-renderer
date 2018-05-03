import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    pdfDocument: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    pdfViewer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    page: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.pageContainer = React.createRef();
  }

  componentWillMount() {
    const { pdfDocument, pdfViewer, page } = this.props;

    console.log('pdfViewer:', pdfViewer);
    pdfDocument.getPage(page)
      .then((pageData) => {
        const scale = 1;
        const viewport = pageData.getViewport(scale);
        console.log('Width:', viewport.width, ', Height:', viewport.height);

        this.pdfPageView = new pdfViewer.PDFPageView({
          container: this.pageContainer.current,
          id: page,
          scale,
          defaultViewport: pageData.getViewport(scale),
          enhanceTextSelection: true,
          textLayerFactory: new pdfViewer.DefaultTextLayerFactory(),
        });

        console.log('this.pdfPageView:', this.pdfPageView);
        this.pdfPageView.setPdfPage(pageData);
        this.pdfPageView.draw()
          .then(() => {
            console.log('drawn!');
          })
          .catch(e => e);
      });
  }

  render() {
    return <div ref={this.pageContainer} />;
  }
}
