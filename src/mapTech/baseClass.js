import { Component } from 'react';
import { Link } from 'react-router-dom';


export default class BaseClass extends Component {
  constructor(props){
    super(props);
    this.getHtml = this.getHtml.bind(this);
    
    this.p = props.props;
    this.cell = this.p.cell;
    this.obj = this.p.obj;
    this.interface= this.p.interface;
    this.themeFactory = this.interface.getThemeFactory();
    if(this.cell){
      this.useId = this.cell.useId===false?"":this.cell.useId===undefined?this.obj.getJson()._id: this.obj.getJson()[this.cell.useId];
    }
    let theme = this.p.theme? this.themeFactory.getComponent(this.p.theme):this.themeFactory.getComponent("defaultColumn") 
   
    this.state={
      p:this.p,
      theme: theme,
      cell:this.cell,
      obj:this.obj,
      useId:this.useId,
      
    }
  }


/**
 * update props if they change
 * @param {*} props 
 * @param {*} state 
 */
  componentDidUpdate(props,state){
    if(props!==this.props){
      
      this.p = this.props.props;
      this.cell = this.p.cell;
      this.obj = this.p.obj;
      if(this.cell){
        this.useId = this.cell.useId===false?"":this.cell.useId===undefined?this.obj.getJson()._id: this.obj.getJson()[this.cell.useId];
      }
      this.setState({...this.state, p:this.p, cell:this.cell, obj:this.obj, useId:this.useId })
    }
  }


  getHtml(option){
    let clicks = undefined
    if(this.cell.func){
      clicks = this.cell.func
    }
    let cellStyle = clicks? {...this.state.p.props.cellStyle, cursor:"pointer"}: this.state.p.props.cellStyle;
    let linkClass = this.state.p?.props.linkClass?this.state.p.props.linkClass:this.state.theme.MCLink;
    let cellClass = this.state.p?.props.cellClass?this.state.p.props.cellClass:this.state.theme.MCCell;

    return <>{this.cell.hasLink?(<Link style={this.state.p.props.linkStyle} className={linkClass} to={this.cell.to + this.useId}>{option}</Link>
    ):(<span style={cellStyle} className={cellClass} onClick={()=>{
      if(clicks){
        clicks(this.state.obj)
      }}}>{option}</span>)}</>

  }

  


  render(){
  return (
    <>
    </>
  )}
}
