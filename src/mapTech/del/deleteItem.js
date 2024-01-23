import BaseClass from '../baseClass';


export default class DelItem extends BaseClass {
  constructor(props){
    super(props);
    this.del = this.del.bind(this);
    //define options for base class.

  }


  /**
   * delete or send a popup dispatch according to user preference.
   */
  del(){
    let app = this.p.props.app;
    let opps = this.obj.getOperationsFactory();
    if(this.cell.popop){
      app.dispatch({popupSwitch:"del", delComponent:this.obj})

    }
    else{
      opps.cleanPrepareRun({del:this.obj})
    }
  }

  


  render(){
    let html = <span onClick={this.del}>X</span>
  return (
    <>
    {this.getHtml(html)}
    </>
  )}
}
