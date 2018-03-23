import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import ListItemsModal from './ListItemsModal'

const styles = StyleSheet.create({
  row: {
    display: 'block',
  },
  tags: {
    paddingBottom: '10px'
  },
  tagsItem: {
    margin: '3px'
  },
  inputWrapper: {
  },
  input: {
    width: '100%'
  },
  highlightedText: {
    color: '#5b9bd1',
    fontWeight: 'bold'
  },
  dropDown: {
    padding: '10px 0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.09)',
    listStyle: 'none',
    maxHeight: '300px',
    overflow: 'hidden'
  },
  dropDownItem: {
    cursor: 'pointer',
    lineHeight: '20px',
    padding:  '5px',
    ':hover': {
      background: '#f3f5f9'
    }
  }
});

const HighlightedText = ({text, search}) => {
  const re = new RegExp(search,'g');
  if (search) {
    return <div dangerouslySetInnerHTML={{ __html: text.replace(re, `<span class=${css(styles.highlightedText)}>${search}</span>`)}} />;
  }
  return <div>{text}</div>
};


class SortableInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      showItemsList: false,
      filteredItems: this.props.item,
      items: this.props.items,
      selectedItems: this.props.selectedItems || [],
      inputId: `FilteredTagSelector-${Date.now()}`,
      dropDownId: `FilteredTagDropdown-${Date.now()}`,
      coordinates: {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.showDropDown(false))
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.showDropDown(false));
  }

  addItem = (id) => (e) => {
    const item = [...this.state.items].find(item => item._id === id);

    this.props.onFilterSelect(this.props.filterType, [ item ]);
    this.setState({
      selectedItems: [ item ]
    })
  };

  removeItem = (id) => (e) => {
    this.props.onFilterSelect(this.props.filterType, []);
    this.setState({
      selectedItems: []
    })
  };

  filterItems = (e) => {
    this.setState({filter: e.target.value})
  };

  showDropDown = (show) => (e) => {
    if ((e.target.id === this.state.inputId || e.target.id === this.state.dropDownId) && this.state.showItemsList) {
      return
    }
    this.setState({
      showItemsList: show,
      coordinates: e.target.getBoundingClientRect()
    })
  };

  isMatch = (item) => {
    return item.content[0].title.includes(this.state.filter)
  };

  render() {
    const {items, showItemsList, selectedItems, filter, coordinates, inputId} = this.state;
    return (
      <div className={css(styles.row)}>
        <div className={css(styles.inputWrapper)}>
          <TextField
            id={inputId}
            label={this.props.label}
            onFocus={this.showDropDown(true)}
            margin="normal"
            onChange={this.filterItems}
            className={css(styles.input)}
          />
          {showItemsList &&
          <ListItemsModal coordinates={coordinates} handleClose={this.showDropDown} >
            <ul className={css(styles.dropDown)}>
              {items.map(item => {
                  if (this.isMatch(item)) {
                    return (<li className={css(styles.dropDownItem)} key={item._id} onClick={this.addItem(item._id)}>
                      <HighlightedText text={item.content[0].title} search={filter}/>
                    </li>)
                  }
                  return null
                }
              )}
            </ul>
          </ListItemsModal>
          }
        </div>

        <div className={css(styles.tags)}>
          {selectedItems.map(item => (
            <Chip
              key={item._id + 1}
              className={css(styles.tagsItem)}
              label={item.content[0].title}
              onRequestDelete={this.removeItem(item._id)}
            />
          ))
          }
        </div>
      </div>
    )
  }
}

export default SortableInput;