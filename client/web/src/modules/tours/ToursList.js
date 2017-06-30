import React from 'react';

import Button from '../ui-elements/button';
import Input from '../ui-elements/input';

const ToursList = ({tours}) => (
  <div>
    <h2>Tours</h2>
    <ul>
      {tours.map((tour, i) => (
        <li key={i}>{tour.title}</li>
      ))
      }
    </ul>
    <Input />
    <Button text={'Add new tour'} />
  </div>

);

export default ToursList;