import DelItem from './deleteItem';


export default class DelTextItem extends DelItem {
  constructor(props){
    super(props);
  }


  render(){
    let html = <span onClick={this.del}>{this.state.p.delText?this.state.p.delText:"delete"}</span>
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
