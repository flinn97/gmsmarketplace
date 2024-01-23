import { Component } from 'react';
import { Link } from 'react-router-dom';


export default class BaseClass extends Component {
  constructor(props){
    super(props);
    this.getHtml = this.getHtml.bind(this);

    this.p = props.props;
    this.cell = this.p.cell;
    this.obj = this.p.obj;
    if(this.cell){
      this.useId = this.cell.useId===false?"":this.cell.useId===undefined?this.obj.getJson()._id: this.obj.getJson()[this.cell.useId];
    }
   
    this.state={
      p:this.p,
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
    debugger
    let clicks = undefined
    if(this.state.cell.func){
      clicks = this.state.cell.func
    }
    return <>{this.cell.hasLink?(<Link to={this.cell.to + this.useId}>{option}</Link>):(<span onClick={()=>{
      debugger
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
