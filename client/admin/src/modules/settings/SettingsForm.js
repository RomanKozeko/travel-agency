import React, { Component } from 'react';
import { compose, withHandlers, withState } from 'recompose'
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, formValueSelector } from 'redux-form'
import { StyleSheet, css } from 'aphrodite/no-important';
import { getLanguages } from "../../rootReducer";
import { loadItems, saveItem, fetchCurrencies } from "./SettingsReducer";
import Spinner from '../ui-elements/Spinner';
import Button from 'material-ui/Button';
import ImageUploader from '../ui-elements/form/ImageUploader';
import Currencies from './Currencies';

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
    border: 'none',
    borderBottom: '1px solid #999',
    minWidth: '300px'
  },
  table: {

  },
  td: {
    padding: '8px'
  },
  th: {
    padding: '8px',
    borderBottom: '1px solid #333'
  },
  tableWrapper: {
    overflowX: 'auto',
    margin: '20px 0'
  },
  langWrap: {
    display: 'flex'
  },
  label: {
    marginRight: '20px',
    marginBottom: '10px'
  }
})

const renderField = ({ currencies = [], input, meta: { touched, error } }) => (
  <div>
    <select {...input} className={css(styles.input)}>
      <option value="BUN">BUN</option>
      {
        currencies.map((curr) =>
          <option value={ curr.item && curr.item.split(',')[1] }>
            { curr.item && curr.item.split(',')[0] }
          </option>
        )
      }
    </select>
  </div>
)

