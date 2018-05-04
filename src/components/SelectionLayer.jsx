// TEST!!!
import React from 'react';
import PropTypes from 'prop-types';

const SelectionLayer = (props) => {
  console.log('Render SelectionLayer:', props);
  const { children, pageNumber, selections } = props;

  const selectionSpans = selections.map((_properties, index) => {
    const style = Object.assign({}, _properties, { position: 'absolute', backgroundColor: 'rgba(255,0,0,0.5)' });
    return <span style={style} key={index} />; // eslint-disable-line react/no-array-index-key
  });

  return (
    <div className="pdf selection-layer" style={{ position: 'relative' }}>
      { React.Children.map(children, child => React.cloneElement(child, { pageNumber })) }
      { selectionSpans }
    </div>
  );
};

SelectionLayer.defaultProps = {
  selections: [],
};

SelectionLayer.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  pageNumber: PropTypes.number.isRequired,
  selections: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default SelectionLayer;
