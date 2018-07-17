import React, { Component } from 'react';
import { Container,Header, Icon, Button, Form } from 'semantic-ui-react';

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
    };

    handleRegisterSubmit = e => {
        e.preventDefault();
    };

    render() {
        return (
          <React.Fragment>
            <Container text>
                <Header as='h2' color="olive"> 
                    <Icon name='food' color="orange"/>
                    <Header.Content>Get Cooking</Header.Content>
                </Header>
                <Container text>
                    <Segment color="teal">
                        <Header >Already a Member? Login</Header>
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
                            Submit
                        </Button>
                        </Form>
                </Container>
                <Divider horizontal>OR</Divider>
                <Container text>
                    <Segment color="teal">
                        <Header >New to Get Cooking? Register here!</Header>
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
                        Submit
                    </Button>
                    </Form>
                </Container>
                <br />
            </Container>
          </React.Fragment>
        );
    }
}
