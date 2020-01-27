import React, { Component } from 'react'

class LoginRegisteForm extends Component {
    constructor(){
        state()
        this.state = {
            email: '',
            password: '',
            username: '',
            action: 'login'
        }
    }
    login = async(loginInfo) => {
       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, {
        method: 'POST', 
        credentials: 'include',
        body: JSON.stringify(loginInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const parsedLoginResponse = await response.json()

    if(parsedLoginResponse.status.code === 200) {
        this.props.loggedStatus(parsedLoginResponse.data.email)
    } else {
        console.log('Login Failed: ', parsedLoginResponse);
        }
    }

    register = async (registerInfo) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(registerinfo),
            headers: {
                'Content-Type': 'application/json'
            }
    })
        const parsedRegisterResponse = await response.json();
        if(parsedRegisterResponse.status.code === 200) {

            this.props.loggedStatus(parsedRegisterResponse.data.email)

            this.props.history.push('/cities');
        } else {
            console.log('register Failed: ', parsedRegisterResponse);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.loginRegister()
    }
    swicthForm = () => {
        if (this.state.action === "login") {
            this.setState({
                action: 'register'
            })
        } else {
            this.setState({
                action: 'login'
            })
        }
    }

render() {
    return (
        <div className="LoginRegisterForm">
            { !this.props.loggedIn ?
            <Grid textAlign='center' style={{ height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450}}>
                    <Form size='large' onSubmit={}>
                        <Segment stacked>
                            {this.state.action === "register" ?
                            <React.Fragment>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition='left'
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </React.Fragment>:
                            null
                            }
                            <Form.Input
                            fluid
                            icon="mail"
                            iconPosition='left'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            />
                            <Form.Input
                            fluid
                            icon="lock"
                            iconPosition='left'
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            />
                            <Button fluid size='large' type="Submit">
                                {this.state.action === "register" ? "Register" : "Log In"}
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        { this.state.action === "register" ? 
                        <small>Already have an account? Log In <span onClick={this.switchForm}> here </span>.</small>
                       :
                       <small>Need a free account? Sign up<span onClick={this.swicthForm}>here</span>!</small> 
                    }
                    </Message>
                </Grid.Column>
            </Grid>
            :
            <div></div>}
        </div>
        )
    }  
}
export default LoginRegisteForm