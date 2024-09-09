import React, { useState, useEffect, Component } from "react";
import placeholder from "../../pics/loreFeather.png";
import encSwords from "../../pics/encounterSwords.png";
import imgSquareIco from "../../pics/imgSquareIco2.png";
import campaignBook from "../../pics/campaignBook.png";
import mapPin from "../../pics/mapPin.png";
import loreFeather from "../../pics/loreFeather.png";

export default class FilterByTypeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSel: this.props.app.state?.searchState
    };

  }

  componentDidMount() {
    this.setState({ currentSel: this.props.app.state?.searchState })
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let list = this.props.list;

    let searchTypes = ["Campaign", "Map", "Lore", "Encounter", "Artwork",]

    const styling = {
      width: window.innerWidth>700?"100px":"70px", padding: window.innerWidth>700?"11px 4px":"8px 3px", margin: "1px", fontSize: window.innerWidth>700?"1rem":".8rem", alignContent: "center", justifyItems: "center",
      cursor: "pointer", borderRadius: "11px", minHeight: window.innerWidth>700?"101px":"40px",
      justifyContent: "center", display: "flex", flexDirection: "column",
    }

    const typeIcons = {
      Campaign: campaignBook,
      Map: mapPin,
      Lore: loreFeather,
      Encounter: encSwords,
      Artwork: imgSquareIco,

    };

    return (
      <div style={{ width: "fit-content", color: styles.colors.colorWhite + "99", userSelect: "none", marginLeft:window.innerWidth>700?"":"-22px" }}>



        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%", }}>

          {searchTypes.map((type, index) => <div
            index={index} key={index} className="hover-img"
            onClick={() => {
              this.setState({ currentSel: type + "s" })
              dispatch({ searchState: type !== "Lore" ? type + "s" : "Lore", filter: "mp" + type })
            }} style={{
              ...styling,
              background: (type + "s") === this.state.currentSel ? styles.colors.color4 + "30" : "",
              border: (type + "s") === this.state.currentSel ? "2px solid " + styles.colors.color3 + "44" : ""
            }}>

            <img src={typeIcons[type] || placeholder} alt={"ico"} style={{ width: "fit-content", alignSelf: "center", justifySelf: "center", width:window.innerWidth>700? "35px":"22px", marginBottom: window.innerWidth>700?"6px":"5px" }} />
            <div style={{ fontFamily: "inria", fontSize: window.innerWidth>700?"1.12rem":".8rem", color: styles.colors.colorWhite + "e8", width: "fit-content", alignSelf: "center", justifySelf: "center", }}>{type !== "Lore" ? type + "s" : type}
            </div>
          </div>
          )}
        </div>
      </div>
    );
  }
}