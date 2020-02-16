import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  wrapper: {
    '@media (max-width: 992px)': {
      width: 'auto',
      position: 'static',
    },
  },
});

function withSticky(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        isSticky: false,
      };
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleChange);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleChange);
    }

    handleChange() {
      this.setState({
        isSticky: this.wrapper.getBoundingClientRect().top < 0,
        width: this.wrapper.offsetWidth,
      });
    }

    render() {
      const { isSticky, width } = this.state;
      const wrapperStyles = {
        top: '0',
        width: isSticky ? `${width}px` : 'auto',
        position: isSticky ? 'fixed' : 'initial',
      };
      return (
        <div ref={wrapper => (this.wrapper = wrapper)}>
          <div className={css(styles.wrapper)} style={wrapperStyles}>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };
}

export default withSticky;
