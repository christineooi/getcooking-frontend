import React, { Component } from 'react';
import { Container,Header, Button, Form, Divider, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { backendurl } from '../config';
import { loginUser } from '../actions/userActions';

class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPwd: "",
          loginEmail: "",
          loginPwd: "",
          loginSuccess: false
        };
    }
    handleChange = field => e => {
        this.setState({ [field]: e.target.value });
      };

    handleLoginSubmit = e => {
        e.preventDefault();
        const postOptions = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: this.state.loginEmail,
              password: this.state.loginPwd
            })
        };
        fetch(backendurl+"/login", postOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.auth) {
                this.props.dispatch(loginUser(data));
                console.log(data);
                this.props.history.push("/userrecipes")        
            } else {
                alert("Login Unsuccessful")    
            }
        })
        .catch(err=> console.log(err))
    };

    handleRegisterSubmit = e => {
        e.preventDefault();
        console.log("Inside handle register")
        const postOptions = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            })
        };
        fetch(backendurl+"/register", postOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                this.setState({ firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPwd: "",
                loginSuccess: true
            })}
        })
        .then(alert("Successful Registration! Please login"))
        .catch(e => {
            console.log(e);
        });
    };

    render() {
        return (
          <React.Fragment>
            <div id="containerDiv">
                <Container text>
                    <Segment textAlign='center' inverted color="olive">
                        <Header >Already a Member? Login Here</Header>
                    </Segment>
                    <Form onSubmit={this.handleLoginSubmit}> 
                        <Form.Field>
                            <Form.Input
                            onChange={this.handleChange("loginEmail")}
                            fluid
                            label="Email"
                            type="email"
                            placeholder="Email"
                            required
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                            onChange={this.handleChange("loginPwd")}
                            fluid
                            label="Password"
                            type="password"
                            placeholder="Password"
                            required
                            />
                        </Form.Field>
                        <Button color="teal" type="submit">
                            Login
                        </Button>
                        </Form>
                </Container>
                <Divider> </Divider>
                <Container text>
                    <Segment textAlign='center' inverted color="orange">
                        <Header >New to Get Cooking? Register Here</Header>
                    </Segment>
                    <Form onSubmit={this.handleRegisterSubmit}>
                    <Form.Field>
                        <Form.Input
                        onChange={this.handleChange("firstname")}
                        fluid
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstname}
                        required
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                        onChange={this.handleChange("lastname")}
                        fluid
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastname}
                        required
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                        onChange={this.handleChange("email")}
                        fluid
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={this.state.email}
                        required
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                        onChange={this.handleChange("password")}
                        fluid
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        required
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                        onChange={this.handleChange("confirmPwd")}
                        fluid
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.confirmPwd}
                        required
                        />
                    </Form.Field>
                    <Button color="teal" type="submit">
                        Register
                    </Button>
                    </Form>
                </Container>
            </div>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
        userState: state.userState
    }
  }

export default withRouter(connect(mapStateToProps)(LoginRegister));