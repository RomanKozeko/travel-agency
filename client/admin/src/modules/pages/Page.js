import React from 'react'
import PageHeader from '../ui-elements/PageHeader'
import Portlet from '../ui-elements/Portlet'
import {Editor, EditorState} from 'draft-js';
//import 'react-draft-wysiwyg.css';
import MyEditor from './MyEditor'

const Page = () => (
  <div>
    <PageHeader text={'Все страницы'} />

    <Portlet isBordered={true}>
      <MyEditor />
    </Portlet>
  </div>
)

export default Page;