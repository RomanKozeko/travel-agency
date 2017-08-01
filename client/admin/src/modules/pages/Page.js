import React from 'react'
import AddPageItemMenu from './AddPageItemMenu'
import PageHeader from '../ui-elements/PageHeader'
import Portlet from '../ui-elements/Portlet'
import PageCaption from '../ui-elements/PageCaption'
import GridIcons from '../ui-elements/gridIcons/GridIcons'
import MyEditor from './MyEditor'
import PageForm from './PageForm'
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  field: {
    marginBottom: '10px;'
  },
  row: {
    height: '200px',
    width: '100%',
    border: '4px solid #aeaeae',
    margin: '20px 0',
    display: 'flex',
    padding: '0 5px;'
  },
  rowInner: {
    border: '4px dashed #e6e6e6',
    margin: '10px 5px;',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all .3s ease',
    ':hover': {
      border: '4px dashed #aeaeae',
    }
  }
});

const renderRows = (count) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
    <div key={i} className={css(styles.rowInner)}>
      <AddPageItemMenu />
    </div>)
  }

  return rows;
};


class Page extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      rows: []
    }
  }

  addRow(columns) {
    const rows = [...this.state.rows];
    rows.push({columns});
    this.setState({rows})
  }

  submit = (values) => {
    // print the form values to the console
    console.log(values)
  }

  render() {
    return (
      <div>
        <PageHeader text={'Cтраница:'}/>

        <Portlet isBordered={true}>

          <PageForm onSubmit={this.submit}/>

          <PageCaption text={'Добавить ряд'}/>
          <div className="row">
            <div className="col-sm-3">
              <GridIcons count={1} clickHandler={this.addRow.bind(this)} />
            </div>
            <div className="col-sm-3">
              <GridIcons count={2} clickHandler={this.addRow.bind(this)}/>
            </div>
            <div className="col-sm-3">
              <GridIcons count={3} clickHandler={this.addRow.bind(this)}/>
            </div>
            <div className="col-sm-3">
              <GridIcons count={4} clickHandler={this.addRow.bind(this)}/>
            </div>
          </div>

          <PageCaption text={'Схема страницы'}/>

          <div>
            {this.state.rows.map((row, i) => (
              <div key={i} className={css(styles.row)}>
                {renderRows(row.columns)}
              </div>
            ))}
          </div>

          <Button raised color="primary" className={css(styles.button)} onClick={() => this.addRow(1)}>
            Сохранить
          </Button>
        </Portlet>
      </div>
    )
  }

}

export default Page;