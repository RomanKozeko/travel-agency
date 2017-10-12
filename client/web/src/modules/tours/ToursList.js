import React from 'react';

const ToursList = ({tours}) => {
  return (
    <div>
      <h2>Tours</h2>
      <ul>
        {tours.map((tour, i) => (
          <li key={i}>{tour.content[0].title}</li>
        ))
        }
      </ul>
    </div>
  );
};

export default ToursList;