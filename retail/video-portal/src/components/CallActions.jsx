import React from "react";
import "../assets/scss/style.scss";

class CallActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: false,
      video: false
    }

    this.muteCallHandler = this.muteCallHandler.bind(this);
    this.unmuteCallHandler = this.unmuteCallHandler.bind(this);
    this.endCallHandler = this.endCallHandler.bind(this);
  }

  muteCallHandler(muteType) {
    this.setState({
      [muteType]: !this.state[muteType]
    })
    this.props.muteCallAction(localStorage.getItem("callerSocketId"), localStorage.getItem("type"), muteType)
  }
  unmuteCallHandler(unmuteType) {
    this.setState({
      [unmuteType]: !this.state[unmuteType]
    })
    this.props.unmuteCallAction(localStorage.getItem("callerSocketId"), localStorage.getItem("type"), unmuteType)
  }

  endCallHandler() {
    this.props.ringtoneHandler();
    this.props.requestEndcallPermission("END_CALL");
  }
   
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.call !== this.props.call) {
      if (this.props.call.callStatus === "ENDED" || this.props.call.callStatus === "CALL_ENDED" || this.props.call.callStatus === "END_CALL") {
        this.setState({
          audio: false,
          video: false
        })
      }
    }
  }

  render() {
    const {isLargeScreen,takePicture}=this.props;
    return (
      <>
        <React.Fragment>
        
        <div  className={`videocall-controls-overlay ${isLargeScreen ? "video-bottom" : ""}`} id="videocall-controls-overlay">
          {this.state.audio ?
            <i className="callactions" onClick={() => this.unmuteCallHandler("audio")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74">
                <defs>
                  <filter id="Ellipse_85" x="0" y="0" width="74" height="74" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feFlood flood-opacity="0.122" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g id="Group_556" data-name="Group 556" transform="translate(266 -1180)">
                  <g transform="matrix(1, 0, 0, 1, -266, 1180)" filter="url(#Ellipse_85)">
                    <circle id="Ellipse_85-2" data-name="Ellipse 85" cx="25" cy="25" r="25" transform="translate(12 11)" fill="#b4b4b4" />
                  </g>
                  <g id="mic-24px_1_" data-name="mic-24px (1)" transform="translate(-241 1204)">
                    <path id="Path_2052" data-name="Path 2052" d="M12,14a2.987,2.987,0,0,0,2.99-3L15,5A3,3,0,0,0,9,5v6A3,3,0,0,0,12,14Zm5.3-3A5.189,5.189,0,0,1,12,16.1,5.189,5.189,0,0,1,6.7,11H5a6.984,6.984,0,0,0,6,6.72V21h2V17.72A6.968,6.968,0,0,0,19,11Z" fill="#fff" />
                    <path id="Path_2053" data-name="Path 2053" d="M0,0H24V24H0Z" fill="none" />
                  </g>
                </g>
              </svg>
            </i>
            :
            <i className="callactions" onClick={() => this.muteCallHandler("audio")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74">
                <defs>
                  <filter id="Ellipse_84" x="0" y="0" width="74" height="74" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feFlood floodOpacity="0.122" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g id="Group_552" data-name="Group 552" transform="translate(300 -1284)">
                  <g id="Group_551" data-name="Group 551">
                    <g transform="matrix(1, 0, 0, 1, -300, 1284)" filter="url(#Ellipse_84)">
                      <circle id="Ellipse_84-2" data-name="Ellipse 84" cx="25" cy="25" r="25" transform="translate(12 11)" fill="#fff" />
                    </g>
                    <g id="mic_off-24px" transform="translate(-275 1308)">
                      <path id="Path_2054" data-name="Path 2054" d="M0,0H24V24H0ZM0,0H24V24H0Z" fill="none" />
                      <path id="Path_2055" data-name="Path 2055" d="M19,11H17.3a5.114,5.114,0,0,1-.43,2.05l1.23,1.23A6.585,6.585,0,0,0,19,11Zm-4.02.17c0-.06.02-.11.02-.17V5A3,3,0,0,0,9,5v.18ZM4.27,3,3,4.27l6.01,6.01V11A2.987,2.987,0,0,0,12,14a2.821,2.821,0,0,0,.65-.08l1.66,1.66A5.5,5.5,0,0,1,12,16.1,5.189,5.189,0,0,1,6.7,11H5a6.984,6.984,0,0,0,6,6.72V21h2V17.72a7.013,7.013,0,0,0,2.54-.9L19.73,21,21,19.73Z" fill="#009798" />
                    </g>
                  </g>
                </g>
              </svg>
            </i>
          }
          <i className="callactions" onClick={this.endCallHandler} >
            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74">
              <defs>
                <filter id="Ellipse_2" x="0" y="0" width="74" height="74" filterUnits="userSpaceOnUse">
                  <feOffset dy="1" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodOpacity="0.122" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
                </filter>
              </defs>
              <g id="Group_554" data-name="Group 554" transform="translate(-500 -549)">
                <g transform="matrix(1, 0, 0, 1, 500, 549)" filter="url(#Ellipse_2)">
                  <circle id="Ellipse_2-2" data-name="Ellipse 2" cx="25" cy="25" r="25" transform="translate(12 11)" fill="#ff5b5b" />
                </g>
                <g id="call_end" transform="translate(523 571)">
                  <path id="Path_66" data-name="Path 66" d="M0,0H27.654V27.654H0Z" fill="none" />
                  <path id="Path_67" data-name="Path 67" d="M13.827,9.3a17.181,17.181,0,0,0-5.3.83v3.572a1.161,1.161,0,0,1-.645,1.037,13.264,13.264,0,0,0-3.065,2.132,1.132,1.132,0,0,1-.807.323,1.149,1.149,0,0,1-.818-.334L.334,14.006A1.1,1.1,0,0,1,0,13.2a1.149,1.149,0,0,1,.334-.818,19.607,19.607,0,0,1,26.986,0,1.169,1.169,0,0,1,0,1.636l-2.858,2.858a1.149,1.149,0,0,1-.818.334,1.182,1.182,0,0,1-.807-.323,12.986,12.986,0,0,0-3.077-2.132,1.148,1.148,0,0,1-.645-1.037V10.146A16.726,16.726,0,0,0,13.827,9.3Z" transform="translate(0 1.066)" fill="#fff" />
                </g>
              </g>
            </svg>
          </i>
          {
            this.state.video ?(
             <div>
                <i className="callactions" onClick={() => this.unmuteCallHandler("video")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74">
                <defs>
                  <filter id="Ellipse_18" x="0" y="0" width="74" height="74" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feFlood floodOpacity="0.122" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g id="Group_553" data-name="Group 553" transform="translate(-426 -478)">
                  <g transform="matrix(1, 0, 0, 1, 426, 478)" filter="url(#Ellipse_18)">
                    <circle id="Ellipse_18-2" data-name="Ellipse 18" cx="25" cy="25" r="25" transform="translate(12 11)" fill="#b4b4b4" />
                  </g>
                  <g id="videocam-24px_1_" data-name="videocam-24px (1)" transform="translate(451 502)">
                    <path id="Path_78" data-name="Path 78" d="M0,0H24V24H0Z" fill="none" />
                    <path id="Path_79" data-name="Path 79" d="M17,10.5V7a1,1,0,0,0-1-1H4A1,1,0,0,0,3,7V17a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V13.5l4,4V6.5Z" fill="#fff" />
                  </g>
                </g>
              </svg>
            </i>
             </div>
            )
              :
              <i className="callactions" onClick={() => this.muteCallHandler("video")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74">
                  <defs>
                    <filter id="Ellipse_83" x="0" y="0" width="74" height="74" filterUnits="userSpaceOnUse">
                      <feOffset dy="1" input="SourceAlpha" />
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feFlood floodOpacity="0.122" />
                      <feComposite operator="in" in2="blur" />
                      <feComposite in="SourceGraphic" />
                    </filter>
                  </defs>
                  <g id="Group_550" data-name="Group 550" transform="translate(159 -1330)">
                    <g transform="matrix(1, 0, 0, 1, -159, 1330)" filter="url(#Ellipse_83)">
                      <circle id="Ellipse_83-2" data-name="Ellipse 83" cx="25" cy="25" r="25" transform="translate(12 11)" fill="#fff" />
                    </g>
                    <g id="videocam_off-24px_2_" data-name="videocam_off-24px (2)" transform="translate(-134 1354)">
                      <path id="Path_2050" data-name="Path 2050" d="M0,0H24V24H0ZM0,0H24V24H0Z" fill="none" />
                      <path id="Path_2051" data-name="Path 2051" d="M21,6.5l-4,4V7a1,1,0,0,0-1-1H9.82L21,17.18ZM3.27,2,2,3.27,4.73,6H4A1,1,0,0,0,3,7V17a1,1,0,0,0,1,1H16a.969.969,0,0,0,.54-.18L19.73,21,21,19.73Z" fill="#009798" />
                    </g>
                  </g>
                </svg>
              </i>
          }
        </div>
          {isLargeScreen && (
             <div style={{display: 'flex', width:'100%', justifyContent: 'center'}}>
             <button onClick={()=>takePicture('NATIONAL_ID_FRONT_SIDE_SCREENSHOT')} style={{height:'30px', width:'90px', marginRight:'5px'}}>Civil Id Front</button>
             <button onClick={()=>takePicture('NATIONAL_ID_BACK_SIDE_SCREENSHOT')} style={{height:'30px', width:'90px', marginRight:'5px'}}>Civil Id Back</button>
             <button onClick={()=>takePicture('PASSPORT_SCREENSHOT')}  style={{height:'30px', width:'90px', marginRight:'5px'}}>Passport</button>
             <button onClick={()=>takePicture('ADDRESS_SCREENSHOT')}  style={{height:'30px', width:'90px', marginRight:'5px'}}>Address</button>
             <button onClick={()=>takePicture('VISA_SCREENSHOT')}  style={{height:'30px', width:'90px', marginRight:'5px'}}>Visa Page</button>
           
           </div>
          )}
      
        </React.Fragment>
      </>
    );
  }
}

export default CallActions;