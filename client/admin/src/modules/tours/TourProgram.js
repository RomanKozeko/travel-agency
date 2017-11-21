import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import TinyMCE from 'react-tinymce';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
const uniqueId = require('lodash.uniqueid');

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f9f8f8'
  },
  daySettings: {
  },
  dayDescription: {
    display: 'inline-block',
    lineHeight: '48px'
  },
  deleteIcon: {

  }
});

class TourProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    }
  }

  handleEditorChange = (id) => (e) => {
    let days = [...this.state.days];
    const index = days.findIndex(day => day.id === id);
    days[index].text = e.target.getContent();
    this.state.days = days;
  };

  deleteDay = id => {
    let days = [...this.state.days];
    const index = days.findIndex(day => day.id === id);
    days.splice(index, 1);
    this.setState({ days });
  };

  addDay = () => {
    let days = [...this.state.days];
    days.push( {id: uniqueId(), text: ''});
    this.setState({ days })
  };

  render() {
    const { days } = this.state;
    return (
      <div className={css(styles.root)}>
        <Button
          raised
          color="contrast"
          className=""
          onClick={this.addDay}
        >
         Добавить день
        </Button>
        {
          days.map((item, index, array) => (
            <div key={item.id}>
              <div className={css(styles.daySettings)}>
                <p className={css(styles.dayDescription)}> День {index + 1}</p>
                <IconButton className={css(styles.deleteIcon)} onClick={() => this.deleteDay(item.id)}>
                  <Icon>delete</Icon>
                </IconButton>
              </div>
              <TinyMCE
                content={item.text}
                config={{
                  plugins:'link image code',
                  height: '100'
                }}
                onChange={this.handleEditorChange(item.id)}
              />
            </div>
          ))
        }

        <Button
          raised
          color="accent"
          className=""
          onClick={() => this.props.save(days)}
        >
          save
        </Button>
      </div>
    )
  }
}

export default TourProgram;
