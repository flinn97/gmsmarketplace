import React, { Component } from 'react';
import "../../App.css";

import StripeEl from './stripeL';
import { Link } from 'react-router-dom';
 import Login from '../login';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy, limit } from "firebase/firestore";
import { db, storage, auth } from '../../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail, updateEmail, deleteUser } from "firebase/auth";
/**
 * condensed version of the cards.
 * Works with themes.
 * props
 * theme
 * type
 * app
 * options
 * options can include cardType, cardContent, tabType, 
 */
export default class FreePopup extends Component {
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



//********CONTENTS********/
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
    let component = componentList.getComponents().find(obj => obj.getJson()._id === id);
    let loreList = componentList.getList("mpLore", id, "topDisplayID")
    let encounterList = componentList.getList("mpEncounter", id, "topDisplayID")
    let imageList = componentList.getList("mpImage", id, "topDisplayID")

    return (
      <div style={{
        padding: "22px", marginTop: "22px",
        background: "",
        borderRadius: "22px", height: "100%"
      }}>
        {!state.user ? <Login app={app} callbackFunc={async (user)=>{
          
          let json = { ...state.currentComponent.getJson(), type: "mpItem", owner: user.email, _id: Math.floor(Math.random()*1000000).toString()}
          json.date = await serverTimestamp();
          await setDoc(doc(db, "GMSusers", "GMSAPP", "components", json._id), json);
          dispatch({
            downloaded: true,
          })
        }}/>
        // <div style={{ color: styles.colors.colorWhite + "f2", fontWeight: "500", fontSize: "21px", width: "450px", alignSelf: "center" }}>Please first <Link onClick={() => {
        //   dispatch({ popupSwitch: "", currentComponent: undefined })
        //   auth.setLoginReturnURL(window.location.href);
        // }} to="/login">Login  to  GMS</Link> to buy this product</div>
          : <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ color: styles.colors.colorWhite + "f2", fontWeight: "500", fontSize: "21px", alignSelf: "center" }}>
              This content has been added to your
            </div>
            <Link style={{ color: styles.colors.color9 + "f2", fontWeight: "500", fontSize: "21px", marginLeft:"1rem", alignSelf: "center" }} onClick={()=>{
          }} to="https://gms.arcanevaultassembly.com/library">GMS Library</Link>
          </div>}

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
          <div style={{///EXIT BUTTON
            ...styles.buttons.buttonClose, position: "absolute", right: 32,
          }} onClick={this.props.handleClose}>x</div>

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
