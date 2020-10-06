import axios from 'axios';


export const userLogin = user => ({
  type: "USER_LOGIN",
  user
});

export const userLogout = value =>({
  type: "USER_LOGOUT",
  value
})

export const startUserLogin = ( email, password ) => {

    let config = {
      headers: {
            'x-trans-id' : "{{$guid}}",
            'Content-Type': 'application/json',
            'x-channel-id' : 'CDT-SIT'
          }
    }
    let data = JSON.stringify({ 
            "ascUser" : {
                   "userName" : email, //"aion_b",
                   "password" : password//"123456"
               }
    })
    return dispatch => {
     
       axios.post(window._env_.REACT_APP_LOGIN_API+'/fs/es/auth/admin/login/1.0', data,config )
      .then(res => {
          if(res.status === 200) {
           if(res.data.response !== undefined){
            localStorage.setItem('access-token',res.headers['x-access-token'])
            dispatch(
              userLogin({
              res
              })
            );
           }else{
             let res = {
               status:500
             }
            dispatch(
              userLogin({
              res
              })
            );
           }
          }
          return res;
      })
      .catch(error => {
        console.log(error)
      }
      ) 
  };
}
