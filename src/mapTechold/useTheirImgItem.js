
import ImgItem from './imgItem';

//model
export default class UseTheirImgItem extends ImgItem {

    constructor(props){
      super(props);
    }
  
  
    render(){
      let html = <img src={this.state.cell.src}/>
      

    return (
      <>
      {this.getHtml(html)}
      </>
    )}
    
  }
  