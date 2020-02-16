import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  error: {
    color: '#ff1744',
  },
});

const isValid = (val, regExpVal) => {
  const regExp = regExpVal || /^.{1,20}$/;
  return !!val.match(regExp);
};

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false,
    };
  }
  setTouched = () => {
    this.setState({ isTouched: true });
  };

  handleChange(e, name, id, isValid) {
    this.setState({ isTouched: true });
    this.props.handleChange(e, name, id, isValid);
  }

  render() {
    const { value, label, id, regExp, name } = this.props;
    const isValidInput = isValid(value, regExp);
    return (
      <div className={css(styles.wrapper)}>
        <TextField
          error={!isValidInput && this.state.isTouched}
          value={value}
          label={label}
          name={name}
          onBlur={this.setTouched}
          onChange={e => this.handleChange(e, name, id, isValidInput)}
        />
        {!isValidInput && this.state.isTouched && (
          <div className={css(styles.error)}>Field is not valid</div>
        )}
      </div>
    );
  }
}

export default FormInput;
