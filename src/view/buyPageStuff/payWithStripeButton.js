import React, { useState, useEffect, Component } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy, limit } from "firebase/firestore";
import { db, storage, auth } from '../../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail, updateEmail, deleteUser } from "firebase/auth";

import stripeLogo from "../../pics/stripe-logo-purple.png"

export default class PayWithStripeButton extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };

  // }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let componentList = state.componentList;
    let idList = window.location.href.split("/");
    let id = idList[idList.length - 1];
    let currentComponent = componentList.getComponents().find(obj => obj.getJson()._id === id);


    return (
      <div style={{
        ...styles.buttons.buttonAdd, color: styles.colors.colorBlack, width: "280px", boxShadow: "0px 4px 6px -6px" + styles.colors.color1,
        justifyItems: "center", textAlign: "center", margin: "5px", borderRadius: "25px",
        background: styles.colors.color3, fontWeight: "bold", fontSize: "1.2rem", padding: "11px 8px"
      }} title='Add to your GMS library.'
        onClick={async () => { 
          if(currentComponent.getJson().stripePrice==="0"||currentComponent.getJson().stripePrice==="000"){
            debugger
            let json = { ...currentComponent.getJson(), type: "mpItem", owner: state.user.getJson()._id }
            json.date = await serverTimestamp();
            await setDoc(doc(db, "GMSusers", "GMSAPP", "components", json._id), json);
          }
          else{
            dispatch({ popupSwitch: "buyPopup", currentComponent: obj })

          }
           }}>Checkout
        {/* <div style={{ fontSize: "1.0rem", marginLeft: "8px", color: "#8888888" }}>with</div>
        <img src={this.props.logo ? this.props.logo : stripeLogo} style={{ width: "80px", height: "1.5rem", objectFit: "cover", borderRadius: "11px", marginLeft: "6px" }} /> */}
      </div>
    );
  }
}