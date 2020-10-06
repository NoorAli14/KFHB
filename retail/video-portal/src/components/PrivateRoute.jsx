import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLogin } from '../utils'
import Header from "./Header";
import VideoComponent from '../containers/VideoComponent';
import Callpopup from '../containers/Callpopup'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // auth.isAuthenticated === true 
      isLogin()
        ?
        (
          <>
            <Header />
            {/* <Sidebar/> */}
            <VideoComponent />
            <Callpopup history={props.history} />
            <Component {...props} />
          </>)
        :
        (<Redirect to="/loginfailed" />)
    }
  />
);


const mapStateToProps = state => ({
  auth: {
    isAuthenticated: false
  }
});

export default connect(mapStateToProps)(PrivateRoute);