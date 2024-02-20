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
      <div className='scroller2' style={{...center, width:"100%", height:"100%", minHeight:"100vh", display:"flex", 
      flexDirection:"column", alignItems: "center", 
      padding:"100px", 
      }} >
        
        <SearchCard app={app} type="card" options={{cardType:"bigcard"}}/>
        <FilterCard app={app} type="card" options={{cardType:"bigcard"}}/> 
        <PromotionalCard app={app} type="card" options={{cardType:"bigcard"}}/>
        <MPMapCard app={app} type="card" options={{cardType:"bigcard"}}/>   
      </div>
    )

  }
}
