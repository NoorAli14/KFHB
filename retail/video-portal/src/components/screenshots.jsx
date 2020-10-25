import React from "react";

export class ScreenShots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPath: "",
      selectBtn:'NATIONAL_ID_SCREENSHOT'
    };
  }
  componentDidMount() {
    this.setActive('NATIONAL_ID_SCREENSHOT')
  }

  setActive = (type) => {
    this.setState({selectBtn:type,selectedPath:null})
    const selected = this.props.images.find((x) => x.attachment_id === type);
    if (selected) {
      const path = this.getImageUrl(selected);
      this.setState({selectedPath:path})
    }
  };
  getImageUrl = (item) => {
    const token = localStorage.getItem("access-token");
    const tenantId = localStorage.getItem("tenant");
    const channelId = localStorage.getItem("channel");
    let customerId = localStorage.getItem("customerId");
    return (
      window._env_.RUBIX_BASE_URL +
      `/onboarding/customers/${customerId}/attachments/${item.id}?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`
    );
  };
  render() {
    const { selectedPath,selectBtn } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <div className="details">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
             className={`image-btns ${selectBtn==='NATIONAL_ID_SCREENSHOT'?'active-btn' :''}`}

              onClick={() => this.setActive("NATIONAL_ID_SCREENSHOT")}
            >
              Civil Id
            </a>{" "}
            &nbsp;&nbsp;
            <a
            className={`image-btns ${selectBtn==='PASSPORT_SCREENSHOT'?'active-btn' :''}`}
              onClick={() => this.setActive("PASSPORT_SCREENSHOT")}
            >
              Passport
            </a>
            &nbsp;&nbsp;
            <a
            className={`image-btns ${selectBtn==='ADDRESS_SCREENSHOT'?'active-btn' :''}`}
              onClick={() => this.setActive("ADDRESS_SCREENSHOT")}
            >
              Address
            </a>
            &nbsp;&nbsp;
            <a
             className={`image-btns ${selectBtn==='VISA_SCREENSHOT'?'active-btn' :''}`}
              onClick={() => this.setActive("VISA_SCREENSHOT")}
            >
              Visa
            </a>
          </div>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img style={{ maxHeight: "250px" }} src={selectedPath} />
          </div>
        </div>
      </div>
    );
  }
}
