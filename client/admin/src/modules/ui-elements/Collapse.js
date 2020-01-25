import React, { Component } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Collapse } from 'react-collapse';
import Icon from 'material-ui/Icon';

const styles = StyleSheet.create({
  root: {
    marginBottom: '15px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    padding: '20px 20px',
    fontSize: '20px',
    marginBottom: '0',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)'
  }
});

class CollapseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    }
  }
  toggle = () => {
    this.setState({ isOpened: !this.state.isOpened })
  };

  render() {
    const { isOpened } = this.state;
    return (
      <div className={css(styles.root)}>
        <h4 className={css(styles.title)} onClick={this.toggle}>
          {this.props.title}
          {isOpened ?
            <Icon className={css(styles.icon)}>keyboard_arrow_up</Icon>
            :
            <Icon className={css(styles.icon)}>keyboard_arrow_down</Icon>
          }

        </h4>
        <Collapse isOpened={isOpened}>
          {isOpened && this.props.children}
        </Collapse>
      </div>
    )
  }
}

export default CollapseComponent;
