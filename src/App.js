/* eslint-disable import/first */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import './scss/style.scss'
import ResetPassword from './views/pages/passwordReset/resetPassword'
import DefaultLayout from './layout/DefaultLayout'
import Login from './views/pages/login/Login'
import Register from './views/pages/register/Register'
import ForgotPassword from './views/pages/forgotPassword/forgotPassword'
import Test from './views/pages/Upload'



  

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
			<Route
              exact
              path="/signup"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/forgotP"
              name="ForgotPassword Page"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              exact
              path="/resetPassword/:id"
              name="ResetPassword Page"
              render={(props) => <ResetPassword {...props} />}
            />
            <Route exact path="/test" name="upload" render={(props) => <Test {...props} />} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
