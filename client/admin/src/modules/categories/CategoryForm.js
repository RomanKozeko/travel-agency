import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import { StyleSheet, css } from 'aphrodite/no-important';
import NotificationPanel from '../ui-elements/form/NotificationPanel';

const styles = StyleSheet.create({
  tabs: {
    top: '-20px',
    zIndex: '1',
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dae2ea'
  }
});

// {
//   "_id" : ObjectId("5968c8274d5cbd1190b3b91e"),
//   "content" : [
//   {
//     "title" : "гастрономичесие",
//     "language" : "59785cfd3d312f2ddc804a6c",
//     "_id" : ObjectId("5968c8274d5cbd1190b3b920")
//   },
//   {
//     "title" : "Gastronomic",
//     "language" : "59785e533d312f2ddc804a6d",
//     "_id" : ObjectId("5968c8274d5cbd1190b3b91f")
//   }
// ],
//   "__v" : 0
// }

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    const contentByLang = {...this.props.languagesIDs};

    Object.keys(contentByLang).forEach(key => {
      contentByLang[key] = {
        title: '',
        description: '',
        language: key,
        notValidForm: false
      }
    });

    this.props.category.content.forEach(content => {
      contentByLang[content.language] = content
    });

    this.state = {
      contentByLang,
      name: 'Max',
      selectedTabIndex: 0,
      content: this.props.content,
      category: this.props.category,
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

  save = (e) => {
    e.preventDefault();
    const category = {...this.state.category};
    category.content = Object.values(this.state.contentByLang);
    if (this.isValidInputs(category.content)) {
      this.props.saveCategory(category, this.props.isNew);
      this.setState({notValidForm: false})
      if (this.props.isNew) {
        this.props.history.push('/admin/categories', {});
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
    const { isSaving } = this.props;
    return (
      <div>
        <Tabs
          className={css(styles.tabs)}
          index={this.state.selectedTabIndex}
          onChange={this.handleTabChange}
        >
          {this.props.languages.map(lang => (<Tab label={lang.title} key={lang._id}/>))}
        </Tabs>

        <form action="" onSubmit={this.save}>
          {this.props.languages.map((lang, i) => (
            <div key={lang._id}>
            {this.state.selectedTabIndex === i &&
              <div className="row">
                <div className="col-sm-6">
                  <TextField
                    id="title"
                    label="title"
                    fullWidth
                    value={this.state.contentByLang[lang._id].title}
                    onChange={this.handleChange(lang._id, 'title')}
                    margin="normal"
                    required
                  />
                </div>
              </div>
            }
            </div>
          ))
          }
          {this.state.notValidForm &&
            <NotificationPanel>Please fill title for each language</NotificationPanel>
          }
          <Button
            raised
            type="submit"
            color="primary"
            disabled={isSaving}
          >
            {isSaving ? 'Сохраняю...' : 'Сохранить'}
          </Button>
        </form>
      </div>
    )
  }
}

export default CategoryForm;