import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from '../ui-elements/TextField';
import TextArea from '../ui-elements/TextArea';
import Button from '../ui-elements/FormButton';
import PageContent from '../ui-elements/PageContent'
import PageHeader from '../ui-elements/PageHeader'

const styles = StyleSheet.create({
  header: {
    height: '287px',
    marginTop: '-76px',
    paddingTop: '76px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/web/build/forest.jpg)',
    backgroundSize: 'cover',
  },
  headerTitle: {
    lineHeight: '27px',
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#fefefe',
    textTransform: 'uppercase'
  },
  colHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#222222',
    margin: '0 0 20px'
  }
});

const ContactForm = () => (
  <div>
    <div className="row">
      <div className="col-md-6"><TextField placeholder={ window.TA.content.name } /></div>
      <div className="col-md-6"><TextField placeholder={ window.TA.content.email } /></div>
    </div>
    <TextArea placeholder={ window.TA.content.message } />
    <Button>{ window.TA.content.submit }</Button>
  </div>

);

export default ContactForm;