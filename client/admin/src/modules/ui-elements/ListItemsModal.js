import ReactDOM from 'react-dom';
import React from 'react';
import {css, StyleSheet} from 'aphrodite/no-important';


const styles = StyleSheet.create({
  dropDownWrapper: {
    position: 'absolute',
    zIndex: '1501'
  }
});


const modalRoot = document.getElementById('root');
class ListItemsModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      <div className={css(styles.dropDownWrapper)} style={
        {
          width: this.props.coordinates.width,
          top: this.props.coordinates.y + this.props.coordinates.height + window.pageYOffset,
          left: this.props.coordinates.x + window.pageXOffset
        }
      }>{this.props.children}</div>,
      // A DOM element
      this.el,
    );
  }
}

export default ListItemsModal;
