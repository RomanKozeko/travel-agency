import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import Head from '../ui-elements/Head'

const styles = StyleSheet.create({
  pageContent: {
    display: 'flex',
    justifyContent: 'center',
    padding: '70px 0',
    backgroundSize: 'cover'
  },
  wrapper: {
    width: '800px',
    margin: '20px',
    color: '#fff',
    border: '10px solid #fff',
    padding: '40px',
    textAlign: 'center'
  },
  title: {
    fontSize: '60px'
  },
  desc: {
    fontSize: '30px'
  }
});


const NoteFound = ({ match }) =>
  <div className={ css(styles.pageContent) } style={{ backgroundImage: `url(${window.TA && window.TA.pagesImg})` }}>
    <Head title="bssr.by | 404" metaDescription="404" />
    <div className={ css(styles.wrapper)}>
      <h3 className={ css(styles.title)}>404</h3>
      <h4 className={ css(styles.desc)}>{ window.TA && window.TA.content.notFound }</h4>
    </div>
  </div>

export default NoteFound;