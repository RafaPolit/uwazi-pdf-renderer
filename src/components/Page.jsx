import React from 'react';
import PropTypes from 'prop-types';

const Page = props => <div>Holder for page {props.page}</div>;

Page.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Page;
