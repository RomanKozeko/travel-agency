import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import TreeList from '../ui-elements/TreeList'
import StarsList from '../ui-elements/StarsList';
import { getRegions } from '../../rootReducer';
import { populateTree } from '../regions/RegionService';
import { loadRegions } from '../regions/regionsReducer';
import withEntities from "../ui-elements/HOC/withEntities";

const styles = StyleSheet.create({
  root: {
    padding: '20px'
  },
  selectedItemsContainer: {
    marginBottom: '10px',
    marginLeft: '-10px'
  },
  filterWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  filteredItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 5px 5px 20px',
    marginTop: '1px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  },
  regionContainer: {
    width: '50%',
    marginLeft: '-40px',
    flexGrow: '1'
  },
  filteredItemsContainer: {
    width: '50%',
    padding: '0 10px 20px 15px',
    maxHeight: '750px',
    overflowY: 'auto'
  },
  chip: {
    marginLeft: '10px',
    marginBottom: '10px'
  },
  itemLink: {
    width: '150px',
  }
});

class FilterByRegions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRegions: []
    }
  }

  // componentWillUnmount() {
  //   this.props.filterUnmount();
  // }

  selectRegions = (e) => {
    const updatedItems = this.toggleItem(this.state.selectedRegions, e.target.value);
    this.setState({ selectedRegions : updatedItems });
    this.props.loadItemsByRegions(updatedItems);
  };

  toggleItem = (itemsArray, item) => {
    const itemsToReturn = [...itemsArray];
    const index = itemsToReturn.indexOf(item);
    index === -1 ? itemsToReturn.push(item) : itemsToReturn.splice(index, 1);
    return itemsToReturn;
  };

  getTitle = (items, id) => {
    const item = items.find(item => item._id === id);
    return item ? item.content[0].title : '';
  };

  render() {
    const { regions, filteredItems, itemsNameToFilter } = this.props;
    return (
      <div className={css(styles.root)}>
        <div className={css(styles.selectedItemsContainer)}>
          {this.props.selectedItems.map(selectedItemId =>
            <Chip
              label={this.getTitle(this.props[itemsNameToFilter], selectedItemId)}
              key={selectedItemId}
              onDelete={(e) => this.props.toggleItem(e, selectedItemId)}
              className={css(styles.chip)}
            />
          )}
        </div>
        <div className={css(styles.filterWrapper)}>
          <div className={css(styles.regionContainer)}>
            <TreeList
              selectedItems={this.state.selectedRegions}
              items={regions}
              selectItems={this.selectRegions}
            />
          </div>
          <div className={css(styles.filteredItemsContainer)}>
            {filteredItems.map((filteredItem, i) => (
              !this.props.selectedItems.find(selectedItemId => filteredItem._id === selectedItemId) &&
              <div key={filteredItem._id} className={css(styles.filteredItem)}>
                <div className={css(styles.itemLink)}>
                  <Link to={`/admin/${itemsNameToFilter}/${filteredItem._id}`}>{filteredItem.content[0].title}</Link>
                </div>
                <StarsList starsCount={filteredItem.stars} />
                <Button
                  color="primary"
                  className={css(styles.addButton)}
                  onClick={(e) => this.props.toggleItem(e, filteredItem._id)}
                >
                  Добавить
                </Button>
              </div>
            ))}
            {!filteredItems.length && <h4>Данные не найдены</h4>}
          </div>
        </div>
      </div>
    )
  }
}
const options = {
  regions: {
    loadItems: loadRegions,
    getItems: (state) => populateTree(getRegions(state))
  }
};
// pageUnmount: actions.filterUnmount,
export default withEntities(FilterByRegions, options);
