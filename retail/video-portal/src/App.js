import React, { useState } from 'react';
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import AppRouter from "./router";
import { callbacks, decryptData, encryptData, removeLocalStorage } from './utils';
import { callRinging } from './actions/makeCall';
import Loader from './components/Loader';
import queryString from 'query-string';
import axios from 'axios';
const createHistory = require("history").createBrowserHistory;
export const history = createHistory();


const SDK = window.SDK;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      xid: null,
      userRole:''
    }
    this.validateToken = this.validateToken.bind(this);
    this.reInitialize = this.reInitialize.bind(this);
  }
  componentDidMount() {

    const values = queryString.parse(window.location.search);
    const token = values.token;
    const xid = values.id;

    if (window.location.pathname === "/login" ){
      if(token !== undefined || xid !== undefined) {
        window.addEventListener("DOMContentLoaded", () => {
          removeLocalStorage('token',
              'access-token',
              'userId',
              'callResponse',
              "registerData",
              "customerDetails",
              "id")
          this.validateToken()
        });
      }else{
        removeLocalStorage('token',
              'access-token',
              'userId',
              'actionType',
              'callStatus',
              'callerSocketId',
              'callerName',
              'type',
              'callResponse',
              "registerData",
              "customerDetails",
              "id")
        window.location.replace('/loginfailed')
      }
    }  else if (localStorage.getItem('token') !== null && localStorage.getItem("registerData") !== null) {
      window.addEventListener("DOMContentLoaded", () => {
        console.log("re initializing")
        this.reInitialize();
      });
    }
    if (localStorage.getItem('actionType') === "RECEIVE_CALL") {
      window.addEventListener("DOMContentLoaded", () => {
        removeLocalStorage("actionType", "incomingCallDetails")
      });
    }

    setInterval(function () {
      if (localStorage.getItem('callStatus') === 'ON_GOING') {
        console.log("Im busy");
        return
      } else {
        console.log("Im free");
        SDK.updateBusyStatus()
      }
    }, 60000);

  }
  findPermission(modules, id) {
    let role=''
    modules.forEach((element) => {
        const video= element.permissions.find(x=>x.record_type==='attend');
        if(video){
          this.setState({userRole:'agent'}) ;
          return;
        }
        if (!element.sub_modules) { return; }
        this.findPermission(element.sub_modules, id);
        
    });
   
}
  validateToken() {
    const query = queryString.parse(window.location.search);
    let config = {
      headers: {
        'x-access-token': query.token,
        'Content-Type': 'application/json',
        'x-channel-id': query.channelid,
        "x-tenant-id": query.tenantid,
      },
    }
    let data = {}
    this.setState({
      isLoading: true
    })
    axios.get(window._env_.RUBIX_BASE_URL + "/entitlements/auth/me", config)
      .then(res => {
        if (res.data !== undefined) {
          let userName = res.data.first_name + '' + res.data.last_name
          let encryptdata = encryptData(res.data, userName);
          this.findPermission(res.data.modules);
          let  role= this.state.userRole;
          role = role ? role : 'admin';
          localStorage.setItem('userRole',role)

          localStorage.setItem('customerDetails', encryptdata)
          localStorage.setItem('channel', query.channelid)
          localStorage.setItem('tenant', query.tenantid)
          localStorage.setItem('access-token', query.token)
          localStorage.setItem('id',  res.data.id)
          localStorage.setItem('userId',  userName)
          let userType = 1;
          if (role === "admin") {
            userType = 0;
          } else if (role === "agent") {
            userType = 1;
          }
          
          axios.post(window._env_.REACT_APP_BASE_URL + "/register", {
            "deviceType": "WEB",
            "mobileNumber":userName,
            "userType": userType,
            "name": userName
          })
            .then(res => {
              if (res.data.status === 200) {
                localStorage.setItem("registerData", res.data.data);
                let result = decryptData(res.data.data, userName);
                localStorage.setItem('token', result.token);
                SDK.initialize(window._env_.REACT_APP_XMPP_HOST, window._env_.REACT_APP_XMPP_PORT, userName, result.webAccessToken, window._env_.REACT_APP_SSL, '123456789', window._env_.REACT_APP_IV, callbacks, window._env_.REACT_APP_BASE_URL)
                  .then(res => {
                    if (res.status === 200) {

                      this.setState({
                        isLoading: false,
                        isTokenValidated: true
                      }, () => {
                        if (role === "agent") {
                          window.location.replace('/dashboard')
                        } else if (role === "admin") {
                          window.location.replace('/reports')
                        }
                      })
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else if (res.data.exception !== undefined) {
          this.setState({
            isTokenValidated: false,
            isLoading: false
          }, () =>
             {
              console.log(res);
             }
          )
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  reInitialize() {

    this.setState({
      isLoading: true
    })
    let userId = localStorage.getItem('userId')

    let data = localStorage.getItem("registerData");
    let result = decryptData(data, userId);
    SDK.initialize(window._env_.REACT_APP_XMPP_HOST, window._env_.REACT_APP_XMPP_PORT, userId, result.webAccessToken, window._env_.REACT_APP_SSL, '123456789', window._env_.REACT_APP_IV, callbacks, window._env_.REACT_APP_BASE_URL)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isLoading: false
          })
          console.log("re initialized")
          if (localStorage.getItem('actionType') === "RECEIVE_CALL" && localStorage.getItem('callStatus') !== "ON_GOING") {
            // SDK.AVCallInitialize(window._env_.REACT_APP_SIGNAL_SERVER, "INCOMING");SDK.AVCallInitialize(window._env_.REACT_APP_SIGNAL_SERVER, "INCOMING");
            // store.dispatch(callRinging(JSON.parse(localStorage.getItem('callResponse'))));

          }
        }
        else if (res.status === 401) {
          console.log("connection retry failed")
          this.setState({
            isLoading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          isTokenValidated: false,
          isLoading: false
        }, () => {
          removeLocalStorage('token',
            'incomingCallDetails',
            'access-token',
            'userId',
            'actionType',
            'callStatus',
            'callerSocketId',
            'callerName',
            'type',
            'callResponse',
            "registerData")
          window.location.replace('/loginfailed');
        }
        )
      })
  }


  render() {
    let { isLoading } = this.state;
    return (
      <>
      <canvas id="canvas"></canvas>
        {isLoading && <Loader />}
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </>
    )
  }
}





export default App;
