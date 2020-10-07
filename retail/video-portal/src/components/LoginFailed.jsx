import React from 'react';



class LoginFailed extends React.Component {

    render() {
        return (
            <div className="loginfailed-text">
                {/* <p>Sorry, you are not authorized to access this section of the application. Please contact the system administrator.</p> */}
                <p>User unauthorised to access customer profiles or video calls.</p>
            </div>
        )
    }
}

export default LoginFailed;