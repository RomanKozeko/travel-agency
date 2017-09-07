import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const PagesList = ({pages}) => (
  <div>
    <h2>Available pages</h2>
    <ul>
      {pages.map((page, i) => (
        <li key={page._id}><Link to={`pages/${page._id}`}>{page.content[0].title}</Link></li>
      ))
      }
    </ul>
  </div>
);

export default PagesList;