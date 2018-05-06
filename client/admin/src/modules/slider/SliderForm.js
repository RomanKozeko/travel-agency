import React, { Component } from 'react';
import { contentByLang, contentToArrayByLang } from '../../services/utils';
import { compose, withHandlers, withState, withStateHandlers } from 'recompose'
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, formValueSelector } from 'redux-form'
import { StyleSheet, css } from 'aphrodite/no-important';
import { getLanguages } from "../../rootReducer";
import { loadItems, saveItem } from "./SliderReducer";
import Spinner from '../ui-elements/Spinner';
import Button from 'material-ui/Button';
import ImageUploader from '../ui-elements/form/ImageUploader';

const styles = StyleSheet.create({
  img: {
    maxWidth: '100%',
    maxHeight: '200px',
    display: 'block',
    marginBottom: '10px'
  },
  fieldsWrapper: {
    margin: '20px 0'
  },
  fieldInput: {
    border: '1px solid #999',
    flexGrow: '1'
  },
  linkInput: {
    marginTop: '20px',
    border: '1px solid #999',
    width: '100%'
  },
  tableWrapper: {
    margin: '20px 0'
  },
  langWrap: {
    display: 'flex',
    marginTop: '20px'
  },
  label: {
    marginRight: '20px',
    marginBottom: '10px',
    minWidth: '20px'
  },
  sliderItem: {
    marginBottom: '20px',
    marginTop: '20px',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.03)',
    padding: '10px'
  },
  button: {
    marginTop: '20px'
  }
})


class SliderForm extends Component {
  render() {
    const { handleSubmit, languages, pagesImgPath, updloadImg, cancel } = this.props;
    return (
      <div className="col-md-4">
        <form onSubmit={ handleSubmit }>
          <div className={ css(styles.sliderItem) }>
            <ImageUploader uploadImg={ updloadImg } />
            <Field name={ `link`} className={ css(styles.linkInput)} component="input" />
            {
              languages.map(lang =>
                <div className={css(styles.langWrap)} key={ lang._id }>
                  <div className={css(styles.label)}>{ lang.title }</div>
                  <Field name={`content.${lang._id}.title`} className={ css(styles.fieldInput)} component="input" type="text" />
  
                </div>
              )
            }
            {
              languages.map(lang =>
                <div className={css(styles.langWrap)} key={ lang._id }>
                  <div className={css(styles.label)}>{ lang.title }</div>
                  <Field name={`content.${lang._id}.desription`} className={ css(styles.fieldInput)} component="textarea"  />
                </div>
              )
            }
            <Button
              type="submit"
              className={css(styles.button)}
              color="primary"
            >
              Сохранить
            </Button>
            <Button
              onClick={ cancel }
              className={css(styles.button)}
              type="submit"
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, { item }) => {
  const languages = getLanguages(state);
  return {
    item,
    languages,
    pagesImgPath: formValueSelector('Settings')(state, 'pagesImg'),
    initialValues: {
      pagesImg: item && item.pagesImg,
      content: contentByLang(item && item.content, languages)
    }
  }
};

export default compose(
  connect(mapStateToProps, { loadItems, uploadImage: change, saveItem }),
  withHandlers({
    onSubmit: ({ item, saveItem, languages }) => (values) => {
      const newItem = {
        ...values,
        content: contentToArrayByLang(values.content, languages)
      }

      if (item) {
        newItem._id = item._id
      }
      saveItem(newItem, !item)
    },
    updloadImg: (props) => ({ payload }) => {
      const formData = new FormData();
      formData.append('file', payload);
      fetch('/api/media-upload', {
        method: 'POST',
        body: formData
      })
        .then(response =>
          response.json().then(({ path }) => {
            props.uploadImage('SliderForm', 'pagesImg', path)
          })
        );
    }
  }),
  reduxForm({
    form: 'SliderForm'
  })
)(SliderForm);