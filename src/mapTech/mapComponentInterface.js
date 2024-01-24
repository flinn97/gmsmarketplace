import MapFactory from "./itemTypeFactory";
import { Component } from 'react';
import ThemeFactory from "./themes/themeFactory";
import "./mapComponent.css"
class MapComponentInterface {
    factory;
    componentList;
    app;
    themeFactory;

    constructor() {
        this.getFactory();
        this.getThemeFactory();

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

    /**
     * 
     * @returns theme factory for map items
     */
    getThemeFactory() {
        if (this.themeFactory === undefined) {
            this.themeFactory = new ThemeFactory();
        }
        return this.themeFactory;
    }

    getMapComponent(props) {
        let type = props.type?props.type:"map"
        let map = this.factory.getComponent(type, props);
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
        this.filterByTag = this.filterByTag.bind(this);


        this.state = {

        }
    }

    filterByTag(list, tagList, attribute){
        list = list.filter(obj=>{
            let bool = tagList.find(tag=> {
                let tagConnect = !attribute? tag.getJson().connectedId:tag.getJson()[attribute];
                return tagConnect=== obj.getJson()._id
            });
            if(bool){
                return true;
            }
            else{
                return false
            }
        })
        return list
    }




    render() {
        let mapComponentInterface = mapInterface;
        let app = mapComponentInterface.getApp();
        let state = app?.state;
        let componentList = mapComponentInterface?.getComponentList();
        let cells = this.props.cells;
        let name = this.props.name;
        let filterFunc = this.props.filterFunc;
        let filter = this.props.filter
        let list = this.props.list ? this.props.list : filter ? componentList?.getList(name, this.props.filter?.search, this.props.filter?.attribute) : componentList?.getList(name);
        if (list) {
            list.filter((obj) => {
                if (this.props.filterFunc) {
                    return filterFunc(obj)
                }
                else {
                    return true
                }
            }
            );
        }
        
        if(this.props.tagList){
            list = this.filterByTag(list, this.props.tagList, this.props.attribute);
        }
        if(this.props.textAttributeFilter){
            list = list.filter(obj=> obj.getJson()[this.props.textAttributeFilter.attribute]===this.props.textAttributeFilter.search);
        }

        let props = { interface: mapComponentInterface, app: app, cells: cells, list: list, theme:this.props.theme, type:this.props.type, ...this.props }


        return (
            <>{mapComponentInterface.getMapComponent(props)}</>
        )
    }
}


class SearchMapComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {

        }
    }


    render() {
        let mapComponentInterface = mapInterface;
        let app = mapComponentInterface.getApp();
        let componentList = mapComponentInterface?.getComponentList();
        let name = this.props.name;
        let attribute = this.props.attribute;
        let list = this.props.list?this.props.list: componentList.getList(name);

      

        return (
            <input name={attribute} style={this.props.style} class={this.props.class? this.props.class: "flinntechInput"} onChange={(e)=>{
                const { name, value } = e.target
                if(this.props.onChange){
                    this.props.onChange(e);
                }
                else{
                    list = list.filter(obj=> obj.getJson()[attribute].toLowerCase().includes(value.toLowerCase()));
                    app.dispatch({searchTags:[...list]})
                }
            }}/>
        )
    }
}

export { MapComponent, SearchMapComponent, mapInterface }

/**

 * TODO: TEST if I can create mulitple classes to add to the factory. and test adding different themes.
 * test everythingP
 * create other really cool map options.
 * add a filter factory
 * refactor the mapComponent so that we can use multiple and also make it so that we don't have to change two things all at once. also it needs to have style ability
 * Also refactor css so that things that are the same can be in one spot
 * Check for null pointers everywhere so people can put in whatever.
 * 
 */