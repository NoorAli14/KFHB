import React from "react";
import "../assets/scss/style.scss";
import "react-tabs/style/react-tabs.css";
import { Link } from 'react-router-dom';
import { ReactComponent as Norecords } from '../assets/images/norecord.svg';

class LogTable extends React.Component {
    constructor(props) {
        super(props);
        this.getCallDate = this.getCallDate.bind(this);
        this.getDuration = this.getDuration.bind(this);
    }
    getCallDate(date) {
        let dateStr = date;
        let dateObj = new Date(dateStr);
        let dateFormat = dateObj.toLocaleDateString();
        let timeFormat = ''

        let hour = dateObj.getHours()
        let minute = dateObj.getMinutes()

        let date1 = new Date(); // UTC
        let localHour = hour - date1.getTimezoneOffset() / 60;
        let localMinute = (localHour % 1) * 60;

        localHour = Math.floor(localHour);
        localMinute += parseInt(minute);
        if (localMinute >= 60) {
            localHour += Math.floor(localMinute / 60);
            localMinute %= 60;
        }

        localHour %= 24;
        timeFormat = (localHour <= 9 ? "0" + localHour : localHour).toString() + ":" + (localMinute <= 9 ? "0" + localMinute : localMinute).toString()

        return (timeFormat);
    }

    getDuration(time) {
        var ms = time;
        let min = Math.floor((ms / 1000 / 60) << 0);
        let seconds = Math.floor((ms / 1000) % 60);
        return ((min <= 9 ? "0" + min : min) + ":" + (seconds <= 9 ? "0" + seconds : seconds))
    }
    render() {
        return (
            <>
                <div className="dash-grid-container">

                    <div className="dash-grid missedcalls-grid">

                        <div>
                            <h3>Missed calls</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Customer Name
                                        </th>
                                        <th>
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                {this.props.missedcallCount <= 0 ?
                                    <tbody>
                                        <tr className="no-record" >
                                            <td colSpan="2">
                                                <Norecords />
                                                <p>No records found</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                    :
                                    <tbody>
                                        {this.props.missedcallLog.map((log, index) => {
                                            return <tr key={index}>
                                                <td>{log.fromUser}</td>
                                                <td>{this.getCallDate(log.createdAt)}</td>
                                            </tr>
                                        })}
                                    </tbody>}
                            </table>
                            {this.props.totalMissedCall <= 10 ?
                                <></>
                                : <Link to="/missedcalls">See more</Link>
                            }
                        </div>
                    </div>
                    <div className="dash-grid calllogs-grid">
                        <h3>Call logs</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Customer Name
                                        </th>
                                    <th>
                                        Time
                                        </th>
                                    <th>
                                        Duration
                                        </th>
                                </tr>
                            </thead>
                            {this.props.callCount <= 0 ?
                                <tbody>
                                    <tr className="no-record" >
                                        <td colSpan="3">
                                            <Norecords />
                                            <p>No records found</p>
                                        </td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    {this.props.callLog.map((log, index) => {

                                        return <tr key={index}>
                                            <td>{log.fromUser}</td>
                                            <td>{this.getCallDate(log.createdAt)}</td>
                                            <td>{this.getDuration(log.duration)}</td>
                                        </tr>
                                    })}
                                </tbody>
                            }
                        </table>
                        {this.props.totalCall <= 10 ?
                            <></>
                            : <Link to="/calllogs">See more</Link>
                        }
                    </div>
                </div>
            </>
        )
    }
}


export default LogTable