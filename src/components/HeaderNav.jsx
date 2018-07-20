import React, { Component } from "react";
import { connect } from 'react-redux';
import {  Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { logoutUser } from '../actions/userActions';
import { backendurl } from '../config';

import { Menu,Icon,Header } from "semantic-ui-react";

class HeaderNav extends Component {
  state = {activeItem: 'login'}

  handleClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = (e, { name }) => {
    console.log("in handleLogout");
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }

    fetch(backendurl+"/logout", options)
        .then(response => response.json())
        .then((data) => {
            this.props.dispatch(logoutUser())
            console.log(data);
        })

    this.setState({ activeItem: name })
    this.props.history.push("/")
    this.setState({ activeItem: "login" })

  }

  render() {
    const { activeItem } = this.state

    return (
      <React.Fragment>  
        <Header as='h1' color="olive"> 
            <Icon name='food' color="orange"/>
            <Header.Content>Get Cooking</Header.Content>
        </Header>
        <Menu size="huge" color="orange" pointing secondary>
            <Menu.Menu position='right'>
                {!this.props.token &&
                <React.Fragment>
                    <Menu.Item
                    name='login'
                    as={Link} to={"/"}
                    active={activeItem === 'login'}
                    onClick={this.handleClick}
                    >
                        Login
                    </Menu.Item>
                </React.Fragment>}
                {this.props.token &&
                <React.Fragment>
                    <Menu.Item
                    name='myrecipes'
                    active={activeItem === 'myrecipes'}
                    onClick={this.handleClick}
                    >
                        My Recipes
                    </Menu.Item>
                </React.Fragment>}
                <Menu.Item
                name='search'
                as={Link} to={"/recipes"}
                active={activeItem === 'search'}
                onClick={this.handleClick}
                >
                    <Icon name='search' />Search Recipes
                </Menu.Item>
                {this.props.token &&
                <React.Fragment>
                    <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={this.handleLogout}
                    >
                        Logout
                    </Menu.Item>
                </React.Fragment>}
            </Menu.Menu>
        </Menu>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        userid: state.authReducer.userid,
        firstname: state.authReducer.firstname,
        lastname: state.authReducer.lastname,
        email: state.authReducer.email,
        token: state.authReducer.token
    }
}

export default withRouter(connect(mapStateToProps)(HeaderNav));
