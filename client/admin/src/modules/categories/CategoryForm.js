import React from 'react';
import TextField from 'material-ui/TextField';
import Tabs, { Tab, TabContainer } from 'material-ui/Tabs';
import { StyleSheet, css } from 'aphrodite/no-important';

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
        language: key
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

  render() {
    return (
      <div>
        <Tabs
          className={css(styles.tabs)}
          index={this.state.selectedTabIndex}
          onChange={this.handleTabChange}
        >
          {this.props.languages.map(lang => (<Tab label={lang.title} key={lang._id}/>))}
        </Tabs>

        <form action="">
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
                  />
                </div>
              </div>
            }
            </div>
          ))
          }
        </form>
      </div>
    )
  }
}

export default CategoryForm;