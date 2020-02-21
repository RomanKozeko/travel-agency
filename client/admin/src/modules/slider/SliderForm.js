import React, { Component } from 'react';
import { contentByLang, contentToArrayByLang } from '../../services/utils';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';
import { getLanguages, getPages } from '../../rootReducer';
import { load } from '../pages/PagesReducer';
import { loadItems, saveItem } from './SliderReducer';
import Button from 'material-ui/Button';
import ImageUploader from '../ui-elements/form/ImageUploader';
import SortableInput from '../ui-elements/SortableInput';

const styles = StyleSheet.create({
  img: {
    maxWidth: '100%',
    display: 'block',
    marginBottom: '10px',
  },
  fieldsWrapper: {
    margin: '20px 0',
  },
  fieldInput: {
    border: '1px solid #999',
    flexGrow: '1',
  },
  linkInput: {
    marginTop: '20px',
    border: '1px solid #999',
    width: '100%',
  },
  tableWrapper: {
    margin: '20px 0',
  },
  langWrap: {
    display: 'flex',
    marginTop: '20px',
  },
  label: {
    marginRight: '20px',
    marginBottom: '10px',
    minWidth: '20px',
  },
  sliderItem: {
    marginBottom: '10px',
    marginTop: '10px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)',
    padding: '10px',
  },
  button: {
    marginTop: '20px',
  },
});

class SliderForm extends Component {
  render() {
    const {
      handleSubmit,
      languages,
      pagesImgPath,
      updloadImg,
      cancel,
      pages,
      item,
      setLinkUrl,
    } = this.props;
    return (
      <div className="col-md-4">
        <form onSubmit={handleSubmit}>
          <div className={css(styles.sliderItem)}>
            {pagesImgPath && (
              <img className={css(styles.img)} src={pagesImgPath} alt="" />
            )}

            <ImageUploader uploadImg={updloadImg} />
            <SortableInput
              selectedItems={
                item ? pages.filter(page => page.url === item.link) : []
              }
              onFilterSelect={setLinkUrl}
              filterType="categories"
              items={pages}
              label="Ссылка на страницу"
            />
            {
              <div className={css(styles.langWrap)}>
                <div className={css(styles.label)}>{'HEX'}</div>
                <Field
                  name={'color'}
                  className={css(styles.fieldInput)}
                  component="input"
                  type="text"
                />
              </div>
            }
            {languages.map(lang => (
              <div className={css(styles.langWrap)} key={lang._id}>
                <div className={css(styles.label)}>{lang.title}</div>
                <Field
                  name={`content.${lang._id}.title`}
                  className={css(styles.fieldInput)}
                  component="input"
                  type="text"
                />
              </div>
            ))}
            {languages.map(lang => (
              <div className={css(styles.langWrap)} key={lang._id}>
                <div className={css(styles.label)}>{lang.title}</div>
                <Field
                  name={`content.${lang._id}.description`}
                  className={css(styles.fieldInput)}
                  component="textarea"
                />
              </div>
            ))}
            <Button
              type="submit"
              className={css(styles.button)}
              color="primary"
            >
              Сохранить
            </Button>
            <Button
              onClick={cancel}
              className={css(styles.button)}
              type="submit"
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, { item }) => {
  const languages = getLanguages(state);
  return {
    item,
    languages,
    pages: getPages(state),
    pagesImgPath: formValueSelector('SliderForm')(state, 'image'),
    initialValues: {
      color: item && item.color,
      image: item && item.image,
      link: item && item.link,
      content: contentByLang(item && item.content, languages),
    },
  };
};

export default compose(
  connect(
    mapStateToProps,
    { loadItems, setValue: change, saveItem, load }
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.pages.length) {
        this.props.load();
      }
    },
  }),
  withHandlers({
    onSubmit: ({ item, saveItem, languages, cancel }) => values => {
      const newItem = {
        ...values,
        content: contentToArrayByLang(values.content, languages),
      };

      if (item) {
        newItem._id = item._id;
      }
      saveItem(newItem, !item);
      cancel();
    },
    updloadImg: props => ({ payload }) => {
      const formData = new FormData();
      formData.append('file', payload);
      fetch('/api/media-upload', {
        method: 'POST',
        body: formData,
      }).then(response =>
        response.json().then(({ path }) => {
          props.setValue('SliderForm', 'image', path);
        })
      );
    },
    setLinkUrl: props => (path, item) => {
      props.setValue('SliderForm', 'link', item[0].url);
    },
  }),
  reduxForm({
    form: 'SliderForm',
  })
)(SliderForm);
