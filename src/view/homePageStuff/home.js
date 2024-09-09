import { Component } from 'react';
import "../../App.css"
import SearchCard from './searchCard';
import FilterCard from './filterCard';
import PromotionalCard from './promotionalCard';
import MPMapCard from './MPMapCard';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: undefined
    }

  }
  async componentDidMount() {



  }




  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let opps = state.opps
    let center = window.innerWidth < 1200 ? {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    } : undefined


    return (
      <div className='scroller2' style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "inria",
        marginTop: "14px",
        marginBottom: "100px",
        padding: "10px",
        boxSizing: "border-box",
        flexGrow: 1,    // This allows the content to grow and fill the screen
        overflowY: "auto", // Ensure scrolling works properly
        height: "100vh",   // Set height to 100vh to fill the screen
      }} >
        <SearchCard app={app} type="card" options={{ cardType: "bigcard" }} />
        <div style={{
            width: "100%",
            padding: "0 5vw", // Adjust padding to be responsive
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginBottom: "150px",
            marginTop: "2px",
            flexGrow: 1 // Allow this section to grow as well
        }}>


          <FilterCard app={app} type="card" options={{ cardType: "bigcard" }} />
          {/* <PromotionalCard app={app} type="card" options={{cardType:"bigcard"}}/> */}
          <MPMapCard app={app} type="card" options={{ cardType: "bigcard" }} />
        </div>
      </div>
    )

  }
}
