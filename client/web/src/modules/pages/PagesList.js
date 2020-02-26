import React, { Component } from 'react';
import PrefixLink from '../ui-elements/PrefixLink';

const PagesList = ({ pages }) => (
  <ul>
    {pages.map((page, i) => (
      <li key={page._id}>
        <PrefixLink to={`/pages/${page.url}`}>
          {page.content ? page.content.title : ''}
        </PrefixLink>
      </li>
    ))}
  </ul>
);

export default PagesList;
