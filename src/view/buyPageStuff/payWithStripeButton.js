import React, { useState, useEffect, Component } from "react";

import stripeLogo from "../../pics/stripe-logo-purple.png"

export default class PayWithStripeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloaded: false,
    };

  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;

    console.log(obj.getJson().stripePrice)
    return (
      <div style={{
        ...styles.buttons.buttonAdd, color: styles.colors.colorBlack, width: "280px", boxShadow: "1px 4px 6px -6px" + styles.colors.color1,
        justifyItems: "center", textAlign: "center", margin: "5px", borderRadius: "25px",
        mixBlendMode: this.state.downloaded?"luminosity":"normal", border:"2px solid grey",
        pointerEvents:this.state.downloaded?"none":"all", userSelect:"none",
        background: styles.colors.color3, fontWeight: "bold", fontSize: "1.2rem", padding: "11px 8px"
      }} title='Add to your GMS library.'
        onClick={() => {
          if (obj.getJson().stripePrice === "" || obj.getJson().stripePrice === "000" || obj.getJson().stripePrice === "0") {
            this.setState({
              downloaded: true,
            })
          }
          dispatch({ popupSwitch: "buyPopup", currentComponent: obj })
        }}>
          {!this.state.downloaded &&
        (<div>
          {obj.getJson().price === "" || obj.getJson().price === "0.00" || obj.getJson().price === "0" ?
            "Free Download" : "Checkout"}
        </div>)||(<div>
            "Downloaded" 
        </div>)
        }
        {/* <div style={{ fontSize: "1.0rem", marginLeft: "8px", color: "#8888888" }}>with</div>
        <img src={this.props.logo ? this.props.logo : stripeLogo} style={{ width: "80px", height: "1.5rem", objectFit: "cover", borderRadius: "11px", marginLeft: "6px" }} /> */}
      </div>
    );
  }
}