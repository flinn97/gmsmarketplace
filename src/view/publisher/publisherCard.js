import React, { Component } from 'react';
import "../../App.css";

import { MapComponent } from '../../mapTech/mapComponentInterface';
import auth from '../../services/auth';
import VideoPlayer from '../../componentListNPM/componentForms/media/videoJS';
import ViewMedia2 from '../../componentListNPM/componentForms/media/viewMediaComponent2';
import { Link } from 'react-router-dom';


export default class PublisherCard extends Component {
  constructor(props) {
    super(props);


  }

  /**
   * 
   * OPTIONS
   */


  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    if (this.props.theme) {
      if (Object.prototype.toString.call(this.props.theme) === "[object String]") {
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else {
        styles = this.props.theme;
      }
    }
    app.state.styles = styles





    //********CARD ASSIGN********/

    let cards = {

      card: <Card app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      cardWithTab: <CardWithTab app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      popup: <Popup app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />,
      popupWithTab: <PopupWithTab app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />
      //popupType={this.props.popupType} popupTab={this.props.popupTab}

    }

    //*********CARD ASSIGN********/





    return (
      <div >

        {cards[this.props.type ? this.props.type : "card"]}
      </div>

    )
  }
}

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      imageList: [],
    };

    this.getMimeType = this.getMimeType.bind(this);
    this.handleMediaClick = this.handleMediaClick.bind(this);
  }

  async componentDidMount() {
    let app = this.props.app;
    let state = app.state;
    let componentList = state.componentList;
    let features = await auth.getFeaturesByUser(componentList, state.currentPublisher.getJson()._id);
    features = features.sort((a, b) => {
      return parseInt(a.getJson().featurePosition) - parseInt(b.getJson().featurePosition);
    });

    let imageList = features.map(feature => feature.getJson().picURL);

    if (imageList.length > 0) {
      this.setState({ imageList }, () => {
        this.props.app.dispatch({
          currentMedia: imageList[0],
          currentFeature: features[0],
        });
      });
    }

    this.setState({ features });
  }

  getMimeType(url) {
    const extension = url?.split('?')[0].split('.').pop().toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'mov':
        return 'video/quicktime';
      default:
        return 'application/octet-stream';
    }
  }

  handleMediaClick(mediaItem) {
    const selectedMedia = mediaItem;

    if (typeof selectedMedia === 'string') {
      // Find the corresponding feature for the clicked media
      const selectedFeature = this.state.features.find(feature => feature.getJson().picURL === selectedMedia);

      this.props.app.dispatch({
        currentMedia: selectedMedia,
        currentFeature: selectedFeature, // Set the currentFeature
      });
    } else {
      console.error("Selected media is not a valid string:", selectedMedia);
    }
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let features = this.state.features;
console.log(features);
    let mimeType = this.getMimeType(app.state.currentMedia);
    let isVideo = mimeType ? mimeType.includes('video') : false;

    return (
      <div style={{
        display: "flex", flexDirection: "column", color: "white", paddingTop: "22px", width:"82vw",
        justifyContent: 'center', alignItems: 'center', background: styles.colors.color2+'44', borderRadius: "22px"
      }}>
        {features?.length > 0 && (<>
          <Link to={`../purchase/${features[0].getJson().mpId}`}><img src={features[0].getJson().picURL}
            style={{ width: "82vw", 
              height: "15.63vw", 
              borderRadius: "11px", 
              objectFit: "contain" }} /></Link>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "82vw", marginTop: "11px" }}>
            <Link to={`../purchase/${features[1].getJson().mpId}`}><img src={features[1].getJson().picURL}
              style={{width: "25.73vw", 
                height: "15.63vw",   borderRadius: "11px", objectFit: "cover" }} /></Link>
            <Link to={`../purchase/${features[2].getJson().mpId}`}><img src={features[2].getJson().picURL}
              style={{ width: "25.73vw", 
                height: "15.63vw",   borderRadius: "11px", objectFit: "cover" }} /></Link>
            <Link to={`../purchase/${features[3].getJson().mpId}`}><img src={features[3].getJson().picURL}
              style={{ width: "25.73vw", 
                height: "15.63vw",  borderRadius: "11px", objectFit: "cover" }} /></Link>
          </div>
        </>)}
        {/* {features.length > 0 && (
          <>
            <div style={{ marginBottom: '2px' }}>
              {isVideo ? (
                <div
                  style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', width: "40vw", maxHeight: "400px",
                    minHeight: "400px",
                  }}>
                    
                  <VideoPlayer draggable={false}
                    disablePlayButton={this.props.disablePlayButton} options={{
                      autoplay: false,
                      controls: true,
                      width: "35vw",
                      height: "400px",
                      sources: [{
                        src: app.state.currentMedia,
                        type: mimeType
                      }]
                    }} />
                </div>
              ) : (
                <div style={{
                  width: "40vw",
                  maxHeight: "400px",
                  minHeight: "400px",
                  borderRadius: "11px",
                  position: "relative", justifyContent:"center"
                }}>
                  <Link className="hover-btn-highlight" to={`/purchase/${app.state.currentFeature?.getJson().mpId}`} style={{
                    ...styles.buttons.buttonAdd, textDecoration: "none", background: styles.colors.color7,
                    fontWeight: "bold", letterSpacing: ".05rem", padding: "8px 13px", fontSize: "30px", fontFamily: "inria", 
                    position: "absolute",
                    bottom: "10px", 
                    left: "50%", 
                    transform: "translateX(-50%)",
                    zIndex: 1, 
                  }}>
                    View Product
                  </Link>
                
                  <img
                    alt="Current Media"
                    src={app.state.currentMedia}
                    style={{
                      borderRadius: "11px",
                      objectFit: "contain", justifySelf:"center",
                      width:"40vw",
                      maxHeight: "420px",
                      borderRadius:"11px",
                      minHeight: "420px",
                      height: "100%",
                    }}
                  />
                </div>
              )}
            </div>
            <div style={{ marginTop:"18px"}}>
              <ViewMedia2
                media={features.map(feature => feature.getJson().picURL)}
                scale={1.48}
                arrowScale={"39%"}
                nToShow={4}
                onClick={(e, props) => {
                  this.handleMediaClick(props.media);
                }}
                app={app}
              /></div>
          </>
        )} */}
      </div>
    );
  }
}

class TabContent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    return (
      <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "top", alignItems: "top", borderBottom: "1px solid grey", fontSize: "2.5vh", height: "24vh", }}>

      </div>
    )
  }
}

/**Popups */
class Popup extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
          <div style={ ///EXIT BUTTON
            styles.buttons.buttonClose
          } onClick={this.props.handleClose}>x</div>

          <div className='scroller2' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
          </div>


        </div>



      </div>
    )
  }
}
class PopupWithTab extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleClose();
    }
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>

          <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /> <div style={ ///EXIT BUTTON
            styles.buttons.buttonClose
          } onClick={this.props.handleClose}>x</div></div>
          <div className='scroller2' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
          </div>
        </div>




      </div>
    )
  }
}





//********CARDs********/
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className='scroller2' style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}

class CardWithTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"], width: window.innerWidth < state.phoneUIChange ? "95vw" : "35vw", height: window.innerWidth < state.phoneUIChange ? "75vh" : "85vh", position: 'relative', border: "none", borderRadius: "3px" }}>
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"], height: "25vh" }}> <TabContent app={app} /></div>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"], height: window.innerWidth < state.phoneUIChange ? "60%" : "70%" }} className='scroller2'>
          <MainContent app={app} />
        </div>

      </div>
    )
  }
}
