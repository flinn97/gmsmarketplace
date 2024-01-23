import { Component } from 'react';
import "../../App.css"
import CardList from '../AllCards/cardList';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class Splash extends Component {
  constructor(props) {
    super(props);
      this.state={
        obj: undefined
      }

  }

  
  

  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let opps = state.opps
    let center = window.innerWidth<600? {
      display: "flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }: undefined


    return (
      <div style={{...center, width:"100vw", height:"100vh", display:"flex", flexDirection:"row", background:styles.colorPalette.color5, zIndex:100000, position:"absolute", justifyContent:'center', alignItems:"center"}} >
        
        <div style={{fontSize:"35px", color:"white"}}>Dreammaker</div>
      </div>
    )

  }
}
