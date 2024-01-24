import './App.css';
import { Component } from 'react';
import logo from './pics/DreamMakers.png'
// import Home from './view/home';
import Nav from './componentListNPM/navTech/nav.js';
// import Login from './view/login';
// import Register from './view/register';
import './index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './componentListNPM/componentForms/fullForms/registrationStuff/dreammakerLogin';
import Register from './view/register';
import BuyPopup from './view/buyPageStuff/buyPopup';
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
  constructor(props){
    super(props);
  
  }
  componentDidMount(){
  
  }


  render(){
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let center = window.innerWidth<1200? {
      display: "flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }: undefined
  return (
<BrowserRouter>

{/* {state.splash&&(<Splash app={app} />)}/ */}
{/* {(!state.login || state.keepLogin)&&(
  <div style={{zIndex: state.keepLogin&& ("-10000"), opacity:state.keepLogin&& ("0"), position: state.keepLogin&&("absolute")}}>
    {window.location.href.includes("signup")?(
<Register app={app} />
):(
  <Login app={app } />
  )}
  
  </div>
)}
{state.login&&( */}
  
    <div style={{
      width:"100%", 
      height:"96vh",
      }}>
        {/* {state.user&&( */}
        <>
     <Nav  app={app} type="topBarNav"  template="legato"  theme="legato"
     options={{
      
     }}
  
     
     /> 
     {/* //notification: int variable of watching something? Or string pointing to type that gets info from object for notification. Object contains function for notifications, and it goes and interacts with it. Either give it a string or a User Object. */}
    <div style={{}}>
    {state.popupSwitch === "buyPopup" &&state.currentComponent!==undefined  &&<BuyPopup type="popup" options={{ cardType: "popupSmallSolid" }} app={app} handleClose={() => { app.dispatch({ popupSwitch: "", currentComponent: undefined }) }}/>}
     <Routes>
      {state.switchCase?.map((obj, index)=>
        <Route path={obj.path} element={<obj.comp app={app}/>} />
      )}
      {/* <Route path="/signup" element={<Register app={app} />} /> */}
      {state.idSwitchCase?.map((obj, index) =>
                <Route path={obj.path + "/:id"} element={<obj.comp app={app} />} />

              )}

      {state.switchCase?.filter(obj => obj.idLink === true).map((obj, index) =>
                <Route path={obj.path + "/:id"} element={<obj.idLinkComp app={app} />} />

              )}
      
</Routes>
</div>
</>
{/* )} */}
     </div>
       {/* )} */}


     </BrowserRouter>
  )}
}