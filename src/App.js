import './App.css';
import { Component } from 'react';
import Dispatch from './dispatch.js';
import { forFactory } from './models/myComponents';
import ComponentListInterface from './componentListNPM/componentListInterface';
import auth from './services/auth';
import ThemeFactory from './componentListNPM/themes/themeFactory';
import navThemeFactory from './componentListNPM/navThemes/navThemeFactory';
import Home from './view/homePageStuff/home.js';
import { mapInterface } from './mapTech/mapComponentInterface.js';
// import {json} from './view/homePageStuff/fakeData';
import BuyPage from './view/buyPageStuff/buyPage';
import Admin from './view/buyPageStuff/admin';
import PublisherPage from './view/publisher/publisherPage.js';
// import NavThemeFactory from './componentListNPM/navThemes/navThemeFactory';

//fonts


//model
export default class App extends Component {
  constructor(props){
    super(props);
        this.handleChange=this.handleChange.bind(this);
        this.dispatch=this.dispatch.bind(this);
        this.setPopup= this.setPopup.bind(this);

    this.state={
      start: false,
      styles: undefined,
      phoneUIChange: 1200,
      ipadUIChange: 1201,
      loginPage: true,
      registerPage:false,
      user: undefined,
      componentListInterface: new ComponentListInterface(this.dispatch),
      componentList: undefined,
      currentCharacter: undefined,
      opps: undefined,
      themeFactory: new ThemeFactory(),
      // navFactory: new NavThemeFactory(),
      navType: "topBar",
      linkStyleDefault: {textDecoration: "none", color: "#0a0dff", cursor: "pointer"},

      switchcase: "Not Started",
      refs:[],
      
      login : true,
      operate: undefined,
      operation: "cleanJsonPrepare",
      object: undefined,
      currentComponent: undefined,
      backend: false,
      backendUpdate: undefined,
      currentComponents: [],
      backendUpdate:[],
      viewPersonTab:"assignedRoutine",
      login:false,
      searchFilter:undefined,
      backend: false,
      myswitch: "home",
      defaultTheme: "adventure",
      globalTheme: "",
      currentStudent: undefined,
      currentRoutine: undefined,
      searchState: "Campaigns",
      pubilsherFilter: ()=>{return true},
      searchTags:[],
      search:"",
      //allows to know which card is which
      switchCase:[
        {path:"/", comp:Home, name: "Home" }, 
      {path:"/admin", comp:Admin, name: "Admin" },
      ],
      idSwitchCase:[
        {path:"/purchase", comp:BuyPage, name: "purchase" }, 
        {path:"/publisher", comp:PublisherPage, name: "publisher" }, 
      ],
      

    }
  }

  async componentDidUpdate(props, state){
    
    if(this.state.updateRun){
      this.setState({popupSwitch:"", currentComponent:undefined, updateRun:undefined, checkComplete:false})
      

    }
    if(this.state.formUpdate){
      let update = this.state.formUpdate
      await this.setState({formUpdate:false});
      if(update==="checkbox"){

    }
    }
    if(this.state.backend){
      
      // await this.setState({backend: false});
      // auth.dispatch(this.state.backendUpdate, this.state.user?.getJson()?._id, this.dispatch);
      
   
    }
    
    if(this.state.operate!==undefined){
      let operate = this.state.operate;
      let operation= this.state.operation;
      let object= this.state.object;
      await this.setState({operate:undefined, object:undefined, operation:"cleanJsonPrepare"});

      
      let currentComponent = await this.state.componentListInterface.getOperationsFactory().operationsFactoryListener({operate: operate, object:object, operation: operation});
      
      
      let key = await this.state.componentListInterface.getOperationsFactory().getSplice(operate);
      if(currentComponent!==undefined){
        this.setState({currentComponent: currentComponent[key][0]});
      }
    }

    if(this.state.link!==undefined&&window.location.href!==this.state.link){
      this.setState({link:window.location.href})
    }
  
    

  }

  async dispatch(obj){

    await this.setState(obj)
}

handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
        [name]: value,
    })
}

  async componentDidMount(){
    // if(this.state.navFactory){
    //   let f = this.state.navFactory.getNavThemeFactory();
    //   let styles = f["defaultSideNav"];
      
    //   this.setState({navStyles:styles, linkStyleDefault: styles.link});

    // }

  
    if(this.state.themeFactory){
      
      let f = await this.state.themeFactory.getThemeFactory();
      let style = this.state.globalTheme!==""? this.state.globalTheme: this.state.defaultTheme!=="adventure"? this.state.defaultTheme: "adventure"
      let styles = f[style];
      
      this.setState({styles:styles});
    }
    window.addEventListener("resize", async ()=>{
      let themeFactory = new ThemeFactory();
      let f = await themeFactory.getThemeFactory();
      let style = this.state.globalTheme!==""? this.state.globalTheme: this.state.defaultTheme!==""? this.state.defaultTheme: "default"
      let styles = f[style];
      // if(window.innerWidth<=500){
        navThemeFactory.reloadComponents()
      // }
      
    })
    let list;
    if(this.state.componentListInterface && this.state.componentList===undefined){
        list= await this.state.componentListInterface.createComponentList();
        // let fakeData = json
        
        
        await this.setState({
          componentList:list,
          opps: list.getOperationsFactory()
        })
        
        
        let obj = await forFactory();
        for(const key in obj){
          
         await this.state.componentListInterface.getFactory().registerComponents({name:key, component:obj[key]});
        }

        // for(let c of fakeData){
          
        //   await list.getOperationsFactory().cleanJsonPrepareRun({["add"+c.type]:c})
        // }
        // await auth.createInitialStages(list);
          
        await auth.getAllMPItems(list);
        let user = await auth.getCurrentUser();

        if(user&&user!=="undefined"){
          if(window.location.href.includes("login")){
            window.location.href="../"
          }
          this.setState({splash:true});
          user = JSON.parse(user);
          
          await auth.getuser(user.email, list, this.dispatch);
          
         
          
        
          
        }
        await mapInterface.setAppComponent(this);
        await mapInterface.setApp(["state", "dispatch"]);
        await mapInterface.setComponentList(list);
        
        
    }

  
    this.setState({
      link:window.location.href
    })
    this.setState({ start:true});

    
  }
  async setPopup(obj, popupSwitch){
    
    await this.dispatch({currentComponent:undefined})
    await this.dispatch(obj);
    await this.dispatch({popupSwitch:popupSwitch})
  }

  //ENTIRE view
  render(){
    let styles = this.state.styles;
  return (
    <div style={{
      width:"100vw", 
      height:"100vh", 
      display:"flex", 
      background:"#111319",
      zIndex:"100",
      flexDirection:"column"}}>
      
      {this.state.start && <Dispatch app={{run:this.run, state:this.state, setPopup:this.setPopup, handlechange:this.handleChange, dispatch:this.dispatch, factory:this.factory}} />}
    </div>
  )}
}
