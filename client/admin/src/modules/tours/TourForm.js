import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import TinyMCE from 'react-tinymce';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import ItemsSelector from '../ui-elements/form/ItemsSelector';
import ImageGridList from '../ui-elements/ImageGridList'
import CollapseComponent from '../ui-elements/Collapse'
import Map from '../ui-elements/Map'
import AddTourPreviewPopup from './AddTourPreviewPopup';
import TourProgram from './TourProgram';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TreeList from '../ui-elements/TreeList'

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
  }
});

class TourForm extends Component {
	constructor(props) {
		super(props);

    const { tour, regions } = this.props;
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
      contentByLang[content.language] = content
    });

		this.state = {
      contentByLang,
			anchorEl: undefined,
			open: false,
			enabled: tour.enabled,
			preview: [...tour.preview],
      selectedPreviewItems: [],
      content: this.props.content,
      idsCategories: this.props.categoriesAllIds,
      checkedCategories: tour.categories || [],
      url: tour.url,
      food: tour.food,
      regions: tour.regions,
      map: tour.map || [],
      days: tour.days || 0
		}
	}

  updateItems = (items, ids) => {
		this.setState({ [`checked${items}`]: ids })
  };

  handleInputChange = (langID, name) => event => {
    if (langID) {
      const contentByLang = {...this.state.contentByLang};
      contentByLang[langID][name] = event.target.value;
      this.setState({ contentByLang });
    } else {
      this.setState({ [name]: event.target.value })
    }
  };

  handleEditorChange = (langID, field = 'content') => (e) => {
    const contentByLang = {...this.state.contentByLang};
    contentByLang[langID][field] =e.target.getContent();
    this.setState({contentByLang});
  };

  addPreview = () => {
  	const selectedPreview = [...this.props.selectedPreview];
  	const preview = [...this.state.preview];

    selectedPreview.forEach( selectedItem => {
      const isNotExist = preview.every(previewItem => previewItem._id !== selectedItem);
      if (isNotExist) {
        preview.push({ ...this.props.mediaFiles.byIds[selectedItem], active: false });
      }
    });

    this.setState({ preview });
  };

  togglePreviewItem = (img) => {
    const selectedPreview = [ ...this.state.selectedPreviewItems ];
    const index = selectedPreview.findIndex(item => item._id === img._id);

    if (index === -1) {
      selectedPreview.push({...img});
    } else {
      selectedPreview.splice(index, 1);
    }

    const preview = [ ...this.state.preview ];
    preview.forEach(item => {
      if (item._id === img._id) {
        item.active = !item.active;
      }
    });

    this.setState({
      preview,
      selectedPreviewItems: selectedPreview
    });
  };

  deletePreviewItems = () => {
    const { selectedPreviewItems, preview } = this.state;
    const updatedPreview = preview.filter(
      previewItem => !selectedPreviewItems.find(selectedItem => selectedItem._id === previewItem._id)
    );

    this.setState({ preview: updatedPreview, selectedPreviewItems: [] })
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
    const tour = {...this.props.tour};
    tour.url = this.state.url.replace(/\s+/g, '-').toLowerCase();
    tour.content = Object.values(this.state.contentByLang);
    tour.categories = [...this.state.checkedCategories];
    tour.preview = [...this.state.preview];
    tour.enabled = this.state.enabled;
    tour.days = this.state.days;
    tour.food = this.state.food;
    tour.regions = this.state.regions;
    tour.map = this.state.map.map(item => ({ formatted_address: item.formatted_address, place_id: item.place_id }));

    this.props.onSubmit(tour, this.props.isNew);

    if (this.props.isNew) {
      this.props.history.push('/admin/tours', {});
    }
  };

  updateMapDetails = (places) => {
    this.setState({ map: places })
  };

  selectRegions = (e) => {
    const regions = [...this.state.regions];
    const index = regions.indexOf(e.target.value);
    if (index === -1) {
      regions.push(e.target.value)
    } else {
      regions.splice(index, 1)
    }
    this.setState({regions});
  };

	render() {
		const { languages, selectedTabIndex, isSaving } = this.props;
		const { contentByLang, preview, map, url, enabled, days } = this.state;

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
              raised
              disabled={!this.state.selectedPreviewItems.length}
            >
              Удалить выбранные
            </Button>
            <ImageGridList imgs={preview} clickHandler={this.togglePreviewItem} />
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
            <Map save={this.updateMapDetails} places={map} />
            <h3>Регионы</h3>
            <div className={css(styles.regionWrapper)}>
              <TreeList
                selectedItems={this.state.regions}
                items={this.props.regions}
                selectItems={this.selectRegions.bind(this)}
              />
            </div>
          </div>
          <div className="col-md-8">
            <FormControlLabel
              control={
                <Switch
                  checked={enabled}
                  onChange={(event, checked) => this.setState({ enabled: checked })}
                  aria-label="checkedD"
                />
              }
              label={ enabled ? 'Активный' : 'Неактивный'}
            />
            <TextField
              name='url'
              value={url}
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
                        value={days}
                        onChange={this.handleInputChange(null, 'days')}
                        margin="normal"
                        className={css(styles.field)}
                        fullWidth
                      />
                      <div className={css(styles.selectWrapper)}>
                        <FormControl>
                          <InputLabel htmlFor="parentRegion" className={css(styles.select)}>Тип питания</InputLabel>
                          <Select
                            className={css(styles.select)}
                            value={this.state.food || '1'}
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

                  </div>
                }
              </div>
            ))}
            <ItemsSelector
              items={this.props.categoriesByIDs}
              content={this.props.regionsContent}
              handleToggle={this.handleToggle}
              defaultChecked={this.state.checkedCategories}
              updateItems={this.updateItems}
              itemsName='Categories'
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-8">
            <Button
              raised
              type="submit"
              color="primary"
              disabled={isSaving}
            >
              {isSaving ? 'Сохраняю...' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </form>
		)
	}
}

export default TourForm;
