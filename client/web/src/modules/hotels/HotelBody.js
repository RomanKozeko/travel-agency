import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite/no-important';
import { compose } from 'recompose';
import { PlaceIcon } from '../ui-elements/icons/Icons';
import PrefixLink from '../ui-elements/PrefixLink';
import { theme } from '../../services/constans';

const styles = StyleSheet.create({
  wrapper: {
    minHeight: '210px',
    backgroundColor: '#ffffff',
    position: 'relative',
    borderRadius: '5px',
    transition: 'all .3s ease-in',
    marginBottom: '20px',
    ':hover': {
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
    },
    overflow: 'hidden',
    '@media (min-width: 750px)': {
      display: 'flex',
      flexGrow: '1',
      paddingLeft: '220px',
    },
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'center',
    width: '100%',
    paddingTop: '70%',
    backgroundColor: '#333',
    backgroundSize: 'cover',
    '@media (min-width: 750px)': {
      width: '210px',
      height: '100%',
      position: 'absolute',
      left: '0',
      top: '0',
      paddingTop: '0',
    },
  },
  content: {
    padding: '20px;',
    flex: '1',
    flexDirection: 'column',
    display: 'flex',
    '@media (min-width: 750px)': {
      flexDirection: 'row'
    },
  },
  contentRegions: {
    fontSize: '12px',
    color: '#bebebe;',
  },
  title: {
    fontSize: '18px;',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#222222;'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '5px'
  },
  listItemText: {
    marginLeft: '10px'
  },
  contentLeft: {
    flexGrow: '1',
  },
  contentRight: {
    paddingTop: '20px',
    '@media (min-width: 750px)': {
      paddingTop: '0'
    },
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold'
  }
});

const HotelBody = ({
  hotel: { url, content = {} },
}) => {
  return (
    <div className={css(styles.content)}>
      <div className={css(styles.contentLeft)}>
        <h4 className={css(styles.title)}>
          <PrefixLink to={`/hotels/${ url }`}>{ content.title }</PrefixLink>
        </h4>
        {
          content.address &&
          <div className={css(styles.listItem)}>
            <PlaceIcon color={ theme.colors.primary } width={20}/>
            <span className={css(styles.listItemText)}>{ content.address }</span>
          </div>
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  languageID: state.app.languages.urlPrefix,
});

export default compose(
  connect(mapStateToProps)
)(HotelBody)

