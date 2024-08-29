import './App.css';
import { Component } from 'react';
import logo from "./pics/logoava2.png"

import Nav from './componentListNPM/navTech/nav.js';
// import Login from './view/login';
// import Register from './view/register';
import './index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './view/login.js';
import BuyPopup from './view/buyPageStuff/buyPopup';
import FreePopup from './view/buyPageStuff/gotFreePopup.js';
import LoginLogout from './view/components/loginLogoutProfile';

// import DeletePopup from './view/deletePopup';
// import KeepDel from './view/keepDelete';

//model
/**
 * props
 * template
 * theme
 * type
 * options
 * obj
 * 
 * Options for nav for all current themes
 * logoImageTheme
 * logoImageSyle
 * logoTheme - type
 * logoWrapperTheme
 * logoWrapperStyle
 * navItemTheme
 * navItemStyle
 * obj.navItemTheme
 * obj.navItemStyle
 * activeNavItemTheme
 * activeNavItemStyle
 * obj.activeNavItemTheme
 * obj.activeNavItemStyle
 * singleLinkWrapperTheme
 * singleLinkWrapperStyle
 * obj.singleLinkWrapperTheme
 * obj.singleLinkWrapperStyle
 * activeSingleLinkWrapperTheme
 * activeSingleLinkWrapperStyle
 * obj.activeSingleLinkWrapperTheme
 * obj.activeSingleLinkWrapperStyle
 * obj.linkIcon
 * linkIconTheme
 * linkIconStyle
 * obj.linkIconTheme
 * obj.linkIconStyle
 * notifyTheme
 * notifyStyle
 * obj.notifyTheme
 * obj.notifyStyle
 * linksWrapperTheme
 * linksWrapperStyle
 * linksTheme - type
 * profilePicInnerWrapperTheme
 * profilePicInnerWrapperStyle
 * profilePicImageTheme
 * profilePicImageStyle
 * profilePicWrapperTheme
 * profilePicTheme - type
 * sectionOneStyle
 * sectionOneTheme
 * sectionTwoStyle
 * sectionTwoTheme
 * sectionThreeStyle
 * sectionThreeTheme
 * sectionsContainerStyle
 * sectionsContainerTheme
 * navContainerStyle
 * navContainerTheme
 * 
 */
export default class Dispatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      

    };
    
  }
  componentDidMount() {
   
  }

  componentWillUnmount() {
   
  }

  


  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    let center = window.innerWidth < 1200 ? {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    } : undefined
    return (
      <BrowserRouter>



        <div style={{
          width: "100%",
          height: "96vh",
        }}>
          {/* {state.user ? ( */}
          <>


            {/* //notification: int variable of watching something? Or string pointing to type that gets info from object for notification. Object contains function for notifications, and it goes and interacts with it. Either give it a string or a User Object. */}
            <div style={{
              position: "fixed", top: "0px", left: "0px", width: "100vw", height:"100px",
              justifyContent: "center", padding: "2px", display: "flex",
              textAlign: "center", flexDirection: "row", transition: "top 0.3s ease-in-out",
              background:styles.colors.color1+'22',
              zIndex: 1000 
            }}>
              <img style={{ width: "100px", marginTop: "-2px" }} src={logo} alt="Logo" />
              <div style={{ position: "absolute", right: "2vw", top: "3vh", cursor: "pointer", }}>
                <LoginLogout app={app} />
              </div>
            </div>

            <div style={{ width: "100%", marginTop:"100px"}}>
              {state.popupSwitch === "gotFreePopup" && state.currentComponent !== undefined &&
                <FreePopup type="popup" options={{ cardType: "popupSmallest" }} app={app}
                  handleClose={() => { app.dispatch({ popupSwitch: "", currentComponent: undefined, payment: "" }) }} />}
              {state.popupSwitch === "buyPopup" && state.currentComponent !== undefined && <BuyPopup type="popup" options={{ cardType: "popupCreate" }} app={app} handleClose={() => { app.dispatch({ popupSwitch: "", currentComponent: undefined, payment: "" }) }} />}
              <Routes>
                {state.switchCase?.map((obj, index) =>
                  <Route path={obj.path} element={<obj.comp app={app} />} />
                )}
                {/* <Route path="/signup" element={<Register app={app} />} /> */}
                {state.idSwitchCase?.map((obj, index) =>
                  <Route path={obj.path + "/:id"} element={<obj.comp app={app} />} />

                )}

                {state.switchCase?.filter(obj => obj.idLink === true).map((obj, index) =>
                  <Route path={obj.path + "/:id"} element={<obj.idLinkComp app={app} />} />

                )}
                {!state.user && <Route path={"/login"} element={<Login app={app} />} />}

              </Routes>
            </div>
          </>

        </div>


      </BrowserRouter>
    )
  }
}