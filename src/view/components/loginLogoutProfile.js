import React, {Component} from "react";
import { Link } from "react-router-dom";
import auth from "../../services/auth";

export default class LoginLogout extends Component{
    constructor(){
        super();
        this.state = {
            showStuff:true
        }
    
    }
    render(){
        
        let app = this.props.app;
        let state = app.state;
        let user = state.user;
        return(<>
        {!window.location.href.includes("login")&&<>
        {this.state.showStuff&&<>
        <div style={{color:"white"}}>{!user?<Link onClick={()=>{this.setState({showStuff:false})}} to="../login">log In</Link>:<div onClick={auth.logout}>Log Out</div>}</div>
        <div><img src={user?user.getJson().picURL:""}/></div>
        </>}
    </>}
        </>)
    }
}