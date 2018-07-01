import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import TinyMCE from 'react-tinymce';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Icon from 'material-ui/Icon';
import ItemsSelector from '../ui-elements/form/ItemsSelector';
import ImageGridList from '../ui-elements/ImageGridList'
import CollapseComponent from '../ui-elements/Collapse'
import Map from '../ui-elements/Map'
import AddTourPreviewPopup from './AddTourPreviewPopup';
import TourProgram from './TourProgram';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TreeList from '../ui-elements/TreeList';
import HotelsFilterContainer from './HotelsFilterContainer';
import ShowplacesFilterContainer from './ShowplacesFilterContainer';
import NotificationPanel from '../ui-elements/form/NotificationPanel';


const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  colWrapper: {
    padding: '20px'
  },
  button: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
    marginBottom: '15px'
  },
  submitButton: {
    marginTop: '20px'
  },
  selectWrapper: {
    marginBottom: '15px',
    marginTop: '15px'
  },
  select: {
    width: '100%',
    whiteSpace: 'nowrap'
  },
  regionWrapper: {
    marginLeft: '-40px'
  },
  noMB: {
    marginBottom: '0'
  },
  fileItem: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

class TourForm extends Component {
	constructor(props) {
		super(props);
    const contentByLang = {...this.props.languagesIDs};

    Object.keys(contentByLang).forEach(key => {
      contentByLang[key] = {
        title: '',
        description: '',
        mapName: '',
        language: key
      }
    });

    this.props.tour.content.forEach(content => {
      contentByLang[content.language] = content;
    });

    const tour = {
      ...this.props.tour,
      hotels: this.props.tour.hotels.map(item => item._id || item),
      showplaces: this.props.tour.showplaces.map(item => item._id || item)
    };

		this.state = {
      tour,
      contentByLang,
      isValidForm: true,
			open: false,
      selectedPreviewItems: [],
      content: this.props.content,
      idsCategories: this.props.categoriesAllIds,
		}
	}

  updateItems = (items, ids) => {
		this.setState({ tour: { ...this.state.tour, [items]: ids } })
  };

  handleInputChange = (langID, name) => event => {
    if (langID) {
      const contentByLang = {...this.state.contentByLang};
      contentByLang[langID][name] = event.target.value;
      this.setState({ contentByLang });
    } else {
      this.setState({ tour: { ...this.state.tour, [name]: event.target.value } })
    }
  };

  handleEditorChange = (langID, field = 'content') => (e) => {
    const contentByLang = {...this.state.contentByLang};
    contentByLang[langID][field] =e.target.getContent();
    this.setState({contentByLang});
  };

  addPreview = () => {
  	const selectedPreview = [...this.props.selectedPreview];
  	const preview = [...this.state.tour.preview];

    selectedPreview.forEach( selectedItem => {
      const isNotExist = preview.every(previewItem => previewItem._id !== selectedItem);
      if (isNotExist) {
        preview.push({ ...this.props.mediaFiles.byIds[selectedItem], active: false });
      }
    });

    this.setState({ tour: {...this.state.tour, preview} });
  };

  addTourProgram = langID => () => {
    const selectedPreview = [...this.props.selectedPreview];
	  const contentByLang = {...this.state.contentByLang};
	  const programFile = contentByLang[langID].programFile ?
      [...contentByLang[langID].programFile] : [];

    selectedPreview.forEach( selectedItem => {
      const isNotExist = programFile.every(previewItem => previewItem._id !== selectedItem);
      if (isNotExist) {
        programFile.push({ ...this.props.mediaFiles.byIds[selectedItem], active: false });
      }
    });

    const currentContent = {...this.state.contentByLang[langID], programFile}

    this.setState({
      contentByLang: {
        ...this.state.contentByLang,
	      [langID]: currentContent
      }
    });
  };

