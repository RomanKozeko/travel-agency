import React from 'react';
import TextField from 'material-ui/TextField';

export default function withSearch(WrappedComponent) {
	return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        filterQuery: '',
	      activeItems: this.props.items || []
      }
    }

	  handleInputChange = (e) => {
      this.setState({ filterQuery: e.target.value.toLowerCase() })
    };

    filterItems = (items) => {
      return items.filter(item => (
          item.content.some(contentItem => (contentItem.title.toLowerCase().indexOf(this.state.filterQuery) !== -1)) ||
          item.filename && (item.filename.toLowerCase().indexOf(this.state.filterQuery) !== -1)
        )
      );
    }

    render() {
      return (
        <div>
          <TextField
            label="Поиск"
            onChange={this.handleInputChange}
            fullWidth
            style={{marginBottom: '25px'}}
          />
            <WrappedComponent
              {...this.props}
              items={this.state.filterQuery ? this.filterItems(this.props.items) : this.props.items}
            />
        </div>
      );
    }
  }
}
