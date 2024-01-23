import BaseClass from '../baseClass';


export default class EditItem extends BaseClass {
  constructor(props){
    super(props);
    this.edit = this.edit.bind(this);

  }

  /**
   * delete or send a popup dispatch according to user preference.
   */
  edit(){
    let app = this.p.props.app;
    app.dispatch({popupSwitch:"edit", currentComponent:this.obj})

  }


  render(){
    let html = <span onClick={this.edit}>edit</span>
  return (
    <>
    {this.getHtml(html)}
    
    </>
  )}
}
