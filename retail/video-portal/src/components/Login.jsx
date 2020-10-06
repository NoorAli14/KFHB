import React from "react";
import Img from "react-image";
import LoginBanner from "../assets/images/login-banner.png"
import { ReactComponent as Logo } from '../assets/images/aionlogo.svg';
import "../assets/scss/style.scss";
import { callbacks, isLogin ,decryptData} from '../utils'
import Loader from "./Loader";
import axios from 'axios';

const SDK = window.SDK;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isEmailEmpty: false,
            isPasswordEmpty: false,
            isPasswordWeak: false,
            isInvalid: false,
            isEmpty: false,
            isFailed: false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        let field = e.target.name;
        this.setState({
            [field]: e.target.value
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let str = this.state.password;
        this.setState({
            isEmailEmpty: false,
            isPasswordEmpty: false,
            isPasswordWeak: false,
            isInvalid: false,
            isEmpty: false,
            isLoading:false
        })

        if (!this.state.email || !this.state.password) {
            this.setState({
                isEmpty: true
            })
        }
        // else if (this.state.password.length <= 7) {
        //     this.setState({
        //         isPasswordEmpty: true
        //     })
        // }

        // else if (!str.match(/[a-z]/g)) {
        //     this.setState({
        //         isPasswordWeak: true
        //     })
        // }
        // else if (!str.match(/[A-Z]/g)) {
        //     this.setState({
        //         isPasswordWeak: true
        //     })
        // }
        // else if (!str.match(/[0-9]/g)) {
        //     this.setState({
        //         isPasswordWeak: true
        //     })
        // }
        // else if (!str.match(/[^a-zA-Z\d]/g)) {
        //     this.setState({
        //         isPasswordWeak: true
        //     })
        // }
        else {
            let self = this;
            // this.props.startUserLogin(this.state.email, this.state.password)
            this.setState({
            isLoading:true
            })
            axios.post(window._env_.REACT_APP_BASE_URL+"/register",{
                "deviceType": "WEB",
                "mobileNumber": self.state.email
              }) 
              .then(res => {
                  if(res.data.status === 200){
                    localStorage.setItem("registerData", res.data.data);
                    let result = decryptData(res.data.data,this.state.email);
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('userId',this.state.email)
                    SDK.initialize(window._env_.REACT_APP_XMPP_HOST, window._env_.REACT_APP_XMPP_PORT, this.state.email, result.webAccessToken, window._env_.REACT_APP_SSL, '123456789', window._env_.REACT_APP_IV, callbacks, window._env_.REACT_APP_BASE_URL)
                    .then(res => {
                        if (res.status === 200) {
                            this.props.history.push("/dashboard");                                            
                        } 
                        else if(res.status === 401){
                            this.setState({
                                isLoading:false,
                                isInvalid:true
                            })
                        }
                        else if(res.status === 500){
                            this.setState({
                                isLoading:false,
                                isFailed:true
                            })
                        }
                        else {
                            console.log(res)
                        }
                    })
                  }
              })
              .catch(error => {
                console.log(error)
              })
           
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.login !== this.props.login){
            if(this.props.login.res.status === 200){
                let self = this;
                axios.post(window._env_.REACT_APP_BASE_URL+"/register",{
                    "deviceType": "WEB",
                    "mobileNumber": self.state.email
                  }) 
                  .then(res => {
                      if(res.data.status === 200){
                        localStorage.setItem("registerData", res.data.data);
                        let result = decryptData(res.data.data,this.state.email);
                        localStorage.setItem('token', result.token);
                        localStorage.setItem('userId',this.state.email)
                        SDK.initialize(window._env_.REACT_APP_XMPP_HOST, window._env_.REACT_APP_XMPP_PORT, this.state.email, result.webAccessToken, window._env_.REACT_APP_SSL, '123456789', window._env_.REACT_APP_IV, callbacks, window._env_.REACT_APP_BASE_URL)
                        .then(res => {
                            if (res.status === 200) {
                                this.props.history.push("/dashboard");                                            
                            } 
                            else if(res.status === 401){
                                this.setState({
                                    isLoading:false,
                                    isInvalid:true
                                })
                            }
                            else if(res.status === 500){
                                this.setState({
                                    isLoading:false,
                                    isFailed:true
                                })
                            }
                            else {
                                console.log(res)
                            }
                        })
                      }
                  })
                  .catch(error => {
                    console.log(error)
                  })
            }else if(this.props.login.res.status === 500){
                this.setState({
                    isLoading:false,
                    isInvalid:true
                })
            }
        }
    }

    componentDidMount(){
        if(isLogin()){
            this.props.history.push('/dashboard')
        }
    }

    render() {
        let {isLoading} = this.state;
        return (
            <>
            {isLoading && <Loader/> }
            <div className="login-container">
                <div className="login-banner">
                    <Img src={LoginBanner} alt="user image" />
                </div>
                <div className="login-right">
                    <div className="login-block">
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="logo">
                                <Logo />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input type="text" name="email" id="email" onChange={this.onChangeHandler} />
                                {this.state.isEmailEmpty ? <span>Please fill the correct username</span> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" id="password" defaultValue={this.state.password} onChange={this.onChangeHandler} />
                                {this.state.isPasswordEmpty ? <span>Password must have more than 7 characters</span> : null}
                                {this.state.isPasswordWeak ? <span>Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric digit, and 1 special character</span> : null}
                            </div>
                            {this.state.isInvalid ? <span>Invalid username/password</span> : null}
                            {this.state.isFailed ? <span>Something Went Wrong.Please try again.</span> : null}
                            {this.state.isEmpty ? <span>Please fill all the fields</span> : null}
                            <button type="submit">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Login;