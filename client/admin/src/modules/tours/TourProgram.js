import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Button from 'material-ui/Button';
import TinyMCE from 'react-tinymce';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
const uniqueId = require('lodash.uniqueid');

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    padding: '10px'
  },
  addButton: {
    marginTop: '15px'

  },
  daySettings: {
    position: 'relative',
  },
  dayDescription: {
    margin: '25px 0 10px 0',
    fontWeight: 'bold'
  },
  deleteIcon: {
    position: 'absolute',
    right: '0',
    top: '-15px'
  }
});

class TourProgram extends React.Component {
  handleEditorChange = (id) => (e) => {
    let days = [...this.props.days];
    let item = days.find(item => (item._id|| item.id) === id);
    item.description = e.target.getContent();
    this.props.save(days);
  };

  deleteDay = id => {
    let days = [...this.props.days];
    let index = days.findIndex(item => (item._id|| item.id)=== id);
    days.splice(index, 1);
    this.props.save(days);
  };

  addDay = () => {
    let days = [...this.props.days];
    days.push({ id: uniqueId(), description: '' });
    this.props.save(days)
  };

  render() {
    const { days } = this.props;
    return (
      <div className={css(styles.root)}>
        <Button
          color="primary"
          className={css(styles.addButton)}
          onClick={this.addDay}
        >
         Добавить новый день
        </Button>
        {
          days.map((item, index, array) => (
            <div key={item._id || item.id}>
              <div className={css(styles.daySettings)}>
                <p className={css(styles.dayDescription)}> День {index + 1}</p>
                <IconButton className={css(styles.deleteIcon)} onClick={() => this.deleteDay(item._id || item.id)}>
                  <Icon>delete</Icon>
                </IconButton>
              </div>
              <TinyMCE
                content={item.description}
                config={{
                  plugins:'link image code',
                  height: '100'
                }}
                onChange={this.handleEditorChange(item._id || item.id)}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export default TourProgram;
