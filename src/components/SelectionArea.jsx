// TEST!!!
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import selectionHelpers from '../helpers/selectionHelpers';

export default class SelectionArea extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    pageClass: PropTypes.string.isRequired,
    pageNumberProperty: PropTypes.string.isRequired,
  }

  constructor() {
    /* The propossed solution of (...args) and then super(args)
     * does not pass the same number of elements!
     */
    super(...arguments); // eslint-disable-line prefer-rest-params
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  state = { selectionRange: [] }

  handleMouseUp() {
    const { pageClass, pageNumberProperty } = this.props;
    this.setState({ selectionRange: selectionHelpers.getSelection(pageClass, pageNumberProperty) });
    selectionHelpers.unselect();
  }

  render() {
    console.log('Render SelectionArea! State:', this.state, ' Props: ', this.props);
    const { selectionRange } = this.state;

    const children = this.props.children().map((child) => {
      const selections = selectionRange
        .filter(range => range.page === String(child.props.pageNumber))
        .map((_range) => {
          const range = _range;
          delete range.page;
          return range;
        });

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