class SettingsForm extends Component {
  render() {
    const { handleSubmit, languages, pagesImgPath, currencies } = this.props;
    return (
      <div>
        {
          this.props.isFetching ?
            <Spinner /> :
            <form onSubmit={ handleSubmit }>
              <h3>Картинка для внутренних страниц сайта</h3>
              {
                pagesImgPath &&
                <img className={ css(styles.img)} src={ pagesImgPath } alt=""/>
              }
              <ImageUploader uploadImg={ this.props.updloadImg } />

              <div className={ css(styles.tableWrapper) }>
                <h3>Валюты</h3>
                <FieldArray name="currencies" component={Currencies} />
                <h3>Валюты для языков</h3>
                {
                  languages.map(lang =>
                    <div className={css(styles.langWrap)} key={ lang._id }>
                      <div className={css(styles.label)}>{ lang.title }</div>
                      <Field
                        name={`content.${lang._id}.currForLang`}
                        className={ css(styles.fieldInput) }
                        currencies={ currencies }
                        component={ renderField }
                      />
                    </div>
                  )
                }
              </div>

              <div className={ css(styles.tableWrapper) }>
	              <h3>Главная страница</h3>
	              <table className={ css(styles.table)}>
		              <tbody>
		              <tr>
			              <th className={css(styles.th)} />
			              {
				              languages.map(lang => <th className={css(styles.th)} key={ lang._id }> { lang.prefix } </th>)
			              }
		              </tr>
		              <tr>
			              <td>Название главной страницы</td>
			              {
				              languages.map(lang =>
					              <td className={css(styles.td)} key={ `${lang._id}_appTitle` }>
						              <Field name={`content.${lang._id}.appTitle`} className={ css(styles.fieldInput)} component="input" type="text" />
					              </td>
				              )
			              }
		              </tr>
		              <tr>
			              <td>Мета-описание главной страницы</td>
			              {
				              languages.map(lang =>
					              <td className={css(styles.td)} key={ `${lang._id}_appDescription` }>
						              <Field name={`content.${lang._id}.appDescription`} className={ css(styles.fieldInput)} component="input" type="text" />
					              </td>
				              )
			              }
		              </tr>
		              </tbody>
	              </table>

                <h3>Перевод фраз</h3>

                <table className={ css(styles.table)}>
                  <tbody>
                    <tr>
                      <th className={css(styles.th)}>Фраза</th>
                      {
                        languages.map(lang => <th className={css(styles.th)} key={ lang._id }> { lang.prefix } </th>)
                      }
                    </tr>
                    <tr>
                      <td>Информация о туре</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ lang._id }>
                            <Field name={`content.${lang._id}.tourInfo`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Описание тура</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}_tourDescription` }>
                            <Field name={`content.${lang._id}.tourDescription`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Маршрут</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}_route` }>
                            <Field name={`content.${lang._id}.route`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Достопримечательности</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}showPlaces` }>
                            <Field name={`content.${lang._id}.showPlaces`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Размещение по туру</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}accommodation` }>
                            <Field name={`content.${lang._id}.accommodation`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Программа Тура</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}tourProgram` }>
                            <Field name={`content.${lang._id}.tourProgram`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>В Стоимость Тура Входит</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}includedInPrice` }>
                            <Field name={`content.${lang._id}.includedInPrice`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>В Стоимость Тура Не Входит</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}notIncludedInPrice` }>
                            <Field name={`content.${lang._id}.notIncludedInPrice`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>По Названию</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}byName` }>
                            <Field name={`content.${lang._id}.byName`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Регионы</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}regions` }>
                            <Field name={`content.${lang._id}.regions`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Отели</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}hotels` }>
                            <Field name={`content.${lang._id}.hotels`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Количество Дней</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}daysAmount` }>
                            <Field name={`content.${lang._id}.daysAmount`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Тип Тура</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}tourType` }>
                            <Field name={`content.${lang._id}.tourType`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Заказать тур</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}orderTour` }>
                            <Field name={`content.${lang._id}.orderTour`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Отправить</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}submit` }>
                            <Field name={`content.${lang._id}.submit`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Имя</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}name` }>
                            <Field name={`content.${lang._id}.name`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Сообщение</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}message` }>
                            <Field name={`content.${lang._id}.message`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>email</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}email` }>
                            <Field name={`content.${lang._id}.email`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Наши контакты</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}ourContacts` }>
                            <Field name={`content.${lang._id}.ourContacts`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Мы в соц. сетях</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}followUs` }>
                            <Field name={`content.${lang._id}.followUs`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>все права защищены</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}copyRight` }>
                            <Field name={`content.${lang._id}.copyRight`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Новости/События</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}news` }>
                            <Field name={`content.${lang._id}.news`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Самое интересное</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}mostInteresting` }>
                            <Field name={`content.${lang._id}.mostInteresting`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Заказать</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}order` }>
                            <Field name={`content.${lang._id}.order`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Телефон</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}phone` }>
                            <Field name={`content.${lang._id}.phone`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Дата проведения</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}date` }>
                            <Field name={`content.${lang._id}.date`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Время и место отправления</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}departureInfo` }>
                            <Field name={`content.${lang._id}.departureInfo`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Тип питания</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}foodType` }>
                            <Field name={`content.${lang._id}.foodType`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Скачать программму тура</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}downloadTourProgram` }>
                            <Field name={`content.${lang._id}.downloadTourProgram`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Подробнее</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}moreInfo` }>
                            <Field name={`content.${lang._id}.moreInfo`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Cообщение после заказа тура</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}emailSentMessage` }>
                            <Field name={`content.${lang._id}.emailSentMessage`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Cообщение после отправки емейла(Контакты)</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}emailSentContactsMessage` }>
                            <Field name={`content.${lang._id}.emailSentContactsMessage`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>
                    <tr>
                      <td>Страница не найдена</td>
                      {
                        languages.map(lang =>
                          <td className={css(styles.td)} key={ `${lang._id}notFound` }>
                            <Field name={`content.${lang._id}.notFound`} className={ css(styles.fieldInput)} component="input" type="text" />
                          </td>
                        )
                      }
                    </tr>

                  </tbody>
                </table>
              </div>

              <Button
                type="submit"
                className={css(styles.button)}
                variant="raised"
                color="primary"
              >
                Сохранить
              </Button>
            </form>
        }
      </div>
    )
  }
}

const contentByLang = (content = [], languages) => {
  return languages.reduce((acc, curr) => {
    return {
      ...acc,
      [curr._id]: content.find(({ language }) => language === curr._id)
    }
  }, {})
}

const mapStateToProps = (state, { item }) => {
  const languages = getLanguages(state);
  return {
    item,
    languages,
    pagesImgPath: formValueSelector('Settings')(state, 'pagesImg'),
    currencies: formValueSelector('Settings')(state, 'currencies'),
    initialValues: {
      pagesImg: item && item.pagesImg,
      currencies: item && item.currencies,
      content: contentByLang(item && item.content, languages)
    }
  }
};

const contentToArrayByLang = (content, languages) => {
  return languages.reduce((acc, curr) => {
    return [
      ...acc,
      {
        language: curr._id,
        ...content[curr._id]
      }
    ]
  }, [])
}

export default compose(
  connect(mapStateToProps, { loadItems, uploadImage: change, saveItem, fetchCurrencies }),
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
          props.uploadImage('Settings', 'pagesImg', path)
        })
      );
    }
  }),
  reduxForm({
    form: 'Settings'
  })
)(SettingsForm);