import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';

class InputToTextBoxComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max
        };
    }
    handleChange(e) {

        
        let { name, value } = e.target;
        
        this.setState({ value: value });
        if(!this.props.updateOnClickOutside){
            this.props.handleChange(e);

        }
    }
    componentDidUpdate(){
        if(this.props.app?.state.updateInput){
            this.setState({textBox:false})
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({textBox:false})
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
            if(this.props.updateOnClickOutside){
                
                this.props.objDispatch(this.state.value);

            }
        }
    }
    render() {
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        let inputType = {
            required: <textarea 
            cols ={this.props.cols?this.props.cols:""}
            rows ={this.props.rows?this.props.rows:5}
            resize={this.props.resize?this.props.resize:true}
            className={this.props.class ? this.props.class : "form-control"}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            name={this.props.name}
            value={this.state.value}
            min={this.state.min}
            max={this.state.max}
            autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
            style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.textBoxStyle:undefined}
            id={this.props.id}
            checked={this.props.checked}
            spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            onClick={this.props.onClick}
                required
               
            ></textarea>,
            normal: <textarea 
            cols ={this.props.cols?this.props.cols:""}
            rows ={this.props.rows?this.props.rows:5}
            resize={this.props.resize?this.props.resize:true}
                type={this.props.type}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                name={this.props.name}
                value={this.state.value}
                min={this.state.min}
                max={this.state.max}
                onClick={this.props.onClick}
                autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
                style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.textBoxStyle:undefined}
                id={this.props.id}
                checked={this.props.checked}
                spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
                minLength={this.props.minLength}
                maxLength={this.props.maxLength}
            ></textarea>,
            disabled: <textarea 
            cols ={this.props.cols?this.props.cols:""}
            rows ={this.props.rows?this.props.rows:5}
            resize={this.props.resize?this.props.resize:false}
            id={this.props.id}
                type={this.props.type}
                style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.textBoxStyle:undefined}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onClick={this.props.onClick}
                disabled


            ></textarea>
        }





        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle?{...this.props.wrapperStyle, position:"relative"}:theme!==undefined? {...theme.textBoxWrapperStyle, position:"relative"}:{width:"300px", position:"relative"}} className={this.props.wrapperClass}>
                {this.state.textBox &&(<div onClick={()=>{this.setState({textBox:false})}} style={{position:"absolute", right:"0", top:"0"}}>X</div>)}
                {this.props.label && (<label style={this.props.labelStyle?this.props.labelStyle:theme!==undefined? theme.textBoxLabelStyle:undefined} className={this.props.labelClass}>{this.props.label}</label>)}
                {!this.state.textBox?(
                <input type="text" value={this.state.value} style={this.props.inputStartStyle?this.props.inputStartStyle:theme!==undefined?theme.inputStart:undefined} onClick={()=>{this.setState({textBox:true})}} />):(
                <>{inputType[this.props.input]}</>)}
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>

        );
    }
}



export default InputToTextBoxComponent;