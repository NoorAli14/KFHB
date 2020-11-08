import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Loader from "./Loader";
import { FatcaTemplate } from "./FatcaTemplate";
import { BankingTransaction } from "./bankingTransaction";
import { CRSTemplate } from "./crsTemplate";
import { AMLCheck } from "./amlCheck";
import { RemarksTab } from "./remarks";
import { ScreenShots } from "./screenshots";
class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      addr: [],
      attachments: null,
      imgurl: "",
      isLoading: false,
      isFailed: false,
      opened: false,
      passportImage: null,
      civilIdImageFront: null,
      civilIdImageBack: null,
      selectedImage: "nationalIdFront",
      fatcaTemplate: null,
      bankingTransactionTemplate: null,
      amlCheck: null,
      faceImage: null,
      selectedPassport: "passport",
      screenShotImages: [],
      nationalIdActive:'nationalIdFront',
      passportActive:'passport'
    };
    this.convertTime = this.convertTime.bind(this);
    this.setImageActive = this.setImageActive.bind(this);
    this.setPassportActive = this.setPassportActive.bind(this);
  }

  convertTime(time) {
    var dateStr = time;
    var dateObj = new Date(dateStr);
    var dateFormat = dateObj.toLocaleDateString();
    var timeFormat = dateObj.toLocaleTimeString();

    return dateFormat + " " + timeFormat;
  }

  componentDidUpdate(prevProps, prevState) {
    const self = this;
    if (prevProps.call !== this.props.call) {
      if (
        this.props.call.callStatus === "ANSWERED" ||
        this.props.call.callStatus === "WEB_ANSWERED"
      ) {
        this.setState({
          isLoading: true,
        });
        const token = localStorage.getItem("access-token");
        const tenantId = localStorage.getItem("tenant");
        const channelId = localStorage.getItem("channel");

        let customerId = localStorage.getItem("customerId");
        if (customerId) {
          // customerId='34A8F400-23F0-445F-A20C-5407BDC1C6FC'
          axios
            .get(
              window._env_.RUBIX_BASE_URL +
                `/onboarding/customers/${customerId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": token,
                  "x-channel-id": channelId,
                  "x-tenant-id": tenantId,
                },
              }
            )
            .then((res) => {
              console.log(res);

              const data = res.data?.templates?.map((item) => {
                return { ...item, results: JSON.parse(atob(item.results)) };
              });
              if (data && data.length > 0) {
                this.setState({
                  fatcaTemplate: data.find((x) => x.results.name === "FATCA"),
                  bankingTransactionTemplate: data.find(
                    (x) => x.results.name === "KYC"
                  ),
                });
              }
              const passportId = res.data.documents.find(
                (x) => x.name === "PASSPORT"
              )?.id;
              const civilIdBackId = res.data.documents.find(
                (x) => x.name === "NATIONAL_ID_BACK_SIDE"
              )?.id;
              const civilIdFrontId = res.data.documents.find(
                (x) => x.name === "NATIONAL_ID_FRONT_SIDE"
              )?.id;

              this.setState({
                customer: res.data,
                passportFace:
                  window._env_.RUBIX_BASE_URL +
                  `/onboarding/customers/${customerId}/documents/${passportId}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}&extracted-image=true`,
                passportImage:
                  window._env_.RUBIX_BASE_URL +
                  `/onboarding/customers/${customerId}/documents/${passportId}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`,
                civilIdImageBack:
                  window._env_.RUBIX_BASE_URL +
                  `/onboarding/customers/${customerId}/documents/${civilIdBackId}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`,
                civilIdImageFront:
                  window._env_.RUBIX_BASE_URL +
                  `/onboarding/customers/${customerId}/documents/${civilIdFrontId}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`,
                faceImage:
                  window._env_.RUBIX_BASE_URL +
                  `/onboarding/customers/${customerId}/documents/${civilIdFrontId}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}&extracted-image=true`,
                amlCheck: res.data.amlResponses,
              });
            })
            .catch((error) => {
              console.log(error);
            });

            axios
            .get(
              window._env_.RUBIX_BASE_URL +
                `/onboarding/customers/${customerId}/attachments`,{
                  headers: {
                    "Content-Type": "application/json",
                    "x-access-token":token ,
                    'x-channel-id': channelId,
                    "x-tenant-id":tenantId,
                  },
                }
            )
            .then((res) => {
              console.log(res);
              this.setState({screenShotImages:res.data})
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else if (this.props.call.callStatus === "ENDED") {
        let { opened } = this.state;
        if (opened) {
          this.setState(
            {
              opened: false,
            },
            () => document.getElementById("photos").classList.remove("open")
          );
        }
      } else if (this.props.call.callStatus === "decline_call") {
        let { opened } = this.state;
        if (opened) {
          this.setState(
            {
              opened: false,
            },
            () => document.getElementById("photos").classList.remove("open")
          );
        }
      }
    }
    if (prevProps.screenShotResponse != this.props.screenShotResponse) {
      let { screenShotResponse } = this.props;
      this.setState((state) => {
        return {
          screenShotImages: [...state.screenShotImages, screenShotResponse],
        };
      });
    }
  }
  setImageActive = (image) => {
    this.setState({ selectedImage: image,nationalIdActive:image });
  };
  setPassportActive = (image) => {
    this.setState({ selectedPassport: image,passportActive:image });
  };
  openphoto = (url) => {
    this.setState(
      {
        imgurl: url,
        opened: true,
      },
      () => document.getElementById("photos").classList.add("open")
    );
  };

  close = () => {
    this.setState(
      {
        opened: false,
      },
      () => document.getElementById("photos").classList.remove("open")
    );
  };

  render() {
    let {
      isLoading,
      amlCheck,
      passportFace,
      selectedPassport,
      screenShotImages,
      faceImage,
      fatcaTemplate,
      nationalIdActive,
      passportActive,
      bankingTransactionTemplate,
      customer,
      passportImage,
      civilIdImageBack,
      civilIdImageFront,
      selectedImage,
      customerId
    } = this.state;
    const civilIdBackProcessData =
      customer && customer.documents.length > 0
        ? customer.documents.find((x) => x.name === "NATIONAL_ID_BACK_SIDE")
        : null;
    const civilIdBack = civilIdBackProcessData
      ? JSON.parse(civilIdBackProcessData.processed_data)?.mrz
      : null;
    const passportProcessData =
      customer && customer.documents.length > 0
        ? customer.documents.find((x) => x.name === "PASSPORT")
        : null;
    const passport = passportProcessData
      ? JSON.parse(passportProcessData.processed_data)?.mrz
      : null;

    return (
      <>
        {isLoading && <Loader />}
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div className="customerbasic-details">
            <Tabs>
              <TabList>
                <Tab>ID Card</Tab>
                <Tab>Passport</Tab>
                <Tab>Additional Data</Tab>
                <Tab>FATCA & CRS</Tab>
                <Tab>Banking Transactions</Tab>
                <Tab>AML Check</Tab>
                <Tab>Remarks</Tab>
              </TabList>

              <TabPanel>
                <div className="details">
                  <div className="form-group">
                    <label className="title-label">First Name</label>
                    <span>
                      {civilIdBack && civilIdBack?.Surname
                        ? civilIdBack.Surname
                        : "N/A"}
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="title-label">Full Name</label>
                    <span>
                      {civilIdBack && civilIdBack["Surname And Given Names"]
                        ? civilIdBack["Surname And Given Names"]
                        : "N/A"}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="title-label">Email</label>
                    <span>
                      {civilIdBack && customer?.email ? customer.email : "N/A"}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="title-label">Birth Date</label>
                    <span>
                      {civilIdBack && civilIdBack["Date Of Birth"]
                        ? civilIdBack["Date Of Birth"]
                        : "N/A"}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="title-label">Status</label>
                    <span>
                      {civilIdBackProcessData &&
                      civilIdBackProcessData["status"]
                        ? civilIdBackProcessData["status"]
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <div className="details">
                  <div className="form-group">
                    <label className="title-label">Last Name</label>
                    <span>
                      {civilIdBack && civilIdBack["Given Names"]
                        ? civilIdBack["Given Names"]
                        : "N/A"}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="title-label">Mobile Number</label>
                    <span>
                      {customer?.contact_no ? customer.contact_no : "N/A"}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="title-label">Gender</label>
                    <span>
                      {civilIdBack && civilIdBack?.Sex
                        ? civilIdBack.Sex
                        : "N/A"}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="title-label">Date Of Expiry</label>
                    <span>
                      {civilIdBack && civilIdBack["Date Of Expiry"]
                        ? civilIdBack["Date Of Expiry"]
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <>
                  <div className="details">
                    <div className="form-group">
                      <label className="title-label">First Name</label>
                      <span>
                        {passport && passport["Given Names"]
                          ? passport["Given Names"]
                          : "N/A"}
                      </span>
                    </div>

                    <div className="form-group">
                      <label className="title-label">Full Name</label>
                      <span>
                        {passport && passport["Surname And Given Names"]
                          ? passport["Surname And Given Names"]
                          : "N/A"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label className="title-label">Date Of Birth</label>
                      <span>
                        {passport && passport["Date Of Birth"]
                          ? passport["Date Of Birth"]
                          : "N/A"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label className="title-label">Age</label>
                      <span>
                        {passport && passport["Age"] ? passport["Age"] : "N/A"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label className="title-label">Issuing State</label>
                      <span>
                        {passport && passport["Issuing State Name"]
                          ? passport["Issuing State Name"]
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="details">
                    <div className="form-group">
                      <label className="title-label">Last Name</label>
                      <span>
                        {passport && passport["Surname"]
                          ? passport["Surname"]
                          : "N/A"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label className="title-label">Gender</label>
                      <span>
                        {passport && passport["Sex"] ? passport["Sex"] : "N/A"}
                      </span>
                    </div>

                    <div className="form-group">
                      <label className="title-label">Date of Expiry</label>
                      <span>
                        {passport && passport["Date Of Expiry"]
                          ? passport["Date Of Expiry"]
                          : "N/A"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label className="title-label">Document Number</label>
                      <span>
                        {passport && passport["Document Number"]
                          ? passport["Document Number"]
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </>
              </TabPanel>

              <TabPanel>

              <div className="details" ></div>

              </TabPanel>
              <TabPanel>
              <div className="details" >
              <FatcaTemplate template={fatcaTemplate} />
                <CRSTemplate />

              </div>
               
              </TabPanel>
              <TabPanel><div className="details" >

                <BankingTransaction template={bankingTransactionTemplate} />
              </div>
              </TabPanel>
              <TabPanel>
              <div className="details" >
                <AMLCheck aml={amlCheck} />
              </div>
              </TabPanel>
              <TabPanel>
              <div className="details" >
                <RemarksTab />
              </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="customerbasic-details">
            <Tabs>
              <TabList >
                <Tab>ID Card</Tab>
                <Tab>Passport</Tab>
                <Tab>Additional Data</Tab>
                <Tab>Screen shots</Tab>
              </TabList>

              <TabPanel >
                <div className="details">
                  <div style={{width:'100%', display: 'flex', justifyContent: 'center'}}>
                    <a className={`image-btns ${nationalIdActive==='nationalIdFace'?'active-btn' :''}`}  onClick={()=>this.setImageActive('nationalIdFace')} style={{cursor:'pointer'}} >Face Image</a> &nbsp;&nbsp;
                    <a className={`image-btns ${nationalIdActive==='nationalIdFront'?'active-btn' :''}`}  onClick={()=>this.setImageActive('nationalIdFront')} style={{cursor:'pointer'}}>Front Image</a>&nbsp;&nbsp;
                    <a className={`image-btns ${nationalIdActive==='nationalIdBack'?'active-btn' :''}`}  onClick={()=>this.setImageActive('nationalIdBack')} style={{cursor:'pointer'}}>Back Image</a>
                  </div>
                  <div
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {selectedImage == "nationalIdFace" && (
                      <img
                        style={{ maxHeight: "250px" }}
                        src={faceImage}
                        alt="National Id Face"
                      />
                    )}
                    {selectedImage == "nationalIdFront" && (
                      <img
                        style={{ maxHeight: "250px" }}
                        src={civilIdImageFront}
                        alt="National Id Front"
                      />
                    )}
                    {selectedImage == "nationalIdBack" && (
                      <img
                        style={{ maxHeight: "250px" }}
                        src={civilIdImageBack}
                        alt="National Id Back"
                      />
                    )}
                  </div>
                </div>
              </TabPanel>

              <TabPanel >
                 <div className="details" >
                  <div style={{width:'100%', display: 'flex', justifyContent: 'center'}}>
                      <a className={`image-btns ${passportActive==='passport'?'active-btn' :''}`}  onClick={()=>this.setPassportActive('passport')} style={{cursor:'pointer'}}>Passport</a> &nbsp;&nbsp;
                      <a className={`image-btns ${passportActive==='passportFace'?'active-btn' :''}`}  onClick={()=>this.setPassportActive('passportFace')} style={{cursor:'pointer'}}>Passport Face</a>
                    </div>
                    <div style={{ marginTop:'30px', display: 'flex', justifyContent: 'center'}}>
                    {selectedPassport=='passportFace' && (
                        <img style={{maxHeight:'250px'}} src={passportFace} alt="Passport Face"/>

                    )}
                    {selectedPassport=='passport' && (
                        <img style={{maxHeight:'250px'}} src={passportImage} alt="Passport"/>
                        
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel > <div className="details" ></div></TabPanel>
              <TabPanel >
              <div className="details" >
              <ScreenShots images={screenShotImages} />
              </div>
                
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}

export default CustomerDetails;
