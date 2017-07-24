import React from 'react'
import injectSheet from 'react-jss'

import MainNav from './MainNav'
import TopNav from './TopNav'


const styles = {
  wrapper: {
    position: 'relative'
  }
};

const HeaderContainer = ({classes}) => (

  <div>
    <TopNav/>
    <MainNav/>
  </div>
);

export default injectSheet(styles)(HeaderContainer);