import React from 'react'
import MainNav from './MainNav'
import TopNav from './TopNav'


class HeaderContainer extends React.Component {
  render() {
    return (
      <div>
        <TopNav />
        <MainNav/>
      </div>
    );
  }
}


export default HeaderContainer;