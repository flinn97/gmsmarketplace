import EditItem from "./editItem";
import Edit from '../pics/editPin.png';


export default class EditIconItem extends EditItem {
  constructor(props){
    super(props);
  }



  render(){
    let html = <img onClick={this.edit} src={this.cell.imgSrc?this.cell.imgSrc:Edit} />
  return (
    <>
    {this.getHtml(html)}
    
    </>
  )}
}
