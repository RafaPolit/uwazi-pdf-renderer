// TEST!!!
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import selectionHelpers from '../helpers/selectionHelpers';

const conformSelections = (selectionRanges, pageNumber, backgroundColor) => selectionRanges
  .filter(range => range.page === String(pageNumber) || range.page === pageNumber)
  .map((_range) => {
    const range = Object.assign({}, _range);
    delete range.page;
    return Object.assign(range, backgroundColor ? { backgroundColor } : {});
  });

export default class SelectionArea extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    pageClass: PropTypes.string.isRequired,
    pageNumberProperty: PropTypes.string.isRequired,
    highlights: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  constructor() {
    /* The propossed solution of (...args) and then super(args)
     * does not pass the same number of elements!
     */
    super(...arguments); // eslint-disable-line prefer-rest-params
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  state = { selectionRanges: [] }

  handleMouseUp() {
    const { pageClass, pageNumberProperty } = this.props;
    const selectionRanges = selectionHelpers.getSelection(pageClass, pageNumberProperty);
    this.setState({ selectionRanges });
    selectionHelpers.unselect();
  }

  render() {
    console.log('Render SelectionArea! State:', this.state, ' Props: ', this.props);
    const { selectionRanges } = this.state;
    const { highlights } = this.props;
    console.log('highlights:', highlights);

    const children = this.props.children().map((child) => {
      const selections = []
        .concat(conformSelections(selectionRanges, child.props.pageNumber))
        .concat(conformSelections(highlights, child.props.pageNumber, 'rgba(0,255,0,0.5)'));

      return React.cloneElement(child, { selections });
    });

    return (
      <div
        className="pdf selection-area"
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        role="presentation"
      >
        { children }
      </div>
    );
  }
}
