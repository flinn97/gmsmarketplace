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
                    <div style={{ color: "white", background: styles.colors.color8 + "32", padding: "8px 12px", 
                    justifyContent:"space-around", height:"36px",
                        borderRadius: "11px", width: "114px", display: "flex", flexDirection: "row" }}>
                        {!user ?
                            <Link onClick={() => { this.setState({ showStuff: false }) }} to="../login" style={{ fontFamily: "inria", color: styles.colors.colorWhite, textDecoration: "none", fontSize:"17px" }}>Log In</Link>
                            :
                            <div onClick={auth.logout} style={{ fontFamily: "inria", fontSize:"17px" }}>Log Out</div>}
                        {!user.getJson().picURL && <img src={userHead} style={{width:"22px", height:"20px", opacity:"80%"}}/>}
                    </div>
                    <div>
                    {(user && user.getJson().picURL) && 
                    <img
                            src={user.getJson().picURL}
                            style={{width:"25px", height:"25px", opacity:"90%", borderRadius:"50%", margin: "6px 12px", }}
                        />}

                    </div>
                </>}
            </>}
        </div>)
    }
}