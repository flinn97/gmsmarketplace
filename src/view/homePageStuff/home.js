import { Component } from 'react';
import "../../App.css"
import SearchCard from './searchCard';
import FilterCard from './filterCard';
import PromotionalCard from './promotionalCard';
import MPMapCard from './MPMapCard';

export default class Home extends Component {
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
      <div className='scroller2' style={{...center, width:"100%", height:"100vh", display:"flex", 
      flexDirection:"column", alignItems: "center", fontFamily:"inria" , marginTop:"52px", marginBottom:"100px",
      }} >
        <SearchCard app={app} type="card" options={{cardType:"bigcard"}}/>
      <div style={{width:"100%", paddingLeft:"100px",
      height:"fit-content", paddingRight:"100px", alignItems: "center", display:"flex",  flexDirection:"column", marginBottom:"100px",  marginTop:"2px",}}>
        
        
        <FilterCard app={app} type="card" options={{cardType:"bigcard"}}/> 
        {/* <PromotionalCard app={app} type="card" options={{cardType:"bigcard"}}/> */}
        <MPMapCard app={app} type="card" options={{cardType:"bigcard"}}/>   
      </div>
      </div>
    )

  }
}
