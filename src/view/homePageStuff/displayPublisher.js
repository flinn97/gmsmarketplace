import React, {Component} from "react";

export default class DisplayPublisher extends Component{
    constructor(props){
        super(props)
    }

    render(){
        debugger
        let obj = this.props.obj;
        let componentList = this.props.app.state.componentList;
        let publisher = componentList.getComponent("publisher", obj.getJson().owner, "_id");
    return(
        <div>
            {publisher.getJson().publisherName}
            <div>Profile Coming Soon</div>
        </div>
    )
    }
}