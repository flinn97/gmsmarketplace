import './App.css';
import { Component } from 'react';
import { forFactory } from './models/myComponents';
import ComponentListInterface from './componentListNPM/componentListInterface';
import { ParentFormComponent, formComponentInterface } from './formTech/formComponentInterface';
import TextAreaFormComponent from './formTech/textAreaComponent';

export default class App1 extends Component {
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
   
      // navFactory: new NavThemeFactory(),
      navType: "topBar",
      linkStyleDefault: {textDecoration: "none", color: "black", cursor: "pointer"},

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
      defaultTheme: "dreamMaker",
      globalTheme: "",
      currentStudent: undefined,
      currentRoutine: undefined,
      searchState: "Campaign",
      //allows to know which card is which
      switchCase:[
      

      ]

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

    let formFactory = formComponentInterface.getFormFactory();
    await formFactory.registerComponent("textArea", TextAreaFormComponent);

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
          
    }

  
    this.setState({ start:true});

    
  }
  async setPopup(obj, popupSwitch){
    
    await this.dispatch({currentComponent:undefined})
    await this.dispatch(obj);
    await this.dispatch({popupSwitch:popupSwitch})
  }

  //ENTIRE view
  render(){
  return (
    <div style={{
      width:"100vw", 
      height:"100vh", 
      display:"flex", 
      zIndex:"100",
      flexDirection:"column"}}>
        
      
      {this.state.start && 
      <>
      <ParentFormComponent type = "textArea" props={{}}/>
      <ParentFormComponent type = "text" props={{}}/>
      <ParentFormComponent type = "check" props={{}}/>

      </>}
    </div>
  )}
}
