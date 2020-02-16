import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from '../ui-elements/TextField';
import TextArea from '../ui-elements/TextArea';
import Button from '../ui-elements/FormButton';
import PageContent from '../ui-elements/PageContent';
import PageHeader from '../ui-elements/PageHeader';
import ContactForm from '../contactForm/ContactForm';

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
    textTransform: 'uppercase',
  },
  colHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#222222',
    margin: '0 0 20px',
  },
});

const Contacts = () => (
  <div>
    <PageHeader title="Наши контакты" />
    <PageContent>
      <div className="row">
        <div className="col-sm-8">
          <ContactForm />
        </div>
        <div className="col-sm-4">
          <h4 className={css(styles.colHeader)}>CONTACT INFO</h4>
          <p>
            Donec gravida euismod felis, quis dictum justo scelerisque in.
            Aenean nec lacus ipsum. Suspendisse vel lobortis libero, eu
            imperdiet purus. Aenean nec lacus ipsum.
          </p>
        </div>
      </div>
    </PageContent>
  </div>
);

export default Contacts;
