import React from "react";
import axios from "axios";
import CallActions from "../containers/CallActions";
import {
  setMakeCallStatus,
  getMakeCallStatus,
  removeLocalStorage,
} from "../utils";
import CallReceiveTone from "../assets/ringtones/call-receive.mp3";
import RingTone from "./RingTone";
import CustomerDetails from "../containers/CustomerDetails";
import { showError, showSuccess, showWarning } from "../shared/helper";
const SDK = window.SDK;

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewElementStatus: "",
      ringStatus: false,
      videoMuted: false,
      audioMuted: false,
      isLargeScreen: true,
      screenShotResponse: null,
    };
    this.ringtoneMuteHandler = this.ringtoneMuteHandler.bind(this);
    this.downloadURI = this.downloadURI.bind(this);
    this.takePictureHandler = this.takePictureHandler.bind(this);
    this.fullscreen = this.fullscreen.bind(this);
    this.smallscreen = this.smallscreen.bind(this);
  }

  fullscreen() {
    this.setState({ isLargeScreen: false });
    document.getElementById("video-popup").classList.add("collaps");
  }
  smallscreen() {
    this.setState({ isLargeScreen: true });
    document.getElementById("video-popup").classList.remove("collaps");
  }

  componentDidUpdate(prevProps, prevState) {
    const self = this;
    if (prevProps.call !== this.props.call) {
      if (this.props.call.callStatus === "INITIALISED") {
        let elt = document.getElementById("video-popup");
        elt.style.backgroundColor = "#fff";
        elt.style.visibility = "visible";
        let videoControlEle = document.getElementById(
          "videocall-controls-overlay"
        );
        videoControlEle.style.visibility = "visible";
        this.setState({ previewElementStatus: true, ringStatus: true });
        if (localStorage.getItem("actionType") === "MAKE_CALL") {
          SDK.makeAVCall(
            localStorage.getItem("callerSocketId"),
            localStorage.getItem("callType"),
            "web"
          );
          setTimeout(function () {
            if (getMakeCallStatus() === "INITIALISED") {
              self.props.endCallAction(
                localStorage.getItem("type"),
                localStorage.getItem("callerSocketId"),
                localStorage.getItem("callId")
              );
            }
          }, 60000);
          removeLocalStorage("actionType", "callType");
        }
      } else if (
        this.props.call.callStatus === "ANSWERED" ||
        this.props.call.callStatus === "WEB_ANSWERED"
      ) {
        this.setState({ previewElementStatus: false, ringStatus: false });
        setMakeCallStatus("ANSWERED");
      } else if (
        this.props.call.callStatus === "ENDED" ||
        this.props.call.callStatus === "CALL_ENDED" ||
        this.props.call.callStatus === "END_CALL"
      ) {
        let elt = document.getElementById("video-popup");
        let videoControlEle = document.getElementById(
          "videocall-controls-overlay"
        );
        elt.style.visibility = "hidden";
        videoControlEle.style.visibility = "hidden";
        document.getElementById("video-popup").classList.remove("collaps");
        this.setState({
          previewElementStatus: false,
          ringStatus: false,
          videoMuted: false,
          audioMuted: false,
        });
      } else if (this.props.call.callStatus === "decline_call") {
        if (localStorage.getItem("callId") == this.props.call.callId) {
          localStorage.removeItem("callId");
          console.log("Im free");
          SDK.updateBusyStatus();
          let elt = document.getElementById("video-popup");
          let videoControlEle = document.getElementById(
            "videocall-controls-overlay"
          );
          elt.style.visibility = "hidden";
          videoControlEle.style.visibility = "hidden";
          document.getElementById("video-popup").classList.remove("collaps");

          this.setState({
            previewElementStatus: false,
            ringStatus: false,
            videoMuted: false,
            audioMuted: false,
          });
        }
      } else if (this.props.call.callStatus === "BUSY") {
        let elt = document.getElementById("video-popup");
        let videoControlEle = document.getElementById(
          "videocall-controls-overlay"
        );
        elt.style.visibility = "hidden";
        videoControlEle.style.visibility = "hidden";
        this.setState({ previewElementStatus: false, ringStatus: false });
      } else if (this.props.call.callStatus === "CALL_ATTENDED_ALREADY") {
        let elt = document.getElementById("video-popup");
        let videoControlEle = document.getElementById(
          "videocall-controls-overlay"
        );
        elt.style.visibility = "hidden";
        videoControlEle.style.visibility = "hidden";
        document.getElementById("video-popup").classList.remove("collaps");
        this.setState({
          previewElementStatus: false,
          ringStatus: false,
          videoMuted: false,
          audioMuted: false,
        });
      }
    }
    if (prevProps.callMuted !== this.props.callMuted) {
      if (this.props.callMuted.muteType === "VIDEO_MUTE") {
        this.setState({
          videoMuted: this.props.callMuted.muteStatus,
        });
      } else if (this.props.callMuted.muteType === "AUDIO_MUTE") {
        this.setState({
          audioMuted: this.props.callMuted.muteStatus,
        });
      }
    }
  }

  ringtoneMuteHandler() {
    this.setState({ ringStatus: false });
  }
  downloadURI(uri, name) {
    var link = document.createElement("a");
    link.href = uri;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  takePictureHandler(value) {
    let video = document.getElementById("videoOutput");
    let canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL("image/png");
    if (data.length < 10) {
      showWarning(
        "Call has not established yet to capture the screeshot. Please check your internet and try again later!"
      );
      return;
    }
    const base64 = data.replace(/^data:image.+;base64,/, "");
    // this.downloadURI(data, value);
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.saveScreenShot(value,base64);
  }
  saveScreenShot(type,base64) {
    const token = localStorage.getItem("access-token");
    const tenantId = localStorage.getItem("tenant");
    const channelId = localStorage.getItem("channel");
    let customerId = localStorage.getItem("customerId");

    axios
      .post(
        window._env_.RUBIX_BASE_URL +
          `/onboarding/customers/${customerId}/attachments`,
        {
          file_content: base64,
          attachment_type:type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
            "x-channel-id": channelId,
            "x-tenant-id": tenantId,
          },
        }
      )

      .then((response) => {
        this.setState({screenShotResponse:response.data})
        showSuccess("Screen shot saved successfully!");
      })
      .catch((error) => {
        console.log(error);
        showError("We are unable to process the request!");
      });
  }
  render() {
    let style = {
      position: "absolute",
      color: "whitesmoke",
    };
    
    let {
      previewElementStatus,
      isLargeScreen,
      ringStatus,
      videoMuted,
      audioMuted,
      screenShotResponse
    } = this.state;

    return (
      <>
        {ringStatus && <RingTone audioSrc={CallReceiveTone} />}
        <div id="video-popup" className="customer-video-popup">
          <div id="root-video" className="root-video">
            <div id="videoBig" className="remoteVideosContainer">
              {previewElementStatus && (
                <div id="previewimg" className="previewimg">
                  <img src="video-call-avator.png" alt="" />
                </div>
              )}
              <video
                id="videoOutput"
                muted="muted"
                autoPlay
                playsInline
              ></video>
              <i className="expand-collaps">
                <svg
                  className="smallscreen"
                  onClick={this.smallscreen}
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 298.667 298.667"
                  width="18px"
                  height="18px"
                >
                  <g>
                    <g>
                      <g>
                        <g>
                          <polygon
                            points="42.667,192 0,192 0,298.667 106.667,298.667 106.667,256 42.667,256    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                          <polygon
                            points="0,106.667 42.667,106.667 42.667,42.667 106.667,42.667 106.667,0 0,0    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                          <polygon
                            points="192,0 192,42.667 256,42.667 256,106.667 298.667,106.667 298.667,0    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                          <polygon
                            points="256,256 192,256 192,298.667 298.667,298.667 298.667,192 256,192    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                    </g>
                  </g>{" "}
                </svg>
                <svg
                  className="fullscreen"
                  onClick={this.fullscreen}
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 298.667 298.667"
                  width="18px"
                  height="18px"
                >
                  <g>
                    <g>
                      <g>
                        <g>
                          <polygon
                            points="0,234.667 64,234.667 64,298.667 106.667,298.667 106.667,192 0,192    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                          <polygon
                            points="64,64 0,64 0,106.667 106.667,106.667 106.667,0 64,0    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                          <polygon
                            points="234.667,64 234.667,0 192,0 192,106.667 298.667,106.667 298.667,64    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                          <polygon
                            points="192,298.667 234.667,298.667 234.667,234.667 298.667,234.667 298.667,192 192,192    "
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                    </g>
                  </g>{" "}
                </svg>
              </i>
            </div>
            <div id="videoSmall" className="localvideo-container">
              <video id="videoInput" muted="muted" autoPlay playsInline></video>
            </div>
            {videoMuted ? (
              audioMuted ? (
                <p className="muted-text" style={style}>
                  Video and Audio Disabled
                </p>
              ) : (
                <p className="muted-text" style={style}>
                  Video Disabled
                </p>
              )
            ) : audioMuted ? (
              <p className="muted-text" style={style}>
                Audio Disabled
              </p>
            ) : (
              <></>
            )}
            <CallActions
              takePicture={this.takePictureHandler}
              isLargeScreen={isLargeScreen}
              ringtoneHandler={this.ringtoneMuteHandler}
            />
          </div>
          <CustomerDetails screenShotResponse={screenShotResponse} />
        </div>
      </>
    );
  }
}

export default VideoComponent;
