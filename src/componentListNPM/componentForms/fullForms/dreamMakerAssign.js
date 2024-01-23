import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';

import MapComponent from '../../mapTech/mapComponent';

class DreamMakerAssign extends Component {
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
        let obj =   this.props.obj? this.props.obj: this.props.app?.state?.currentComponent;
       if(obj){
        obj = this.isArray(obj)
       }
       this.setState({
        obj:obj,
        start:true
       })
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
        let app = this.props.app

   
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }



        return (
            <div ref={this.wrapperRef} 
            style={this.props.wrapperStyle? this.props.wrapperStyle: 
            theme!==undefined? theme?.DreamMakerAssign:
            {width:"100%", height:"100%",  borderRadius:"7px", display:"flex", flexWrap:'wrap', flexDirection:"column"}} 
            className={this.props.wrapperClass}
            >
                {this.state.obj!==undefined&&(
                <div style={this.props.mapWrapperStyle? this.props.mapWrapperStyle: theme!==undefined? theme.mapWrapperStyle:{width:"100%", height:"100%",  borderRadius:"7px", display:"flex", flexWrap:'wrap', flexDirection:"column"}} className={this.props.mapContainerStyle}>
               
                <MapComponent app={app} name={this.props.mapName} 
                filter={this.props.filter?{...this.props.filter}:undefined} 
                theme={this.props.mapTheme?this.props.mapTheme:"dreamMakerAssign"}
                cells={[this.props.item1?this.props.item1:{img:"picURL"}, this.props.item2?{...this.props.item2, style:{width:"120px"}}:{json:"name", style:{width:this.props.arr?"120px":"328px"}}, 
                this.props.arr?[...this.props.arr]:"", 
                this.props.customItem?this.props.customItem: {custom:AssignButton, props:{app:app, changeList:this.state.obj, props:this.props}}]}/>

                </div>
                )}
            </div>
        );
    }
}



export default DreamMakerAssign;

class AssignButton extends Component{
    constructor(props) {
        super(props);
       this.state={}

        };
    render(){
        let app = this.props.app
        let props = this.props?.props?.props;
   
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        return(
            <div style={{position:"relative",display:"flex", alignItems:"flex-end", flexDirection:"column", marginLeft:window.innerWidth<1550?"1vw":window.innerWidth<1700?"2vw":window.innerWidth<1800?"4.5vw":"5.5vw", marginBottom:"25px"}}>
            <div style={{background: "#3CB371", borderRadius: "15px", width: "100px", height: "30px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", position:"absolute", right:0}} onClick={async ()=>{
                
                this.setState({accept:true})
                let changeList = this.props.props.changeList;
                let assign = this.props.obj;
                let arr = [];
                for(let obj of changeList){
                    let addJson= {...props.addJson};
                    for(const key in addJson){
                        let js = addJson[key]
                        if((typeof js === 'string' || js instanceof String) ){
                            if( js.includes("get")){
                                let str = js.substring(3)
                                addJson[key] = assign.getJson()[str]
                            }
                        }
                        
                    }
                    let json = {...obj.getJson(), _id: Math.floor(Math.random()*100000).toString(),  type:props.type, ...addJson}
                    arr.push(json);
                }
                await app.state.opps.cleanJsonPrepareRun({["add"+[props.type]]: arr})
                if(props.func){
                    
                    props.func(changeList, arr, this.props.obj)
                }

                
            }}>{!this.state.accept?(<>{this.props.text?this.props.text:"Assign"}</>):(<>{this.props.acceptedText?this.props.acceptedText:"Assigned"}</>)}</div></div>
        )
    }
}