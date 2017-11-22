import React from 'react';
import withTabs from '../ui-elements/HOC/withTabs';

class HotelForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <form action="" onSubmit={this.handleSave}>
      {this.props.languages.map((lang, i) => (
        <div key={lang._id}>
          {
            this.props.parentState.selectedTabIndex === i && <div>Lang</div>
          }
        </div>
      ))}
      </form>)
  }
}

export default withTabs(HotelForm, '/admin/hotels')