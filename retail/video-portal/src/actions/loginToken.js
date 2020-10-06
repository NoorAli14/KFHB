import axios from 'axios';
import {encryptData} from '../utils'


export const loginToken = result => ({
  type: "LOGIN_TOKEN",
  result
});

export const getLoginToken = (username, password ) => {
    let encryptedPassword = encryptData(password,localStorage.getItem('userId'))
    return dispatch => {
     
       axios.post(window._env_.REACT_APP_BASE_URL+"/login",{
                "accessToken":  encryptedPassword,
                "type": "WEB",
                "username": username
          })
      .then(res => {
          if(res.data.status === 200){
              localStorage.setItem("token",res.data.data.token);
          }
          dispatch(
                loginToken({
                res
            })
            );
      })
      .catch(error => {
        console.log(error)
      }
      ) 
  };
}
