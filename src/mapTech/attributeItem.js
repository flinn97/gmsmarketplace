import BaseClass from './baseClass';

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
    let html = <span style={this.state.cell.style} className={this.state.cell.class?this.state.cell.class:this.state.theme.MCAttributeItem}>
      {this.state.obj.getJson()[name]}
      </span>

  return (
    <>{this.getHtml(html)}</>
  )}
  
}
