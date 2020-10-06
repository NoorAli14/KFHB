import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Login from "../containers/Login";
import CustomerList from "../containers/CustomerList";
import Dashboard from "../containers/Dashboard";
import PrivateRoute from '../components/PrivateRoute';
import NetworkAlert from "../components/NetworkAlert";
import CameraAlert from "../containers/CameraAlert";
import { LastLocationProvider } from 'react-router-last-location';
import EndCallAlert from "../containers/EndCallAlert";
import Reports from "../containers/Reports";
import MissedCallLog from "../containers/MissedCallLog";
import CallLog from "../containers/CallLog";
import LoginFailed from "../components/LoginFailed";
import NotFound from "../components/NotFound";
import EndedCallAlert from "../containers/EndedCallAlert";
import VideoNotFoundAlert from "../containers/VideoNotFoundAlert";

const createHistory = require("history").createBrowserHistory;
export const history = createHistory();
// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
const AppRouter = () => {
  return(
  <Router history={history}>
    <LastLocationProvider>
    <div>
      <NetworkAlert />
      <CameraAlert />
      <EndCallAlert/>
      <EndedCallAlert/>
      <VideoNotFoundAlert />
      <Switch>
      {/* <Route exact path="/" component={Login} /> */}
        {/* <PrivateRoute path="/Videocall" component={VideoCall} /> */}
        <Route exact path="/loginfailed" component={LoginFailed} /> 
        <PrivateRoute exact path="/" component={Dashboard} history={history} />
        <PrivateRoute path="/dashboard" component={Dashboard} history={history} />
        <PrivateRoute path="/customerlist" component={CustomerList} history={history} />
        <PrivateRoute path="/reports" component={Reports} history={history} />
        <PrivateRoute path="/missedcalls" component={MissedCallLog} history={history} />
        <PrivateRoute path="/calllogs" component={CallLog} history={history} />
        <Route path="/login"/>
        <Route component={NotFound}/>
      </Switch>
    </div>
    </LastLocationProvider>
  </Router>
)};

export default AppRouter;
