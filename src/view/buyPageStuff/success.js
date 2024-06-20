import React, {Component} from "react";
export default class Success extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let app = this.props.app;
        let state = app.state;
        return(
            <div>
                Success!
            </div>
        )
    }
}