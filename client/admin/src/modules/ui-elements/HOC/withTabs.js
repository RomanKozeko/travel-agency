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
        previewItemsToDelete: [],
        content: this.props.content,
        item: this.props.item,
        notValidForm: false
      }
    }

    handleTabChange = (event, value) => {
      this.setState({ selectedTabIndex:value });
    };

    handleChange = (langID, name) => event => {
      if (langID) {
        const contentByLang = {...this.state.contentByLang};
        contentByLang[langID][name] = event.target.value;
        this.setState({contentByLang});
      } else {
        const item = { ...this.state.item };
        item[name] = event.target.value;
        this.setState({ item });
      }
    };

    handleToggle = (event, fieldName, checked) => {
      const item = { ...this.state.item };
      item[fieldName] = checked;

      this.setState({ item });
    };

    addPreview = (selectedItems) => {
      const item = { ...this.state.item };
      const ifSelectedBefore = selectedItems.find(selectedItem => (
        item.preview.find(previewItem => previewItem._id === selectedItem._id)
      ));
      if (!ifSelectedBefore) {
        item.preview = [...item.preview, ...selectedItems];
        this.setState({ item });
      }
    };

    deletePreviewItems = () => {
      const { item, previewItemsToDelete } = {...this.state};
      item.preview = item.preview.filter(
        previewItem => !previewItemsToDelete.find(selectedItem => selectedItem._id === previewItem._id)
      );

      this.setState({ item, previewItemsToDelete: [] })
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

    togglePreviewItem = (img) => {
      const item = {...this.state.item};
      const previewItemsToDelete = [];
      item.preview.forEach(previewItem => {
        if (previewItem._id === img._id) {
          previewItem.active = !previewItem.active;
        }
        if (previewItem.active) {
          previewItemsToDelete.push(previewItem)
        }
      });
      this.setState({item, previewItemsToDelete});
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
          handleToggle={this.handleToggle}
          addPreview={this.addPreview}
          togglePreviewItem={this.togglePreviewItem}
          deletePreviewItems={this.deletePreviewItems}
          parentState={this.state}
          {...this.props}
        />
      </div>
    }
  }
}