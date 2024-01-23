import DelItem from './deleteItem';


export default class DelCustomItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){
    let html = <span onClick={this.del}>{this.cell.custom}</span>
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
