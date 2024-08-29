import { Component } from 'react';
import App from '../../App';
import "../../App.css"
import FilterCard from '../homePageStuff/filterCard';
import MPMapCard from '../homePageStuff/MPMapCard';
import SearchCard from '../homePageStuff/searchCard';
import PublisherCard from './publisherCard';
import PublisherInfoCard from './publisherInfoCard';

import backarrow from '../../pics/backArrow.webp'
import { Link } from 'react-router-dom';

export default class PublisherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: undefined
    }

  }
  async componentDidMount() {

    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    await dispatch({ currentPublisher: undefined })
    let hash = window.location.href.split("/");
    hash = hash[hash.length - 1];
    let publisher = componentList.getComponent("publisher", hash, "hash");
    await dispatch({
      pubilsherFilter: (comp) => {
        return comp.getJson().owner === publisher.getJson()._id
      }
    })
    dispatch({ currentPublisher: publisher, })





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
        ...center, width: "100%", height: "100vh", display: "flex",
        flexDirection: "column", alignItems: "center", fontFamily: "inria", marginTop: "52px", marginBottom: "100px",
      }}  >

        {state.currentPublisher && <>

          <img className='banner-fade' src={state.currentPublisher.getJson().banner} style={{ objectFit: "cover", width: "100%", height: "280px" }} />

          <Link className="hover-btn-highlight"
            to={"/"}
            style={{
              ...styles.buttons.buttonAdd, textDecoration: "none", fontStyle: "italic", background: styles.colors.color7 + "aa",
              fontWeight: "bold", letterSpacing: ".05rem", padding: "8px 13px", fontSize: "18px", fontFamily: "inria",
              position: "absolute", top: "40px", left: "4%", zIndex: 1020 
            }}

          >
            <img style={{ width: ".9rem", opacity: "98%", marginRight: ".75rem" }}
              src={backarrow}
            />
            Back
          </Link>

          <PublisherInfoCard app={app} type="card" options={{ cardType: "bigcard" }} />

          <div style={{
            width: "100%", justifyContent: "center", display: "flex", fontSize: "18px", fontFamily: "inria", textAlign: "center",
            justifyItems: "center", justifySelf: "center", alignContent: "center", marginTop: "11px",
            flexDirection: "row", color: styles.colors.color8 + "52"
          }}>
            <div style={{ color: styles.colors.colorWhite+"94", fontFamily: "inria", fontSize: "32px", marginTop:"33px", marginBottom:"11px" }}>Featured</div>
          </div>
          <PublisherCard app={app} type="card" options={{ cardType: "bigcard" }} />
          <div style={{ width: "100%", marginTop: "22px", opacity: ".2", mixBlendMode: "luminosity" }}><hr></hr></div>
          <div style={{ color: styles.colors.colorWhite+"94", fontFamily: "inria", fontSize: "32px", marginTop:"33px" }}>All Products</div>
          <SearchCard app={app} type="card" options={{ cardType: "bigcard" }} displayPublisherUI={false} />
          <div style={{
            width: "100%", paddingLeft: "100px", marginBottom: "440px",
            height: "fit-content", paddingRight: "100px", alignItems: "center", display: "flex", flexDirection: "column", marginBottom: "100px", marginTop: "2px",
          }}>


            <FilterCard app={app} type="card" options={{ cardType: "bigcard" }} />
            {/* <PromotionalCard app={app} type="card" options={{cardType:"bigcard"}}/> */}
            <MPMapCard app={app} type="card" options={{ cardType: "bigcard" }} />
          </div>

          <div style={{ width: "100%", marginTop: "22px", opacity: ".2", mixBlendMode: "luminosity", marginBottom:"22px" }}><hr></hr></div>
        </>}
        {/* <PublisherCard app={app} type="card" options={{cardType:"bigcard"}}/> */}


      </div>
    )

  }
}
