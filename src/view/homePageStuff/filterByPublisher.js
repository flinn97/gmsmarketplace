import React, { useState, useEffect, Component } from "react";
import placeholder from "../../pics/loreFeather.png";
import { displayName } from "react-quill";


export default class FilterByPublisher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSel: this.props.app.state?.searchState
    };

  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let list = this.props.list;
  

    return (
      <div className='hover-container' style={{ width: "fit-content", fontSize:"1rem", color: styles.colors.colorWhite + "99", cursor:"pointer", userSelect: "none", textDecoration:"underline",  
      alignContent:"center", justifySelf:"center", alignSelf:"center" }}>
Sort by Publisher
    <div className="hover-div" style={{marginTop:"10px"}}>

    
    
    <div className="menu-bubble" style={{ width: "fit-content", flexDirection:"column", display:"flex"}}>
      listlist
      {/* TAYLOR LIST OF PUBLISHER CHECKBOXES, add to a string, you can have multiple checked and see all checked */}
      <div className="tail"></div>
    </div>
    </div>
        
      </div>
    );
  }
}