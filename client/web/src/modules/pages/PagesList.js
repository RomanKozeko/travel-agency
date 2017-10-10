import React from 'react';
import PrefixLink from '../ui-elements/PrefixLink'

const PagesList = ({pages}) => (
  <div>
    <h2>Available pages</h2>
    <ul>
      {pages.map((page, i) => (
        <li key={page._id}><PrefixLink to={`/pages/${page.url}`}>{page.content[0].title}</PrefixLink></li>
      ))
      }
    </ul>
  </div>
);

export default PagesList;