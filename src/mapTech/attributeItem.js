import { Component } from 'react';
import { Link } from 'react-router-dom';
import BaseClass from './baseClass';


//model
export default class AttributeItem extends BaseClass {
  constructor(props){
    super(props);

  }


  render(){
    let cell = this.state.cell
    let name = cell.name;
    if(!name){
      name = cell
    }
    let html = <span>{this.state.obj.getJson()[name]}</span>

  return (
    <>{this.getHtml(html)}</>
  )}
  
}
