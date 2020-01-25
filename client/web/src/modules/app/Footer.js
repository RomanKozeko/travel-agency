import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important';
import { getContacts } from '../../rootReducer'
import { fetchContacts } from '../header/headerReducer'


const styles = StyleSheet.create({
  footer: {
    background: '#141414',
    padding: '70px 0 0'
  },
  bottom: {
    background: '#0c0c0c',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '90px',
    color: '#777777',
    marginTop: '70px'
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  header: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: '20px'
  },
  columnText: {
    color: '#fff'
  },
  columnInner: {
    color: '#d4d4d4',
    display: 'flex'
  },
  button: {
    display: 'inline-block',
    lineHeight: '30px',
    borderRadius: '5px',
    width: '100%',
    textAlign: 'center',
    fontSize: '13px',
    marginBottom: '5px',
    color: 'rgba(255, 255, 255, 0.6);',
    ':hover': {
      color: 'rgba(255, 255, 255, 0.6);',
      textDecoration: 'none'
    },
    ':active': {
      color: 'rgba(255, 255, 255, 0.6);',
      textDecoration: 'none'
    },
    ':focus': {
      color: 'rgba(255, 255, 255, 0.6);',
      textDecoration: 'none'
    }
  },
  fb: {
    background: '#3b5998;'
  },
  vk: {
    background: '#507299'
  },
  google: {
    background: '#d0422a'
  },
  textTelWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-10px'
  },
  textTel: {
    width: 'calc(100% / 2 - 10px)',
    fontSize: '12px',
    marginLeft: '10px',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 600px)': {
      width: 'calc(100% / 3 - 10px)',
    }
  },
  textTelImg: {
    maxHeight: '15px'
  },
  textTelContent: {
    marginLeft: '10px',
    whiteSpace: 'nowrap'
  },
});
const Footer = ({ items }) => (
  <footer className={css(styles.footer)}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4 className={css(styles.header)}>{ window.TA.content.ourContacts }</h4>
          {
            items.map(({ content, _id, tels }) => (
              <div className={css(styles.columnText)} key={ _id }>
                <div className={css(styles.item)}>
                  <span className={css(styles.columnInner)}>{ content.title }</span>
                </div>
                <div className={css(styles.textTelWrap)}>
                  {
                    tels.map(({ title, img }) =>
                      <div className={css(styles.textTel)}>
                        <img src={ img }  className={css(styles.textTelImg)} alt=""/>
                        <div className={css(styles.textTelContent)}>{ title }</div>
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
    <div className={css(styles.bottom)}>
      <div className='container'>
        <div className={css(styles.left)}>
          { window.TA.content.copyRight }
        </div>
      </div>
    </div>

  </footer>
);

const mapStateToProps = (state) => ({
  items: getContacts(state),
  isFetching: state.contacts.isFetching,
  isFetched: state.contacts.isFetched
})

export default compose(
  connect(mapStateToProps, { fetchContacts }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.fetchContacts()
      }
    }
  })
)(Footer)


