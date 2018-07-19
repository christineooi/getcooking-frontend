import React, { Component } from "react";
import { connect } from 'react-redux';
import {  Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { backendurl } from '../config';
// import { logoutUser } from '../actions/userAction';

import { Menu,Icon,Header } from "semantic-ui-react";

class HeaderNav extends Component {
  state = {activeItem: 'login'}

  handleClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = (e, { name }) => {
    console.log("in handleLogout");
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <React.Fragment>  
        <Header as='h1' color="olive"> 
            <Icon name='food' color="orange"/>
            <Header.Content>Get Cooking</Header.Content>
        </Header>
        <Menu size="huge" color="orange" widths={3} pointing secondary>
            <Menu.Menu position='right'>
                <Menu.Item
                name='login'
                as={Link} to={"/"}
                active={activeItem === 'login'}
                onClick={this.handleClick}
                >
                    Login
                </Menu.Item>
                <Menu.Item
                name='search'
                as={Link} to={"/recipes"}
                active={activeItem === 'search'}
                onClick={this.handleClick}
                >
                    <Icon name='search' />Search Recipes
                </Menu.Item>
                
                <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleLogout}
                >
                    Logout
                </Menu.Item>
            </Menu.Menu>
        </Menu>
      </React.Fragment>
    )
  }
}

export default withRouter(connect()(HeaderNav));
