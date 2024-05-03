import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DisplayPublisher extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        debugger
        let obj = this.props.obj;
        let componentList = this.props.app.state.componentList;
        let publisher = componentList.getComponent("publisher", obj.getJson().owner, "_id");
        let app = this.props.app;
        let dispatch = app.dispatch;
        let state = app.state;
        let styles = state.styles;

        console.log(publisher)

        return (
            <Link 
            to={"/publisher/"+publisher.getJson().publisherName} 
            style={{ background:styles.colors.color1+"d5", width:"100%", cursor:"pointer", textUnderlineOffset:"2px",
            color:styles.colors.color3+"e9", fontFamily:"inria", position:"absolute", top:190,
            height:"24px", fontSize:"1.2rem", zIndex:"150"}}>
                <div className='hover-btn-highlight' style={{fontFamily:"inria", paddingLeft:"4px", }}>
                {publisher.getJson().publisherName}
                </div>
                {/* <div>Profile Coming Soon</div> */}
            </Link>
        )
    }
}