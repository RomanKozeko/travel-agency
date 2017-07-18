import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  pagination: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  wrapper: {
    textAlign: 'center'
  },
  link: {
    display: 'block',
    cursor: 'pointer'
  },
  disabledLink: {
    link: 'redContainer',
    opacity: 0.5
  }
};

const Pagination = ({classes, pageNumber, requestPage, pageCount}) => {
  const prevArrow = pageNumber === 0 ? classes.disabledLink : classes.link;
  const nextArrow = pageNumber + 1 === pageCount ? classes.disabledLink : classes.link;
  return (
    <div className={classes.wrapper}>
      <div className={classes.pagination}>
        <div className={prevArrow} onClick={() => requestPage(+pageNumber - 1)}>
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
            <path d="M0-.5h24v24H0z" fill="none"/>
          </svg>
        </div>
        <span>{pageNumber + 1}</span>
        <div className={nextArrow} onClick={() => requestPage(+pageNumber + 1)}>
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
            <path d="M0-.25h24v24H0z" fill="none"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default injectSheet(styles)(Pagination)