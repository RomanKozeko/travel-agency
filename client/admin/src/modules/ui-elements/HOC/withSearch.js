import React from 'react';
import TextField from 'material-ui/TextField';

export default function withSearch(WrappedComponent) {
	return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
	      activeItems: this.props.items || []
      }
    }

	  handleInputChange = (e) => {
      const newItems = this.props.items
        .filter(item => (
          item.content.some(contentItem => (
            contentItem.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1))
          )
        );
      this.setState({ activeItems: newItems })
    };

    render() {
      return (
        <div>
          <TextField
            label="Поиск"
            onChange={this.handleInputChange}
            fullWidth
            style={{marginBottom: '25px'}}
          />
            <WrappedComponent {...this.props} items={this.state.activeItems} />
        </div>
      );
    }
  }
}
