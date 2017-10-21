import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    prefix: state.app.languages.languagePrefix,
    defaultLang: state.app.languages.defaultLang
  };
};

let PrefixLink = ({className, children, to, prefix, defaultLang}) => {
  const urlPrefix = prefix === defaultLang || !prefix ? '' : `/${prefix}`;
  return (
    <Link className={className} to={`${urlPrefix}${to}`}>
      {children}
    </Link>
  )
};

PrefixLink = connect(
  mapStateToProps,
)(PrefixLink);

export default PrefixLink;