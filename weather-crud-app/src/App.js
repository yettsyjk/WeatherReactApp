import React, { Component} from 'react';
import { Route, Switch } from 'react-router-dom';


import LoginRegisterForm from './LoginRegisterForm';



const My404 = () => {
  return (
    <div>
      You are Lost
    </div>
  )
};
class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false,
      loggedInUserEmail: null
    }
  }

  handleLoggedInStatus = (loggedInUserEmail) => {
    this.setState({
      loggedIn: true,
      loggedInUserEmail: loggedInUserEmail
    })
  }

  logout = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
  })
   
  const parsedLogoutResponse = await response.json();

  if(parsedLogoutResponse.status.code === 200){
    this.setState({
      loggedIn: false,
      loggedInUserEmail: ''
    })
  } else {
    console.log('Register Failed: ', parsedLogoutResponse);
  }
  }

  render (){
    return(
    <main>
      
      <Route exact path="/" render={(props) =>  <LoginRegisterForm {...props} loggedIn={this.state.loggedIn} loggedStatus={this.handleLoggedInStatus} /> } />
      <Route component={ My404 } />
    </main>
    )
  }
}

export default App;
