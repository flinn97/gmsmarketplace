import { Component } from 'react';
import { FormFactory } from './formFactory';
import BaseClass from './baseClass';
/**
 * Design Pattern Interface: Technology that helps you use a different technology easily 
 */
class FormComponentInterface {
    formFactory;


    constructor() {
        this.getFormFactory();

    }
    /**
     * 
     * @returns factory for form items
     * design pattern singlton: there is only one existence of the instance
     */
    getFormFactory() {
        if (this.formFactory === undefined) {
            this.formFactory = new FormFactory();
        }
        return this.formFactory;
    }

    /**
     * 
     * @param {*} props 
     * @returns the parent form for various forms. 
     */
    getParentFormComponent(type, props) {
        debugger
        let form = this.formFactory.getComponent(type, props);
        return form;

    }




}
//proxy
let formComponentInterface= new FormComponentInterface();


/**
 * design pattern bridge: separates 2 different components but allows them to use each other.
 */
class ParentFormComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let type = this.props.type;
        let props = this.props;
        return(
            <>{formComponentInterface.getParentFormComponent(type,props)}</>
        )


    }
}








export { formComponentInterface, ParentFormComponent, BaseClass }

