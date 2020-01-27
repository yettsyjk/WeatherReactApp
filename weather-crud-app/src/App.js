import React, { Component} from 'react';
import LoginRegisterForm from './LoginRegisterForm';
import { Route, Switch } from 'react-router-dom';


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
