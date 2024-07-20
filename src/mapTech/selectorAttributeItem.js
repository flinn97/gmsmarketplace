import AttributeItem from './attributeItem';

export default class SelectorAttributeItem extends AttributeItem {
  constructor(props){
    super(props);

  }

  createClassString(){
    let cell = this.state.cell;
    let c = cell.class?cell.class:this.state.theme.MCAttributeItem;
    let bool = cell.activeAttribute? cell.activeAttribute: "_id";
    let id = this.state.obj.getJson()[bool] 

    if(id===cell.activeItem?.getJson()[bool]){
      let style = cell.activeClass? cell.activeClass: this.state.theme.MCActiveItem;
      c= c+ " " + style
    }
    return c

  }


  render(){
    let cell = this.state.cell
    let name = cell.name;
    if(!name){
      name = cell
    }

    let html = <span style={this.state.cell.style} className={this.createClassString()}>
      {this.state.obj.getJson()[name]}
      </span>

  return (
    <>{this.getHtml(html)}</>
  )}
  
}
