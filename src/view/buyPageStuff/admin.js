import { Component } from 'react';
import "../../App.css"

import ProfileCard from './profileCard';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class Admin extends Component {
  constructor(props) {
    super(props);
      this.state={
        obj: undefined
      }

  }
  async componentDidMount(){


    
  }

  
  

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    // let component = componentList.getComponents().find(obj=>obj.getJson()._id===id);

    return (
      <div >
      <ProfileCard app={app} type="card" options={{cardType:"bigcard"}}/>
      </div>
    )

  }
}
