import { Component } from 'react';
import InputFormComponent from './inputComponent';
import CheckBox from '../componentListNPM/componentForms/singleForms/checkComponent';

/**
 * Design Pattern factory: creational pattern for creating objects.
 */
class FormFactory {
    factory = {
        text: InputFormComponent,
        check: CheckBox,

    }
    /**
    * get a map item
    * @param {*} type 
    * @param {*} obj 
    * @returns a react item for the map
    */
    getComponent(type, props) {
        let Comp = undefined
        if (this.factory[type]) {
            Comp = this.factory[type]

        }
        return <Comp props={props} />;

    }

    /**
     * register any new form that someone wants to use.
     */
    registerComponent(type, comp) {
        this.factory[type] = comp

    }





}





export { FormFactory }

