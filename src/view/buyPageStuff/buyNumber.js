import { Component } from 'react';
import "../../App.css"
import SearchCard from '../homePageStuff/searchCard';
import FilterCard from '../homePageStuff/filterCard';
import PromotionalCard from '../homePageStuff/promotionalCard';
import MPMapCard from '../homePageStuff/MPMapCard';
import { MapComponent } from '../../mapTech/mapComponentInterface';
import ProfileCard from './profileCard';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

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
    debugger
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
