import trash from '../pics/trashStill.png';
import DelItem from './deleteItem';


export default class DelIconItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){
    let cell = this.state.cell;
    let html = <img onClick={this.del} src={cell.imgSrc?cell.imgSrc:trash} />
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
