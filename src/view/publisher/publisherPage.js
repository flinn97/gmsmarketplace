import { Component } from 'react';
import App from '../../App';
import "../../App.css"
import FilterCard from '../homePageStuff/filterCard';
import MPMapCard from '../homePageStuff/MPMapCard';
import SearchCard from '../homePageStuff/searchCard';
import PublisherCard from './publisherCard';
import PublisherInfoCard from './publisherInfoCard';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class PublisherPage extends Component {
  constructor(props) {
    super(props);
      this.state={
        obj: undefined
      }

  }
  async componentDidMount(){
    
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    await dispatch({currentPublisher:undefined})
    let hash = window.location.href.split("/");
    hash = hash[hash.length-1];
    let publisher = componentList.getComponent("publisher", hash, "hash");
    await dispatch({pubilsherFilter:(comp)=>{
      return comp.getJson().owner === publisher.getJson()._id}})
    dispatch({currentPublisher:publisher, })




    
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
      }}  >
       
          {state.currentPublisher&&<>
          <img src={state.currentPublisher.getJson().banner} style={{width:"100%", height:"30%", objectFit:"cover"}}/>
          <PublisherInfoCard app={app} type="card" options={{cardType:"bigcard"}}/>
          <PublisherCard app={app} type="card" options={{cardType:"bigcard"}}/>
            <SearchCard app={app} type="card" options={{cardType:"bigcard"}} displayPublisherUI={false}/>
            <div style={{width:"100%", paddingLeft:"100px",
      height:"fit-content", paddingRight:"100px", alignItems: "center", display:"flex",  flexDirection:"column", marginBottom:"100px",  marginTop:"2px",}}>
        
        
        <FilterCard app={app} type="card" options={{cardType:"bigcard"}}/> 
        {/* <PromotionalCard app={app} type="card" options={{cardType:"bigcard"}}/> */}
        <MPMapCard app={app} type="card" options={{cardType:"bigcard"}}/>   
      </div>
          </>}
         {/* <PublisherCard app={app} type="card" options={{cardType:"bigcard"}}/> */}
                
        
      </div>
    )

  }
}
