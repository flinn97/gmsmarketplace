
/**
 * factory for getting different items for the map component
 */
export default class FilterFactory {
    factory = {
        text: textAttributeFilter,
        tag: filterByTag,
        plain: textFilter,
        





    }

    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    getFilter(type) {
        if(type){
            return this.factory[type];
        }

    }

    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
    registerFilter(type, filter){
        this.factory[type] = filter
    }


}

function filterByTag(json){
   let  {list, attribute, tagList} = json;
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

function textAttributeFilter(json){
    let {list, attribute, search} = json;
    list = list.filter(obj=> obj.getJson()[attribute]?.toLowerCase().includes(search?.toLowerCase()));
    return list;
}

function textFilter(json){
    let {list, attribute, search} = json;
    list = list.filter(obj=> obj[attribute]?.toLowerCase().includes(search?.toLowerCase()));
    return list;
}