import { Component } from 'react';
import "../../App.css"
import PurchaseCard from './purchaseCard';
import StatCard from './statCard';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class BuyPage extends Component {
  constructor(props) {
    super(props);
      this.state={
        obj: undefined
      }

  }
  async componentDidMount(){


    
  }

  
  

  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let opps = state.opps
    let center = window.innerWidth<1200? {
      display: "flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }: undefined


    return (
      <div style={{...center, width:"100vw", height:"100vh", display:"flex", flexDirection:"column", marginTop:"150px"  }} >
        <div style={{height:"500px"}}>
         <PurchaseCard app={app} type="card" options={{cardType:"bigcard"}}/>
         </div>
         <StatCard app={app} type="card" options={{cardType:"bigcard"}}/>
         
        
      </div>
    )

  }
}
