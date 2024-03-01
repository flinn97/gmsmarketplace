import React, { Component } from 'react';
import "../../App.css"
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import RunButton from '../../componentListNPM/componentForms/buttons/runButton';
import ViewMedia from '../../componentListNPM/componentForms/media/viewMediaComponent';
import auth from '../../services/auth';
import DelButton from '../../componentListNPM/componentForms/buttons/deleteButton';
import PrepareUpdateCheckBox from '../../componentListNPM/componentForms/singleForms/prepareUpdateCheckBox';
import { Link } from 'react-router-dom';
export default class ViewCards extends Component {
  constructor(props) {
    super(props);
    this.getMappedPic=this.getMappedPic.bind(this);
  }
    

  getMappedPic(pic){
    
    let arr =[]

    if(Object.keys(pic.getJson()?.picURLs)[0]){
      
      for (const key in pic.getJson()?.picURLs){
        arr.push(pic.getJson()?.picURLs[key]);
      }
    }
    else{
      arr=[pic.getJson()?.picURL]
    }
    return arr
  }
  componentDidMount(){
    if(this.props.obj.getJson()?.picURLs===undefined|| this.props.obj.getJson()?.picURLs===""){
      // let doc =document.getElementById(this.props.obj.getJson()?._id);
      // doc.innerHTML=this.props.obj.getJson()?.description
    }
    
  }


  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
 



    return (
      <div style={{...styles.smallestCard, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", paddingTop:"20px", position:'relative'}}>
        
        <div style={{position:"absolute", right:0, top:10, zIndex:"1000",cursor:"pointer"}}>
          <DelButton obj = {this.props.obj}  text="X"  wrapperStyle={{width:"25px", height:"25px", }} />
          
        </div>
        {(!this.props.props.student&&this.props.obj.getJson()?.type==="card")&&(
        <div style={{position:"absolute", left:0, top:0, zIndex:"1000",cursor:"pointer"}}>
        <PrepareUpdateCheckBox obj ={this.props.obj} app={app}/>
          
        </div>)}
        <Link to={"/cards/"+this.props.obj.getJson()?._id} style={{textDecoration:"none", display: "flex", alignItems: "center", flexDirection: "column", color:"black"}}>
        <div style={{position:"absolute", top:"10px"}}>{this.props.obj.getJson()?.name}</div>
          {this.props.obj.getJson()?.picURLs===undefined|| this.props.obj.getJson()?.picURLs===""||Object.keys(this.props.obj.getJson()?.picURLs).length===0?(
            <div dangerouslySetInnerHTML={{ __html:this.props.obj.getJson()?.description }} id ={this.props.obj.getJson()?._id} style={{height:window.innerWidth<state.phoneUIChange?"150px":"200px", width:window.innerWidth<state.phoneUIChange?"150px":"200px",}} className='scroller2'></div>
          ):(
        <ViewMedia  disablePlayButton= {true}  scale={window.innerWidth<state.phoneUIChange?.7:.2} media={[this.getMappedPic(this.props.obj)[0]]}  />
        )}
        
        </Link>
        </div>

    )
  }
}


