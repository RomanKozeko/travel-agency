import React, { Component } from 'react';
import { compose, lifecycle, withStateHandlers, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import Icon from 'material-ui/Icon';
import Portlet from '../ui-elements/Portlet';
import { getLanguages, getSliderItems } from '../../rootReducer';
import { loadItems, saveItem, deleteItems } from './SliderReducer';
import Spinner from '../ui-elements/Spinner';
import Button from 'material-ui/Button';
import SliderForm from './SliderForm';
import ConfirmDialog from '../ui-elements/form/ConfirmDialog';
import createConfirmation from '../ui-elements/form/createConfirmation';

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
  toolbar: {
    display: 'flex',
  },
});

const confirm = createConfirmation(ConfirmDialog);

class SliderContainer extends Component {
  render() {
    const {
      items,
      itemToEditId,
      showAddNewForm,
      edit,
      cancel,
      addNew,
      deleteItem,
    } = this.props;
    return (
      <Portlet isBordered>
        {this.props.isFetching || !this.props.isFetched ? (
          <Spinner />
        ) : (
          <div>
            <div className="row">
              {items.map(item =>
                itemToEditId !== item._id ? (
                  <div className="col-md-4">
                    <div className={css(styles.sliderItem)}>
                      <div className={css(styles.toolbar)}>
                        <Icon onClick={() => edit(item._id)}>edit</Icon>
                        <Icon onClick={() => deleteItem([item._id])}>
                          delete
                        </Icon>
                      </div>

                      {item.image && (
                        <img
                          src={item.image}
                          className={css(styles.img)}
                          alt=""
                        />
                      )}
                      {item.content[0].title}
                    </div>
                  </div>
                ) : (
                  <SliderForm cancel={cancel} item={item} />
                )
              )}
              {showAddNewForm && <SliderForm cancel={cancel} />}
            </div>
            {!showAddNewForm && (
              <div>
                <Button
                  onClick={() => addNew()}
                  type="submit"
                  variant="raised"
                  color="primary"
                >
                  Добавить слайд
                </Button>
              </div>
            )}
          </div>
        )}
      </Portlet>
    );
  }
}

const mapStateToProps = state => {
  const languages = getLanguages(state);
  const items = getSliderItems(state);
  return {
    isFetched: state.slider.isFetched,
    isFetching: state.slider.isFetching,
    items,
    languages,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { loadItems, saveItem, deleteItems }
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.isFetched) {
        this.props.loadItems();
      }
    },
  }),
  withHandlers({
    deleteItem: ({ deleteItems }) => id => {
      confirm({ title: `Точно удалить?`, body: '' }).then(res => {
        deleteItems(id);
      });
    },
  }),
  withStateHandlers(
    {
      showAddNewForm: false,
    },
    {
      addNew: () => () => ({
        showAddNewForm: true,
        itemToEditId: null,
      }),
      edit: () => id => ({
        itemToEditId: id,
      }),
      cancel: () => value => ({
        showAddNewForm: false,
        itemToEditId: null,
      }),
    }
  )
)(SliderContainer);
