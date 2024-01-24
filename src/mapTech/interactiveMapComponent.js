import BaseClass from './baseClass';
import React from 'react';


//this could be updated to use the baseclass getHtml
export default class InteractiveMap extends BaseClass {
  constructor(props){
    super(props);
    
    this.mapContainer = React.createRef();


    this.state={
      isDragging: undefined

    }
  }


  componentDidMount(){
    let props = this.props.props
    let list = props.list
    for(let obj of list){
      document.getElementById(obj.getJson()._id).addEventListener("mousedown", (e)=>{
        this.setState({isDragging:document.getElementById(obj.getJson()._id) });
      });
      document.getElementById(obj.getJson()._id).addEventListener("mouseup",()=>{
        this.setState({isDragging:undefined });
      });
    }
    if(this.mapContainer?.current){
      this.mapContainer.current.addEventListener("mouseup",(e)=>{
        this.setState({isDragging:undefined });
      });
      this.mapContainer.current.addEventListener("mousemove",(e)=>{
        if(this.state.isDragging!==undefined){
          let el = this.state.isDragging;
          el.style.transform = `translate(${e.pageX-25}px, ${e.pageY-25}px)`
          
        }
        
      })
    }
  }


  render(){
    let props = this.props.props
    let list = props.list
    let cells = props.cells;
    let factory = props.interface.getFactory();
    let themeFactory = props.interface.getThemeFactory();
    let theme = props.theme? props.theme: "defaultColumn"
    theme = themeFactory.getComponent(theme);
    let picObj = props.picObj;
    
    let picSrc
    if(picObj){
    picSrc = props.mapAttribute? picObj.getJson()[props.mapAttribute]: picObj.getJson().picURL;
    }
   

  return (
    <div ref={this.mapContainer} className= {props.mapContainerClass? props.mapContainerClass: theme.MCMapContainer} style={{...props.mapContainerStyle}}>
      <img src={picSrc} className= {props.mapClass? props.mapClass: theme.MCMap} style={{...props.mapStyle}}/>
        {list.map((obj, index)=>
        {
        let p = {obj:obj, props:props, interface: this.interface, cell:props.pinCell, theme:props.theme}
        return(<div id={obj.getJson()._id} className={props.mapSectionClass? props.mapSectionClass: theme.MCMapSection} style={{...props.mapSectionStyle}} key = {index}>
          <>{ factory.getComponent(props.pinType?props.pinType:"attribute",p)}</>
          

            </div>)}
            
        )}
    </div>
  )}
}


