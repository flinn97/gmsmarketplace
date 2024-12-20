import { Component } from 'react';
import "../../App.css"
import PurchaseCard from './purchaseCard';
import StatCard from './statCard';
import auth from '../../services/auth';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class BuyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: undefined
    }

  }



  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let opps = state.opps;
    let center = window.innerWidth < 1200 ? {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "auto"
    } : {};


    return (
      <div className='scroller2' style={{...center, width: "100vw", height: "100vh", minHeight:"100vh", display: "flex",flexDirection: "column",
       marginTop: "50px", justifyContent:"space-between", overflowY: "auto"}} >


        <div style={{ width: "100%", height: "100%" }}>
          <PurchaseCard app={app} type="card" options={{ cardType: "bigcard" }} />
        </div>


      </div>
    )

  }
}
