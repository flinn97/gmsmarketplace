import React, { Component } from 'react';
import "../../App.css";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage, auth } from '../../firbase.config.js';
import { MapComponent } from '../../mapTech/mapComponentInterface.js';
import toolService from '../../services/toolService.js';
import ViewMedia from '../../componentListNPM/componentForms/media/viewMediaComponent.js';
import ViewMedia2 from '../../componentListNPM/componentForms/media/viewMediaComponent2.js';
import VideoPlayer from '../../componentListNPM/componentForms/media/videoJS.js';
import PayWithStripeButton from './payWithStripeButton.js';
import backarrow from '../../pics/backArrow.webp';
import { Link } from 'react-router-dom';
import StatCard from './statCard.js';


export default class PurchaseItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: this.props.imageList,
    };

  }

  componentDidMount() {
    let obj = this.props.obj;
    let picURL = obj?.getJson().picURL;

    // Create a new array with picURL at the start, followed by the original imageList
    let updatedImageList = [picURL, ...this.state.imageList];

    // Update state with the new array
    this.setState({
      imageList: updatedImageList,
    });

    this.props?.app?.dispatch({
      currentMedia: updatedImageList[0]
    })
  }

  getMimeType(url) {
    const extension = url?.split('?')[0].split('.').pop().toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'mov':
        return 'video/quicktime'; // Correct MIME type for .mov files
      default:
        return 'application/octet-stream'; // Use a generic byte stream type for unknown extensions
    }
  }



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let obj = this.props.obj;

    const { imageList } = this.state;

    let id = toolService.getIdFromURL(true, 0);
    let filter = { search: id, attribute: "_id" }

    //FIX THIS ISAAC / TAYLOR
    let mimeType = this.getMimeType(app.state.currentMedia);
    let isVideo = mimeType ? mimeType.includes('video') : false;

    return (
      <div
        className={window.innerWidth > 700 ? "" : "scroller2"}
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "40px",
          width: window.innerWidth > 700 ? "100%" : "80vw"
        }}>
        {window.innerWidth < 700 &&
          <img filter={filter}
            alt="Loading..."
            src={app.state.currentMedia}
            style={{
              width: "98%", marginTop: "-82px", marginBottom: "-102px",
              maxHeight: "440px",
              minHeight: "440px",
              borderRadius: "11px",
              objectFit: "contain",
            }}></img>
        }

        {window.innerWidth > 700 &&
          <div className="hover-btn-highlight"
            onClick={() => {
              window.history.back();
            }}
            style={{
              ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: styles.colors.color7 + "aa",
              fontWeight: "bold", letterSpacing: ".05rem", padding: "8px 13px", marginTop: "-22px", fontSize: "18px", fontFamily: "inria",
            }}

          >
            <img style={{ width: ".9rem", opacity: "98%", marginRight: ".75rem" }}
              src={backarrow}
            />
            Back
          </div>}

        {/* top row */}
        <div style={{
          display: "flex", flexDirection: "row", width: "100%", textAlign: "center",
          justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center"
        }}>

          {window.innerWidth > 700 &&
            <div style={{ display: "flex", flexDirection: "column", color: "white", width: "40vw", margin: "12px" }}>

              {isVideo ? (
                <div
                  style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', width: "40vw", maxHeight: "440px",
                    minHeight: "440px",
                  }}>
                  {/* Placeholder for video thumbnail */}
                  <VideoPlayer draggable={false}

                    disablePlayButton={this.props.disablePlayButton} options={{
                      autoplay: 'muted', objectFit: "contain",
                      bigPlayButton: true,
                      controls: true,
                      width: "35vw",
                      height: "440px",
                      sources: [{
                        src: app.state.currentMedia, // Assuming mediaItem is the URL
                        type: this.getMimeType(app.state.currentMedia) // Dynamically determine the MIME type
                      }]
                    }} />
                </div>
              ) : (
                <img filter={filter}
                  alt="Loading..."
                  src={app.state.currentMedia}
                  style={{
                    width: "40vw",
                    maxHeight: "440px",
                    minHeight: "440px",
                    borderRadius: "11px",
                    objectFit: "contain",
                  }}
                />
              )}

              {window.innerWidth > 800 &&
                <div style={{ width: "100%", background: styles.colors.color1 + "82", marginTop: "-.4vh" }}>
                  <ViewMedia2 app={app} media={imageList} inputStyle={{ objectFit: "scale-down" }}
                    wrapperStyle={{ objectFit: "scale-down" }} disablePlayButton={true}
                    scale={.7} nToShow={5}
                    labelStyle={{ fontSize: "2.1vh", marginBottom: "1vh" }} />
                </div>}

            </div>}

          <div style={{
            display: "flex", flexDirection: "column",
            padding: "14px", justifyContent: "center", alignContent: "center", width: "100%"
          }}>


            <MapComponent filter={filter}
              name={obj?.getJson().mptype}
              theme={this.props.theme}
              cells={[
                { type: "attribute", name: "title", class: "Main-Title", style: { fontSize: window.innerWidth > 700 ? "" : "1.4rem" } },
                {
                  type: "prepost", name: "price", class: "Main-Price", preText: "$", style: { fontSize: window.innerWidth > 700 ? "" : "1rem" },
                  preStyle: { marginRight: "4px", fontSize: window.innerWidth > 700 ? "1.38rem" : ".85rem", fontFamily: "inria", fontWeight: "200" },
                },
                { type: "richReader", name: "promotional", class: "DP-Attribute-Item Ellipsis", style: { fontSize: window.innerWidth > 700 ? "" : ".69rem", height: "fit-content", marginBottom: window.innerWidth > 700 ? "" : "-102px" } },
              ]
              }
            />


            <div style={{
              display: "flex", flexDirection: "row", width: "100%", justifyContent: "center",
              paddingBottom: window.innerWidth > 700 ? "24px" : "11px", userSelect: "none",
              paddingTop: window.innerWidth > 700 ? "" : "14px"
            }}>

