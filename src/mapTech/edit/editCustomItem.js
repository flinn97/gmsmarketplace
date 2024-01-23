import EditItem from "./editItem";


export default class EditCustomItem extends EditItem {
  constructor(props){
    super(props);
  }



  render(){
    let html = <span onClick={this.edit}>{this.cell.custom}</span>
  return (
    <>
    {this.getHtml(html)}
    
    </>
  )}
}
