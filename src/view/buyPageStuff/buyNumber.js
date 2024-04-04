import { Component } from 'react';
import "../../App.css"


export default class BuyNumber extends Component {
  constructor(props) {
    super(props);
      this.state={
        obj: undefined
      }

  }
  async componentDidMount(){


    
  }

  
  

  render() {
    
    let props = this.props;
    let componentList = props.interface.getComponentList();
    let purchases = componentList.getList("buy", props.obj.getJson()._id, "boughtItem")
    // let component = componentList.getComponents().find(obj=>obj.getJson()._id===id);

    return (
      <div >
         {purchases.length}
      </div>
    )

  }
}
