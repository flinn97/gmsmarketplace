
import BaseClass from './baseClass';

//model
export default class ImgItem extends BaseClass {

    constructor(props){
      super(props);

    }
  
  
    render(){
      let html = <img src={this.state.obj.getJson()[this.state.cell.src? this.state.cell.src:"picURL"]}/>
      

    return (
      <>
      {this.getHtml(html)}
      </>
    )}
    
  }
  