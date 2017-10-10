import React from 'react'
import TextField from 'material-ui/TextField';
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  wrapper: {
  },
  field: {
    width: '300px'
  },
  error: {
    color: '#ff1744'
  }
});

const isValid = (val, regExpVal) => {
  const regExp = regExpVal || /^.{1,20}$/;
  return !!val.match(regExp)
};

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouched: false
    };
  }
  setTouched = () => {
   this.setState({isTouched: true})
  };

  handleChange(e, name, id, isValid) {
    this.setState({isTouched: true})
    this.props.handleChange(e, name, id, isValid)
  }

  render() {
    const {value, label, id, regExp} = this.props;
    const isValidInput = isValid(value, regExp);
    return (
      <div className={css(styles.wrapper)}>
        <TextField
          error={!isValidInput}
          value={value}
          label={label}
          onBlur={this.setTouched}
          onChange={(e) => this.handleChange(e, 'title', id, isValidInput)
          }
        />
        {!isValidInput && this.state.isTouched && <div className={css(styles.error)}>Field is not valid</div>}
      </div>
    )
  }
}

export default FormInput