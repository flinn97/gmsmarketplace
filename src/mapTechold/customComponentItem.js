import BaseClass from './baseClass';
//model
export default class CustomComponentItem extends BaseClass {
  constructor(props){
    super(props);


  }


  render(){
    
    let html = this.state.cell.custom;
  return (
    <>{this.getHtml(html)}</>
  )}
}
