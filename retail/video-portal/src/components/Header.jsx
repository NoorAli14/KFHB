import React from "react";
import { Link } from 'react-router-dom'
import { ReactComponent as Audiocallicon } from '../assets/images/audiocallicon.svg';
import { decryptData } from '../utils'
import "../assets/scss/style.scss";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calling: false,
            dashboard: false,
            customerlist: false,
            reports: false,
            superAdmin: false
        }
        this.addActive = this.addActive.bind(this)
    }
    addActive(tab) {
        this.setState({
            dashboard: false,
            customerlist: false,
            reports: false
        })
        this.setState({
            [tab]: true
        })
    }

    componentDidMount() {
        let location = window.location.href.split('/')[3];
        if (location === "missedcalls") {
            this.setState({
                dashboard: true,
                customerlist: false,
                reports: false
            })
        } else if (location === "calllogs") {
            this.setState({
                dashboard: true,
                customerlist: false,
                reports: false
            })
        } else {
            this.setState({
                dashboard: false,
                customerlist: false,
                reports: false
            })
            this.setState({
                [location]: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.receiveCall !== this.props.receiveCall) {
            if (this.props.receiveCall.callStatus === "CALLING") {
                this.setState({
                    calling: true,
                })
            }
        } else if (prevProps.call !== this.props.call) {
            if (this.props.call.callStatus === "ENDED" || this.props.call.callStatus === "CALL_ENDED" || this.props.call.callStatus === "END_CALL") {
                this.setState({
                    calling: false,
                })
            }
            else if (this.props.call.callStatus === "ANSWERED" || this.props.call.callStatus === "WEB_ANSWERED") {
                this.setState({
                    calling: true,
                })
            }
        } else if (prevProps.receiverAction !== this.props.receiverAction) {
            if (this.props.receiverAction.callingStatus === false) {
                this.setState({
                    calling: false
                });
            }
        }
        else if (prevProps.callAction !== this.props.callAction) {
            if (this.props.callAction.endCallStatus) {
                this.setState({
                    calling: false
                });
            }
        }
    }

    render() {
        let { calling, dashboard, customerlist, reports } = this.state;
        let customerDetails = decryptData(localStorage.getItem('customerDetails'), localStorage.getItem('userId'));
        let role = localStorage.getItem('userRole')

        return (
            <>
                <div className="header">
                   
                    <ul className="navigation" id="navigation">
                       {role ==="agent"? <li className={dashboard?"tab-active":""} onClick={()=>this.addActive("dashboard")}><Link to="/dashboard"  >Dashboard</Link></li>:(role ==="admin"?<li className={reports?"tab-active":""} onClick={()=>this.addActive("reports")}><Link to="/reports" >Reports</Link></li>:<></>)}
                        {/* <li className={customerlist?"tab-active":""} onClick={()=>this.addActive("customerlist")}><Link to="/customerlist" >Customer list</Link></li> */}
                    </ul>
                    <div className="header-right">
                        {calling && <div>
                            <i>
                                <Audiocallicon />
                            </i>
                            Ongoing Call</div>}
                    </div>
                </div>
            </>
        );
    }
}

export default Header;