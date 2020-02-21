import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

class MyEditor extends Component {
  constructor(props) {
    super(props);
  }

  handleEditorChange(e) {
    console.log('Content was updated:', e.target.getContent());
  }

  render() {
    return (
      <div>
        <TinyMCE
          content="<p>This is the initial content of the editor</p>"
          config={{
            plugins: 'link image code media',
            toolbar:
              'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fontsizeselect link image',
            height: '500',
          }}
          onChange={this.handleEditorChange.bind(this)}
        />
      </div>
    );
  }
}

export default MyEditor;