  togglePreviewItem = (img) => {
    const selectedPreview = [ ...this.state.selectedPreviewItems ];
    const index = selectedPreview.findIndex(item => item._id === img._id);

    if (index === -1) {
      selectedPreview.push({...img});
    } else {
      selectedPreview.splice(index, 1);
    }

    const preview = [...this.state.tour.preview];
    preview.forEach(item => {
      if (item._id === img._id) {
        item.active = !item.active;
      }
    });

    this.setState({
      tour: { ...this.state.tour, preview },
      selectedPreviewItems: selectedPreview
    });
  };

  deletePreviewItems = () => {
    const { selectedPreviewItems, tour } = this.state;
    const preview = tour.preview.filter(
      previewItem => !selectedPreviewItems.find(selectedItem => selectedItem._id === previewItem._id)
    );

    this.setState({ tour: { ...this.state.tour, preview } , selectedPreviewItems: [] })
  };

  deleteProgramFile = (langID, id) => () => {
	  const contentByLang = {...this.state.contentByLang};
    const programFile = contentByLang[langID].programFile.filter(item => item._id !== id);

	  const currentContent = {...this.state.contentByLang[langID], programFile}

	  this.setState({
		  contentByLang: {
			  ...this.state.contentByLang,
			  [langID]: currentContent
		  }
	  });
  };

	handleRequestClose = () => {
		this.setState({ open: false });
	};

  saveProgram = langID => program => {
    const contentByLang = {...this.state.contentByLang};
    contentByLang[langID].program = program;
    this.setState({contentByLang});
  };

  saveTour = (e) => {
    e.preventDefault();
    const tour = {...this.state.tour};
    tour.url = tour.url.replace(/\s+/g, '-').toLowerCase();
    tour.content = Object.values(this.state.contentByLang);
    tour.map = tour.map.map(item => ({ formatted_address: item.formatted_address, place_id: item.place_id }));

    if (this.isValidForm(tour.content)) {
      this.props.onSubmit(tour, this.props.isNew);
      this.setState({ isValidForm: true });
      if (this.props.isNew) {
        this.props.history.push('/admin/tours', {});
      }
    } else {
      this.setState({ isValidForm: false })
    }
  };

  updateMapDetails = (places) => {
    this.setState({ tour: { ...this.state.tour, map: places } })
  };

  selectRegions = (e) => {
    const regions = [...this.state.tour.regions];
    const index = regions.indexOf(e.target.value);
    if (index === -1) {
      regions.push(e.target.value)
    } else {
      regions.splice(index, 1)
    }
    this.setState({ tour: { ...this.state.tour, regions } });
  };

  toggleItem = (itemName) => (e, id) => {
    const items = [...this.state.tour[itemName]];
    const index = items.indexOf(id);
    if (index === -1) {
      items.push(id)
    } else {
      items.splice(index, 1)
    }
    this.setState({ tour: { ...this.state.tour, [itemName]: items } });
  };

  onFilterSelect = (filterType, filters) => {
    const tour = {...this.state.tour};
    tour.categories = filters;
    this.setState({tour});
  };

  isValidForm = (content) => {
    let isValid = true;
    for(let i = 0; i < content.length; i++) {
      if (!content[i].title) {
        isValid = false;
        break;
      }
    }
    return isValid
  };

  toggleEnableForLanguage = (id) => (e, checked) => {
    const tour = { ...this.state.tour };

    if (!tour.disabledForLanguages) {
      tour.disabledForLanguages = []
    }

    tour.disabledForLanguages = checked ?
      [...tour.disabledForLanguages, id] :
      tour.disabledForLanguages.filter(item => item !== id)

    this.setState({tour});
  }

