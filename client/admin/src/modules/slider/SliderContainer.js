import React, {Component} from 'react';
import { compose, lifecycle, withStateHandlers } from 'recompose'
import {connect} from 'react-redux';
import {StyleSheet, css} from 'aphrodite/no-important';
import PageHeader from '../ui-elements/PageHeader';
import Portlet from "../ui-elements/Portlet";
import { getLanguages, getSliderItems } from "../../rootReducer";
import { loadItems, saveItem } from "./SliderReducer";
import Spinner from '../ui-elements/Spinner';
import Button from 'material-ui/Button';
import ImageUploader from '../ui-elements/form/ImageUploader';
import SliderForm from './SliderForm';

class SliderContainer extends Component {
  render() {
    const { pagesImgPath, items, isEditMode, addNew, cancel } = this.props;
    return (
      <Portlet isBordered >
        {
          this.props.isFetching || !this.props.isFetched ?
            <Spinner /> :
            <div>
              <div className="row">
                {
                  items.map(item =>
                    <div className="col-md-4">
                      Слайдер
                    </div>
                  )
                }
                {
                  isEditMode && <SliderForm cancel={ cancel } />
                }
              </div>
              {
                !isEditMode &&
                <div>
                  <Button
                    onClick={ () => addNew() }
                    type="submit"
                    variant="raised"
                    color="primary"
                  >
                    Добавить слайд
                  </Button>
                </div>
                
              }

            </div>
        }
      </Portlet>
    )
  }
}

const mapStateToProps = state => {
  const languages = getLanguages(state);
  const items = getSliderItems(state)
  return {
    isFetched: state.slider.isFetched,
    isFetching: state.slider.isFetching,
    items,
    languages,
  }
};

export default compose(
  connect(mapStateToProps, { loadItems, saveItem }),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.loadItems();
      }
    }
  }),
  withStateHandlers(
    {
      isEditMode: false,
    },
    {
      addNew: ({ counter }) => (value) => ({
        isEditMode: true
      }),
      cancel: () => value => ({
        isEditMode: false
      }),
    }
  ),
)(SliderContainer);