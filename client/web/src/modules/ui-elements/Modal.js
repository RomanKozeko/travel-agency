import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

const modalRoot = document.getElementById('modal-root');
const translateKeyframes = {
  '0%': {
    transform: 'rotateX(-60deg)',
    opacity: '0'
  },
  '100%': {
    transform: 'rotateX(0deg)',
    opacity: '1'
  },
};

const opacityKeyframes = {
  'from': {
    opacity: 0,
  },

  'to': {
    opacity: 1,
  }
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'fixed',
    background: 'rgba(0,0,0,.3)',
    zIndex: '99',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animationName: [opacityKeyframes],
    animationDuration: '.3s, 300ms',
  },
  modal: {
    perspective: '1300px'
  },
  body: {
    background: '#fff',
    padding: '20px',
    width: '320px',
    transformStyle: 'preserve-3d',
    transformOrigin: '50% 0',
    transition: 'all 0.3s',
    animationName: [translateKeyframes],
    animationDuration: '.3s, 300ms',
  }
});



class Modal extends React.Component {
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
      <div className={ css(styles.wrapper) }>
        <div className={ css(styles.modal) }>
          <div className={ css(styles.body) }>
            { this.props.children }
          </div>
        </div>

      </div>,
      this.el,
    );
  }
}

export default Modal