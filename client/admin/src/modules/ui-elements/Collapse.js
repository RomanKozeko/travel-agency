import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Collapse } from 'react-collapse';

const styles = StyleSheet.create({
  root: {
    marginBottom: '15px'
  },
  title: {
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    padding: '20px 5px',
    fontSize: '20px',
    marginBottom: '0',
  }
});

class CollapseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };

  render() {
    return (
      <div className={css(styles.root)}>
        <h4 className={css(styles.title)} onClick={this.toggle}>
          {this.props.title}
        </h4>
        <Collapse isOpened={this.state.isOpen}>
          {this.props.children}
        </Collapse>
      </div>
    )
  }
}

export default CollapseComponent;
