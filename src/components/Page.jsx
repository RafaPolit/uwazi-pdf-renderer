// TEST!!!
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static defaultProps = {
    pageClass: 'pdf-page',
    pageNumber: null,
    pageNumberProperty: 'page-number',
  }

  static propTypes = {
    pdfDocument: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    pdfViewer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    pageClass: PropTypes.string,
    pageNumber: PropTypes.number,
    pageNumberProperty: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.pageContainer = React.createRef();
  }

  componentWillMount() {
    const { pdfDocument, pdfViewer, pageNumber } = this.props;

    pdfDocument.getPage(pageNumber)
      .then((pageData) => {
        const scale = 1;

        this.pdfPageView = new pdfViewer.PDFPageView({
          container: this.pageContainer.current,
          id: pageNumber,
          scale,
          defaultViewport: pageData.getViewport(scale),
          enhanceTextSelection: true,
          textLayerFactory: new pdfViewer.DefaultTextLayerFactory(),
        });

        this.pdfPageView.setPdfPage(pageData);
        this.pdfPageView.draw()
          .then(() => {
            // console.log('drawn!');
          })
          .catch(e => e);
      });
  }

  shouldComponentUpdate(nextProps) {
    const differentDocument = this.props.pdfDocument !== nextProps.pdfDocument;
    const differentPage = this.props.pageNumber !== nextProps.pageNumber;
    return differentDocument || differentPage;
  }

  render() {
    console.log('Render Page:', this.props);
    const { pageClass, pageNumber, pageNumberProperty } = this.props;
    const pageNumberProp = {};
    pageNumberProp[`data-${pageNumberProperty}`] = pageNumber;

    return <div className={`pdf ${pageClass}`} {...pageNumberProp} style={{ position: 'relative' }} ref={this.pageContainer} />;
  }
}
