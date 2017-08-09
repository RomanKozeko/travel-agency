import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important';
import classNames from 'classnames'
const styles = StyleSheet.create({
  pagination: {
    display: 'inline-flex',
    alignItems: 'center',
	  backgroundColor: '#f6f6f6'
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
    opacity: 0.6

  },
  paginationItems: {
	  listStyle: 'none',
    padding: '8px',
  },
	paginationItem: {
		borderRadius: '50%',
    color: 'rgba(33,33,33 ,1)',
    display: 'inline-block',
    marginRight : '5px',
    transition: '.15s ease-in',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '20px',
    minWidth: '35px',
    padding: '8px 0',
		verticalAlign: 'middle',
    ':hover': {
      background: '#eeeff3',
	    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)'
    }
	},
	paginationCurrentPage: {
		background: '#8c95a5',
    color: '#fff',
		boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)'
  }
});

const renderPaginationItemsBigData = (pageNumber, pageCount, requestPage) => {
	const startItem = pageCount > 10 ? pageNumber - 8 : 0;
	return (
    <ul className={css(styles.paginationItems)}>
			{[...Array( 10)].map((x, i) =>
				i === 0  ?
          <li key={i + 1}
              className={classNames({
						    [css(styles.paginationItem, styles.paginationCurrentPage)]: i === 0
					    })}
              onClick={() => requestPage( pageNumber )}
          >
						{pageNumber + 1}
          </li>
					:
          <li key={i + 1}
              className={css(styles.paginationItem)}
              onClick={() => requestPage(+i + pageNumber)}
          >
	          {pageNumber + i + 1}
          </li>
			)}
    </ul>
	)
};

const renderPaginationItems = (pageNumber, pageCount, requestPage) => {
  const startItem = pageCount > 10 ? pageNumber - 8 : 0;
	return (
    <ul className={css(styles.paginationItems)}>
	    {[...Array( pageCount)].map((x, i) =>
        i == pageNumber ?
        <li key={i + 1}
            className={classNames({
              [css(styles.paginationItem, styles.paginationCurrentPage)]: pageNumber === i
            })}
            onClick={() => requestPage(+i)}
        >
          {i+1}
        </li>
        :
          <li key={i + 1}
              className={classNames({
		            [css(styles.paginationItem)]: pageNumber !== i,
	            })}
              onClick={() => requestPage(+i)}
          >
		        {i+1}
          </li>
	    )}
    </ul>
  )
};

const Pagination = ({pageNumber, requestPage, pageCount}) => {
  const prevArrow = pageNumber === 0 ? css(styles.disabledLink) : css(styles.link);
  const nextArrow = pageNumber + 1 === pageCount ? css(styles.disabledLink) : css(styles.link);
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.pagination)}>
        <div className={prevArrow} onClick={() => requestPage(+pageNumber - 1)}>
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
            <path d="M0-.5h24v24H0z" fill="none"/>
          </svg>
        </div>
	      {
		      pageNumber > 10 ?
	        renderPaginationItems(pageNumber, pageCount, requestPage)
          :
		      renderPaginationItemsBigData(pageNumber, pageCount, requestPage)
	      }
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

export default Pagination