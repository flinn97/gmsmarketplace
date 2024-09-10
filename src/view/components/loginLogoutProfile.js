import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/auth";
import userHead from "../../pics/user_head.png";

export default class LoginLogout extends Component {
    constructor() {
        super();
        this.state = {
            showStuff: true
        }

    }
    render() {

        let app = this.props.app;
        let state = app.state;
        let user = state.user;
        let styles = state.styles;
        return (<div className="hover-grey" style={{display: "flex", flexDirection: "row" }} >
            {!window.location.href.includes("login") && <>
                {this.state.showStuff && <>
                    <div style={{ color: "white", background: styles.colors.color8 + "32", padding: window.innerWidth>700?"8px 12px":"4px 9px", 
                    justifyContent:"space-around", height:window.innerWidth>700?"36px":"22px",
                        borderRadius: "11px", width: "114px", display: "flex", flexDirection: "row" }}>
                        {!user ?
                            <Link onClick={() => { this.setState({ showStuff: false }) }} to="../login" style={{ fontFamily: "inria", color: styles.colors.colorWhite, textDecoration: "none", fontSize:window.innerWidth>700?"17px":"14px" }}>Log In</Link>
                            :
                            <div onClick={auth.logout} style={{ fontFamily: "inria", fontSize:window.innerWidth>700?"17px":"14px" }}>Log Out</div>}
                        {!user.getJson().picURL && <img src={userHead} style={{width:window.innerWidth>700?"22px":"19px", height:window.innerWidth>700?"20px":"18px", opacity:"80%"}}/>}
                    </div>
                    <div>
                    {(user && user.getJson().picURL) && 
                    <img
                            src={user.getJson().picURL}
                            style={{width:window.innerWidth>700?"25px":"20px", height:window.innerWidth>700?"25px":"20px", opacity:"90%", borderRadius:"50%", margin: "6px 12px", }}
                        />}

                    </div>
                </>}
            </>}
        </div>)
    }
}