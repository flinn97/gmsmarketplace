import React, { useState, useEffect, Component } from "react";
import placeholder from "../../pics/loreFeather.png";
import { displayName } from "react-quill";
import userIco from "../../pics/doubleUserIcon.png";
import userIcoSelected from "../../pics/doubleUserIconGold.png"
import { MapComponent } from "../../mapTech/mapComponentInterface";


export default class FilterByPublisher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSel: this.props.app.state?.searchState,
      currentPub: "All",
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
      <div className='hover-container' style={{ width:"fit-content", fontSize:"1rem", color: styles.colors.colorWhite + "99", 
      cursor:"pointer", userSelect: "none", marginBottom:"-13px", 
      alignContent:"center", justifySelf:"center", alignSelf:"center" }}>
<img src={(state.pubilsherFilter && state.pubilsherFilter!== undefined)?userIcoSelected:userIco} alt={"ava"} className="hover-img" style={{width:"34px",}}/>

<div style={{color:styles.colors.colorWhite, textDecorationColor:"#ffddead11", fontSize:".85rem", marginLeft:"-.9rem" }}>Publishers</div>

    <div className="hover-div" style={{marginTop:"21px", }}>

    
    
    <div  style={{ maxWidth: "278px", flexDirection:"column", display:"flex", marginLeft:"-14px", marginTop:"18px", background:styles.colors.color7+"f9",  borderRadius:"1px 11px 11px 11px"}}>
      {/* <div className="DR-Map-Section"
    style={{color: state.activeItem!==undefined?"white":"#ffd34e", marginTop:"1px", 
    padding:"2px 8px", fontSize:"1.1rem", flexDirection:"row", }}
      onClick={() => {
        this.setState({currentPub:"All"})
        dispatch({pubilsherFilter:undefined, activeItem:undefined});
      }}
       >All</div> */}
      <MapComponent theme="defaultRow"
    
      app={app} name="publisher" cells={[
        {type:"attribute", style:{activeClass: "DR-Active-Item"},
        name: "publisherName", hasLink:true, useId:"hash", to:"publisher/",
        style:{color:styles.colors.colorWhite, padding:"2px 8px", fontSize:"1rem",}}
      ]} />
      <div className="tail" style={{left:11}}></div>
    </div>
    </div>
        
      </div>
    );
  }
}