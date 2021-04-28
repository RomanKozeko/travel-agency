import React from 'react'
import { Editor } from '@tinymce/tinymce-react'; 

const TinyMCE = ({ className, content, config, onChange }) => (
  <Editor
    className={className}
    apiKey="v8moogrkl0aegm8yqvujw36eittj8hycwg5emdnwj8z34xzz"
    initialValue={content}
    init={config}
    onChange={onChange}
  />
)

export default TinyMCE;