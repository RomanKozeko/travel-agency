import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Tabs, { Tab } from 'material-ui/Tabs';
const _ = require('lodash');

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea',
  },
});

export default function withTabs(WrappedComponent, backLink) {
  return class extends Component {
    constructor(props) {
      super(props);
      const contentByLang = { ...this.props.languagesIDs };

      Object.keys(contentByLang).forEach(key => {
        contentByLang[key] = {
          title: '',
          description: '',
          language: key,
        };
      });
      const item = { ...this.props.item };
      item.content.forEach(content => {
        contentByLang[content.language] = content;
      });

      this.state = {
        contentByLang,
        selectedTabIndex: 0,
        previewItemsToDelete: [],
        content: this.props.content,
        item: this.props.item,
        notValidForm: false,
      };
    }

    handleTabChange = (event, value) => {
      this.setState({ selectedTabIndex: value });
    };

    handleChange = (langID, name) => event => {
      if (langID) {
        const contentByLang = { ...this.state.contentByLang };
        contentByLang[langID][name] = event.target.value;
        this.setState({ contentByLang });
      } else {
        const item = { ...this.state.item };
        item[name] = event.target.value;
        this.setState({ item });
      }
    };

    handleInputChange = (name, ...rest) => event => {
      let item = { ...this.state.item };
      if (name) {
        item[name] = event.target.value;
      }

      rest.forEach(restItem => {
        item = { ...item, ...restItem };
      });

      this.setState({ item });
    };

    handleEditorChange = langID => e => {
      const contentByLang = { ...this.state.contentByLang };
      contentByLang[langID].content = e.target.getContent();
      this.setState({ contentByLang });
    };

    handleToggle = (event, fieldName, checked) => {
      const item = { ...this.state.item };
      item[fieldName] = checked;

      this.setState({ item });
    };

    addPreview = selectedItems => {
      const item = { ...this.state.item };
      const ifSelectedBefore = selectedItems.find(selectedItem =>
        item.preview.find(previewItem => previewItem._id === selectedItem._id)
      );
      if (!ifSelectedBefore) {
        item.preview = [...item.preview, ...selectedItems];
        this.setState({ item });
      }
    };

    deletePreviewItems = () => {
      const { item, previewItemsToDelete } = { ...this.state };
      item.preview = item.preview.filter(
        previewItem =>
          !previewItemsToDelete.find(
            selectedItem => selectedItem._id === previewItem._id
          )
      );

      this.setState({ item, previewItemsToDelete: [] });
    };

    handleSave = e => {
      e.preventDefault();
      const item = { ...this.state.item };
      item.content = _.flatMap({ ...this.state.contentByLang });

      if (item.url) {
        item.url = item.url.replace(/\s+/g, '-').toLowerCase();
      }

      if (this.isValidInputs(item.content)) {
        this.props.save(item, this.props.isNew);
        this.setState({ notValidForm: false, item });
        if (this.props.isNew) {
          this.props.history.push(backLink, {});
        }
      } else {
        this.setState({ notValidForm: true, item });
      }
    };

    togglePreviewItem = img => {
      const item = { ...this.state.item };
      const previewItemsToDelete = [];
      item.preview.forEach(previewItem => {
        if (previewItem._id === img._id) {
          previewItem.active = !previewItem.active;
        }
        if (previewItem.active) {
          previewItemsToDelete.push(previewItem);
        }
      });
      this.setState({ item, previewItemsToDelete });
    };

    isValidInputs(content) {
      let isValid = true;
      for (let i = 0; i < content.length; i++) {
        if (!content[i].title) {
          isValid = false;
          break;
        }
      }
      return isValid;
    }

    toggleEnableForLanguage = id => (e, checked) => {
      const item = { ...this.state.item };

      if (!item.disabledForLanguages) {
        item.disabledForLanguages = [];
      }

      item.disabledForLanguages = checked
        ? [...item.disabledForLanguages, id]
        : item.disabledForLanguages.filter(litem => litem !== id);

      this.setState({ item });
    };

    render() {
      return (
        <div>
          <Tabs
            className={css(styles.tabs)}
            value={this.state.selectedTabIndex}
            onChange={this.handleTabChange}
          >
            {this.props.languages.map(lang => (
              <Tab label={lang.title} key={lang._id} />
            ))}
          </Tabs>
          <WrappedComponent
            handleTabChange={this.handleTabChange}
            handleChange={this.handleChange}
            handleSave={this.handleSave}
            handleToggle={this.handleToggle}
            addPreview={this.addPreview}
            togglePreviewItem={this.togglePreviewItem}
            deletePreviewItems={this.deletePreviewItems}
            handleEditorChange={this.handleEditorChange}
            handleInputChange={this.handleInputChange}
            parentState={this.state}
            toggleEnableForLanguage={this.toggleEnableForLanguage}
            {...this.props}
          />
        </div>
      );
    }
  };
}
