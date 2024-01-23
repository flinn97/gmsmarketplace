import BaseClass from './baseClass';


//model
export default class AttributeItem extends BaseClass {
  constructor(props){
    super(props);


  }


  render(){

    let name = this.state.cell.name;
    if(!name){
      name = this.cell
    }

    let html = <span>{name}</span>
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
  
}
