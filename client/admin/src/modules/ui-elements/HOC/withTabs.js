import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  }
});

export default function withTabs(WrappedComponent, backLink ) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const contentByLang = {...this.props.languagesIDs};

      Object.keys(contentByLang).forEach(key => {
        contentByLang[key] = {
          title: '',
          description: '',
          language: key,
        }
      });
      const item = {...this.props.item};
      item.content.forEach(content => {
        contentByLang[content.language] = content
      });

      this.state = {
        contentByLang,
        selectedTabIndex: 0,
        content: this.props.content,
        item: this.props.item,
        notValidForm: false
      }
    }

    handleTabChange = (event, value) => {
      this.setState({ selectedTabIndex:value });
    };

    handleChange = (langID, name) => event => {
      const contentByLang = {...this.state.contentByLang};
      contentByLang[langID][name] = event.target.value;
      this.setState({contentByLang});
    };

    handleSave = (e) => {
      e.preventDefault();
      const item = {...this.state.item};
      item.content = Object.values(this.state.contentByLang);
      if (this.isValidInputs(item.content)) {
        this.props.save(item, this.props.isNew);
        this.setState({notValidForm: false});
        if (this.props.isNew) {
          this.props.history.push(backLink, {});
        }
      } else {
        this.setState({notValidForm: true})
      }
    };

    isValidInputs(content) {
      let isValid = true;
      for(let i = 0; i < content.length; i++) {
        if (!content[i].title) {
          isValid = false;
          break;
        }
      }
      return isValid
    }

    render() {
      return <div>
        <Tabs
          className={css(styles.tabs)}
          value={this.state.selectedTabIndex}
          onChange={this.handleTabChange}
        >
          {this.props.languages.map(lang => (<Tab label={lang.title} key={lang._id}/>))}
        </Tabs>
        <WrappedComponent
          handleTabChange={this.handleTabChange}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          parentState={this.state}
          {...this.props}
        />
      </div>
    }
  }
}