import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from '../ui-elements/TextField';
import TextArea from '../ui-elements/TextArea';
import Button from '../ui-elements/FormButton';

const styles = StyleSheet.create({
  page: {

  },
  pageContent: {
    padding: '70px 0 40px'
  },
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

const Contacts = () => (
  <div>
    <header className={css(styles.header)}>
      <h1 className={css(styles.headerTitle)}>Contacts page</h1>
    </header>
    <div className="container">
      <div className={css(styles.pageContent)}>
        <div className="row">
          <div className="col-sm-8">
            <div className="row">
              <div className="col-md-6"><TextField placeholder='Name' /></div>
              <div className="col-md-6"><TextField placeholder='Email' /></div>
            </div>
            <TextArea placeholder='Message' />
            <Button>Submit</Button>
          </div>
          <div className="col-sm-4">
            <h4 className={css(styles.colHeader)}>CONTACT INFO</h4>
            <p>
              Donec gravida euismod felis, quis dictum justo scelerisque in. Aenean nec lacus ipsum. Suspendisse vel lobortis libero, eu imperdiet purus.  Aenean nec lacus ipsum.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

);

export default Contacts;