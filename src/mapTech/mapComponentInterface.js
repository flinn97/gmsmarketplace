import MapFactory from "./itemTypeFactory";
import { Component } from 'react';
class MapComponentInterface {
    factory;
    componentList;
    app;

    constructor() {
        this.getFactory();

    }
    /**
     * 
     * @returns factory for map items
     */
    getFactory() {
        if (this.factory === undefined) {
            this.factory = new MapFactory();
        }
        return this.factory;
    }

    getMapComponent(props) {
        let map = this.factory.getComponent("map", props);
        return map;

    }

    setApp(app) {
        this.app = app;
    }
    getApp() {
        return this.app
    }
    setComponentList(c) {
        this.componentList = c;
    }
    getComponentList() {
        return this.componentList
    }


}
const mapInterface = new MapComponentInterface()



//model
class MapComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {

        }
    }


    render() {
        
        let mapComponentInterface = mapInterface;
        let app = mapComponentInterface?.getApp();
        let state = app?.state;
        let componentList = mapComponentInterface?.getComponentList().list;
        let cells = this.props.cells;
        let name = this.props.name;
        let filterFunc = this.props.filterFunc;
        let filter = this.props.filter
        debugger
        let list = this.props.list ? this.props.list : filter ? componentList?.getList(name, this.props.filter?.search, this.props.filter?.attribute) : componentList?.getList(name);
        if (list) {
            list = list.filter((obj) => {
                if (this.props.filterFunc) {
                    let bool = filterFunc(obj);
                    return bool
                }
                else {
                    return true
                }
            }
            );
        }

        let props = { interface: mapComponentInterface, app: app, cells: cells, list: list }


        return (
            <>{mapComponentInterface.getMapComponent(props)}</>
        )
    }
}

export { MapComponent, mapInterface }

/**
 * TODO: completely customizable with css and styling.
 * TODO: TEST if I can create mulitple classes to add to the factory.
 * TODO: create theme based usage but off of css not styles.
 */