{/* //TAYLOR switch this to >700 */}
              {window.innerWidth < 700 &&
                (<div style={{ background: styles.colors.color1, padding: "10px", border: "1px solid gold" }}>
                  Please open on a larger browser window to learn more and purchase this product</div>
                ) || (
                  <PayWithStripeButton app={app} obj={obj} />
                )
                 }

              {/* <div 
              {/* <div 
              ///remove this
              style={{
                ...styles.buttons.buttonAdd, color: styles.colors.colorWhite, width: "13vw", boxShadow: "0px 4px 6px -6px" + styles.colors.color1,
                justifyItems: "center", textAlign: "center", margin: "5px", borderRadius: "25px",
                background: "linear-gradient( " + styles.colors.color6 + "," + styles.colors.color3 + "88)",
                fontWeight: "bold", fontSize: "1.2rem", border: "2px solid " + styles.colors.color5,
              }} onClick={async () => {

                let json = { ...obj.getJson(), type: "mpItem", owner: state.user.getJson()._id }
                json.date = await serverTimestamp();
                await setDoc(doc(db, "GMSusers", "GMSAPP", "components", json._id), json);
              }}>Admin Test</div> */}

            </div>
          </div>

        </div>
        <div style={{
          width: "90vw",
          marginLeft: "-12px",
          wordWrap: "break-word",
          paddingBottom: "20px",
        }}>
          <MapComponent filter={filter}
            name={obj?.getJson().mptype}
            theme={this.props.theme}
            cells={[
              {
                type: "richReader", name: "description", class: "DP-Attribute-Item Ellipsis",
                style: { fontSize: window.innerWidth > 700 ? "" : ".95rem", maxWidth: window.innerWidth > 700 ? "" : "70vw", }
              },
            ]
            }
          />
        </div>
      </div>
    )
  }
}


