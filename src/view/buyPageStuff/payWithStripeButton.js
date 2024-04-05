import React, { useState, useEffect, Component } from "react";

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


    return (
      <div style={{
        ...styles.buttons.buttonAdd, color: styles.colors.colorBlack, width: "280px", boxShadow: "0px 4px 6px -6px" + styles.colors.color1,
        justifyItems: "center", textAlign: "center", margin: "5px", borderRadius: "25px",
        background: styles.colors.color3, fontWeight: "bold", fontSize: "1.2rem", padding: "11px 8px"
      }} title='Add to your GMS library.'
        onClick={() => { dispatch({ popupSwitch: "buyPopup", currentComponent: obj }) }}>Checkout
        <div style={{ fontSize: "1.0rem", marginLeft: "8px", color: "#8888888" }}>with</div>
        <img src={this.props.logo ? this.props.logo : stripeLogo} style={{ width: "80px", height: "1.5rem", objectFit: "cover", borderRadius: "11px", marginLeft: "6px" }} />
      </div>
    );
  }
}