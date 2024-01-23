import React, { Component } from 'react';
import downArrow from "../../icons/angle-down.svg"
import upArrow from "../../icons/angle-up.svg"



class MapSortUpDown extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            obj:undefined

        };
    }
   
    /**
     * Allows for updating multiple objects with one form.
     * @param {*} obj 
     * @returns 
     */
    isArray(obj){
        let arr;
        if(Number.isInteger(obj)){
            arr = obj;
        }
        else{
            arr = Array.isArray(obj)? obj: [obj];
        }
        return arr
    }

    componentDidMount() {
        let app = this.props.app;
        let state = app.state;
        let componentList = state.componentList;
        let obj =   this.props.obj? this.props.obj: this.props.app?.state?.currentComponent;
       if(obj){
        obj = this.isArray(obj)
       }
       this.setState({
        obj:obj,
        start:true
       })
       if(this.props.obj){
        let list = componentList.getList(this.props.obj?.getJson()?.type, state.currentRoutine?.getJson()?._id, "routineID");
        let order = 0;
        for(let ob of list){
         if(ob.getJson()?.order!==order){
             ob.setCompState({order:order});
         }
         order++;
         state.opps.cleanPrepareRun({update:list});
        }
       }
       
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
        }
    }
    render() {
        let app = this.props.app;
        let state = app.state;
        let componentList = state.componentList;
        let opps = state.opps;

   
        let theme= undefined;
        // if(this.props.theme){
        //     theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        // }



        return (
            <div ref={this.wrapperRef} 
            style={this.props.wrapperStyle? this.props.wrapperStyle: 
            theme!==undefined? theme?.DreamMakerAssign:
            {  display:"flex", flexDirection:"rown"}} 
            className={this.props.wrapperClass}
            >
                {state.currentRoutine&&(<>
                {componentList.getList(this.props.obj?.getJson()?.type, state.currentRoutine?.getJson()?._id, "routineID").indexOf(this.props.obj)!==0 &&(
                <div onClick={()=>{
                    
                    let obj = this.props.obj;
                    let order = obj.getJson()?.order;
                    let list = componentList.getList(obj?.getJson()?.type, state.currentRoutine?.getJson()?._id, "routineID");
                    let componentUp = list[order-1];
                   
                    obj.setCompState({order: order-1})
                    componentUp.setCompState({order:order});
                    
                    componentList.sortSelectedList("assignedCard", "order");
                    opps.prepareRun({update:[obj, componentUp]});
                    

                    // TODO add up icon
                }}><img src={upArrow} style={{width: "20px", margin: "0px 5px"}}/></div>
                )}

{componentList.getList(this.props.obj?.getJson()?.type, state.currentRoutine.getJson()?._id, "routineID").indexOf(this.props.obj)!==componentList.getList(this.props.obj?.getJson()?.type, state.currentRoutine?.getJson()?._id, "routineID").length-1&&(
                <div onClick={()=>{
                    
                    let obj = this.props.obj;
                    let order = obj.getJson()?.order;
                    let list = componentList.getList(obj.getJson()?.type, state.currentRoutine?.getJson()?._id, "routineID");
                    let componentDown = list[order+1];
                    obj.setCompState({order: order+1})
                    componentDown.setCompState({order:order});
                    componentList.sortSelectedList("assignedCard", "order");
                    opps.prepareRun({update:[obj, componentDown]});
                    

                    // TODO add down icom
                }}><img src={downArrow} style={{width: "20px", margin: "0px 5px"}}/></div>
)}</>)}
            </div>
        );
    }
}



export default MapSortUpDown;

