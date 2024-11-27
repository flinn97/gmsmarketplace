import React, { Component } from 'react';
import "../../App.css"
import encSwords from "../../pics/encounterSwords.png";
import imgSquareIco from "../../pics/imgSquareIco2.png";
import mapPin from "../../pics/mapPin.png";
import loreFeather from "../../pics/loreFeather.png";

export default class StatCard extends Component {
  constructor(props) {
    super(props);


  }


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
    this.state = {}
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let idList = window.location.href.split("/");
    let id = idList[idList.length - 1];
    let component = componentList.getComponents().find(obj => obj?.getJson()._id === id);

    let styleOne = { fontFamily: "inria", fontSize: window.innerWidth > 700 ? "1.21rem" : ".8rem", 
      lineHeight: window.innerWidth > 700 ? "5rem" : "1rem", display: "flex", flexDirection: window.innerWidth > 700 ? "row" : "column", };
    let styleIco = { width: window.innerWidth > 700 ? "1.21rem" : "1.1rem", height: window.innerWidth > 700 ? "1.21rem" : "1.1rem", marginBottom: "-.22rem", marginRight: window.innerWidth > 700 ? "11px" : "8px" };

    return (
      <div style={{
        color: styles.colors.color8, display: "flex", flexDirection: "row", justifyContent: "space-between",
        background: styles.colors.color1 + "f1", borderRadius: "12px", marginTop: window.innerWidth > 700 ? "" : "8vw",
        width: "100%", minWidth: window.innerWidth > 700 ? "" : "70vw", padding: window.innerWidth > 700 ? "11px" : "", paddingRight: window.innerWidth > 700 ? "110px" : "",
      }}>
        {window.innerWidth > 700 &&
          <div style={{ color: styles.colors.colorWhite, fontSize: window.innerWidth > 700 ? "1.1rem" : ".8rem", fontFamily: "inria", marginLeft: "24px", }}>Estimated Content:</div>}

        <div style={styleOne}>
          <div style={{ borderLeft: "1px solid #353535", ...styleOne, marginRight: "8px" }}></div>

          <img src={encSwords} style={styleIco} />
          Encounters: {Math.floor(component?.getJson().encCount / 5) * 5}{" "}
          {component?.getJson().encCount >= 6 && "+"}
          
        </div>

        <div style={styleOne}>
          <div style={{ borderLeft: "1px solid #353535", ...styleOne, marginRight: "8px" }}></div>
          <img src={imgSquareIco} style={styleIco} />
          Artwork: {Math.floor(component?.getJson().imageCount / 5) * 5}{" "}
          {component?.getJson().imageCount >= 6 && "+"}
          
        </div>

        <div style={styleOne}>
          <div style={{ borderLeft: "1px solid #353535", ...styleOne, marginRight: "8px" }}></div>
          <img src={loreFeather} style={styleIco} />
          Lore: {Math.floor(component?.getJson().loreCount / 5) * 5}{" "}
          {component?.getJson().loreCount >= 6 && "+"}
          
        </div>

        <div style={styleOne}>
          <div style={{ borderLeft: "1px solid #353535", ...styleOne, marginRight: "8px" }}></div>
          <img src={mapPin} style={styleIco} />
          Maps: {component?.getJson().mapCount < 6 ? component?.getJson().mapCount : Math.floor(component?.getJson().mapCount / 5) * 5}{" "}
          {component?.getJson().mapCount >= 6 && "+"}
        </div>
        
      </div>

    )
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
      <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "top", alignItems: "top", borderBottom: "1px solid grey", fontSize: "2.5vh", }}>

      </div>
    )
  }
}


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

          <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
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
          <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
          </div>
        </div>




      </div>
    )
  }
}


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
      <div style={{ ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
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
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"], height: window.innerWidth < state.phoneUIChange ? "60%" : "70%" }}>
          <MainContent app={app} />
        </div>

      </div>
    )
  }
}