	render() {
		const { languages, selectedTabIndex, isSaving } = this.props;
		const { contentByLang } = this.state;
		const tour = {...this.state.tour};
		return (
			<form onSubmit={(e) => this.saveTour(e)}>
        <div className="row">
          <div className="col-md-4">
            <h3>Галерея</h3>
            <AddTourPreviewPopup addPreview={this.addPreview}/>
            <Button
              onClick={this.deletePreviewItems}
              className={css(styles.button)}
              color="accent"
              variant="raised"
              disabled={!this.state.selectedPreviewItems.length}
            >
              Удалить выбранные
            </Button>
            <ImageGridList imgs={tour.preview} clickHandler={this.togglePreviewItem} />
            <h3 className={css(styles.noMB)}>Карта</h3>
            {languages.map((lang, i) => (
              <div key={lang._id + i}>
                {selectedTabIndex === i &&
                  <TextField
                    name='mapName'
                    value={contentByLang[lang._id].mapName}
                    onChange={this.handleInputChange(lang._id, 'mapName')}
                    fullWidth
                    margin='normal'
                    className={css(styles.field)}
                    label='Название карты (маршрут)'
                  />
                }
              </div>
            ))}
            <Map save={this.updateMapDetails} places={tour.map} />
            <h3>Регионы</h3>
            <div className={css(styles.regionWrapper)}>
              <TreeList
                selectedItems={tour.regions}
                items={this.props.regions}
                selectItems={this.selectRegions}
              />
            </div>
          </div>
          <div className="col-md-8">
            <FormControlLabel
              control={
                <Switch
                  checked={tour.enabled}
                  onChange={(event, checked) => this.setState({ tour: { ...this.state.tour, enabled: checked } }) }
                  aria-label="checkedD"
                />
              }
              label={ tour.enabled ? 'Активный' : 'Неактивный'}
            />

            <TextField
              name='url'
              value={tour.url}
              onChange={this.handleInputChange(null, 'url')}
              fullWidth
              required
              className={css(styles.field)}
              label='url'
            />

            {languages.map((lang, i) => (
              <div key={lang._id}>
                {selectedTabIndex === i &&
                  <div>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={tour.disabledForLanguages && tour.disabledForLanguages.includes(lang._id)}
                          onChange={ this.toggleEnableForLanguage(lang._id)}
                          aria-label="checkedD"
                        />
                      }
                      label={tour.disabledForLanguages && tour.disabledForLanguages.includes(lang._id) ?
                        'Скрыть для этого языка' :
                        'Скрыть для этого языка'
                      }
                    />
                    <TextField
                      name='title'
                      value={contentByLang[lang._id].title}
                      onChange={this.handleInputChange(lang._id, 'title')}
                      fullWidth
                      required
                      className={css(styles.field)}
                      label='Название'
                    />
                    <TextField
                      name='description'
                      value={contentByLang[lang._id].description}
                      onChange={this.handleInputChange(lang._id, 'description')}
                      fullWidth
                      className={css(styles.field)}
                      label='Мета описание'
                    />
                    <TextField
                      label="Дата проведения"
                      value={contentByLang[lang._id].duration}
                      onChange={this.handleInputChange(lang._id, 'duration')}
                      margin="normal"
                      className={css(styles.field)}
                      fullWidth
                    />
                    <TextField
                      label="Время и место отправления"
                      value={contentByLang[lang._id].departureInfo}
                      onChange={this.handleInputChange(lang._id, 'departureInfo')}
                      margin="normal"
                      className={css(styles.field)}
                      fullWidth
                    />
                    <TextField
                      label="Количество дней"
                      type="number"
                      value={tour.days}
                      onChange={this.handleInputChange(null, 'days')}
                      margin="normal"
                      className={css(styles.field)}
                      fullWidth
                    />
                    <TextField
                      name='price'
                      type='number'
                      value={contentByLang[lang._id].price}
                      onChange={this.handleInputChange(lang._id, 'price')}
                      fullWidth
                      className={css(styles.field)}
                      label='Цена в б/руб для текущего языка'
                    />
                    <div className={css(styles.selectWrapper)}>
                      <FormControl>
                        <InputLabel htmlFor="parentRegion" className={css(styles.select)}>Тип питания</InputLabel>
                        <Select
                          className={css(styles.select)}
                          value={
                            typeof tour.food === "object" ? tour.food._id : tour.food || '1'
                          }
                          onChange={this.handleInputChange(null, 'food')}
                          input={<Input id="food" className={css(styles.select)} fullWidth/>}
                          fullWidth
                        >
                          <MenuItem className={css(styles.select)} key='1' value={'noParent'}>...</MenuItem>
                          {this.props.food.map(foodItem => {
                              return (
                                <MenuItem key={foodItem._id} value={foodItem._id}>{foodItem.content[0].title}</MenuItem>
                              );
                          })
                          }
                        </Select>
                      </FormControl>
                    </div>
                    <CollapseComponent title='Описание тура'>
                      <div className={css(styles.field)} >
                        <TinyMCE
                          content={contentByLang[lang._id].content}
                          config={{
                            plugins:'link image code',
                            height: '200',
                            fontsize_formats: '30px'
                          }}
                          onChange={this.handleEditorChange(lang._id, 'content')}
                        />
                      </div>
                    </CollapseComponent>
                    <CollapseComponent title='В стоимость тура входит'>
                      <div className={css(styles.field)} >
                        <TinyMCE
                          content={contentByLang[lang._id].priceInclude}
                          config={{
                            plugins:'link image code',
                            height: '200',
                            fontsize_formats: '30px'
                          }}
                          onChange={this.handleEditorChange(lang._id, 'priceInclude')}
                        />
                      </div>
                    </CollapseComponent>
                    <CollapseComponent title='В стоимость тура не входит'>
                      <div className={css(styles.field)} >
                        <TinyMCE
                          content={contentByLang[lang._id].priceNotInclude}
                          config={{
                            plugins:'link image code',
                            height: '200',
                            fontsize_formats: '30px'
                          }}
                          onChange={this.handleEditorChange(lang._id, 'priceNotInclude')}
                        />
                      </div>
                    </CollapseComponent>
                    <CollapseComponent title='Программа тура'>
                      <TourProgram
                        days={contentByLang[lang._id].program}
                        save={this.saveProgram(lang._id)}
                      />
                    </CollapseComponent>
                    <AddTourPreviewPopup
                      filesType={ '@docs' }
                      label={ 'Загрузить программу тура' }
                      addPreview={this.addTourProgram(lang._id)}
                    />
                    {
	                    contentByLang[lang._id].programFile ?
                      contentByLang[lang._id].programFile.map(item => <div key={ item._id } className={css(styles.fileItem)}>
                        <a href="" >{ item.filename.slice(13) }</a>
                        <Icon onClick={ this.deleteProgramFile(lang._id, item._id) }>delete</Icon>
                      </div>
                      )
                      :
                      null
                    }
                  </div>
                }
              </div>
            ))}
            <ItemsSelector
              items={this.props.categoriesByIDs}
              content={this.props.regionsContent}
              handleToggle={this.handleToggle}
              defaultChecked={tour.categories}
              updateItems={this.updateItems}
              title='Категории тура'
              itemsName='categories'
            />
            <CollapseComponent title='Отели'>
              <HotelsFilterContainer
                selectedItems={tour.hotels}
                toggleItem={this.toggleItem('hotels')}
              />
            </CollapseComponent>
            <CollapseComponent title='Достопримечательности'>
              <ShowplacesFilterContainer
                selectedItems={tour.showplaces}
                toggleItem={this.toggleItem('showplaces')}
              />
            </CollapseComponent>
          </div>
        </div>
        {!this.state.isValidForm &&
          <NotificationPanel>Пожалуйста, заполните все обязательные поля для всех языков</NotificationPanel>
        }
        <br/>
        <Button
          variant="raised"
          type="submit"
          color="primary"
          className={css(styles.submitButton)}
          disabled={isSaving}
        >
          {isSaving ? 'Сохраняю...' : 'Сохранить'}
        </Button>

      </form>
		)
	}
}

export default TourForm;
