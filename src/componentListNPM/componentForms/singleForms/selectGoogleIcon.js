import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import bookmark from '../../../icons/bookmark.svg';
import bulb from '../../../icons/bulb.svg';
import calendar from '../../../icons/calendar.svg';
import chatIcon from '../../../icons/chat.svg';
import dashboardIcon from '../../../icons/dashboard.svg';
import check from '../../../icons/list-check.svg';
import megaphone from '../../../icons/megaphone (1).svg';
import star from '../../../icons/star.svg';
import studentIcon from '../../../icons/students.svg';
import users from '../../../icons/users.svg';






class SelectGoogleIcon extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.getRandomPicture=this.getRandomPicture.bind(this);
        this.state = {
            icons:[bookmark, bulb, calendar, chatIcon, dashboardIcon, check, megaphone, star, studentIcon, users]

        };
    }
    getRandomPicture() {
        const pictures = [
          ...this.state.icons
        ];
    
        const randomIndex = Math.floor(Math.random() * pictures.length);
        return pictures[randomIndex];
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
       if(this.props.autoApply){
        let icon = this.props.name?this.props.name:"picURL"
        for(let ob of obj){
            if(ob.getJson()[icon]!== undefined &&ob.getJson()[icon]!== ""){
                ob.setCompState({[icon]: this.getRandomPicture()})

            }

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

   
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }



        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle? this.props.wrapperStyle: theme!==undefined? theme.runbuttonWrapperStyle:{width:"100%", height:"100%",  borderRadius:"7px", display:"flex", flexWrap:'wrap', flexDirection:"row"}} className={this.props.wrapperClass}>
                {this.state.icons.map((img, index)=>
                <img style={{border:this.state.img===img?"1px solid #10A37F":"none", borderRadius:"3px", width: "40px", margin: "10px"}} src = {img}  onClick={()=>{
                    this.setState({img:img})
                    for(let obj of this.state.obj){
                        obj.setCompState({[this.props.name?this.props.name:"picURL"]: img})

                    }
                    
                }}/>
                )}
            </div>
        );
    }
}



export default SelectGoogleIcon;