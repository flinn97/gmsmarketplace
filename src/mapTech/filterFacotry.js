
/**
 * factory for getting different items for the map component
 */
export default class FilterFactory {
    factory = {
        text: textAttributeFilter,
        tag: filterByTag,
        plain: textFilter,
        textAndTag: filterByTextThenTitle,
        textAndTag2: filterByTitleThenTagText





    }

    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    getFilter(type) {
        if (type) {
            return this.factory[type];
        }

    }

    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
    registerFilter(type, filter) {
        this.factory[type] = filter
    }


}

function filterByTag(json) {
    let { list, attribute, tagList } = json;
    if (list.length > 0) {
        list = list.filter(obj => {
            let bool = tagList.find(tag => {
                let tagConnect = !attribute ? tag.getJson().connectedId : tag.getJson()[attribute];
                return tagConnect === obj.getJson()._id
            });
            if (bool) {
                return true;
            }
            else {
                return false
            }
        })
    } return list


}

function filterByTagText(json) {
    let list = [];
    if (json.search && json.list) { // Check if search and list are provided
        const tags = json.search.toLowerCase().split(' ').map(tag => tag.trim());
        list = json.list.filter(obj => {
            const objTags = obj.getJson()[json.attribute || "tags"];
            if (objTags) { // Check if the attribute exists
                
                let splitTags = objTags.split(json.splitStr || ',');
                splitTags = splitTags.map(tag=>tag.toLowerCase())
                for(let tag of tags){
                    if(splitTags.includes(tag)){
                        return true
                    }
                }
            } else {
                return false; // Object doesn't have the specified attribute
            }
        });
    }
    return list;

}



/**
 * 
 * @param {*} json 
 * @returns filtered list of things by title and then by tags.
 */
function filterByTitleThenTagText(json) {
    
    
    let { list, attributes, search } = json;
    let newList = [];
    let nameList = [];
    let aList = attributes.split(",");
    for (let str of aList) {
        nameList.push(textAttributeFilter({ ...json, attribute: str }))
    }
    //filter by tags text
    let newTagList = filterByTagText({ ...json });
        newList = [...nameList[0], ...newTagList, ...nameList[1], ...nameList[2]]
    
    
    newList = filterRemoveDupes(newList);
    return newList
}


function filterByTextThenTitle(json) {
    let { list, attribute, tagList, attribute2, attributeTag, search } = json;
    let nameList = textAttributeFilter({ ...json, attribute: attribute });
    let newTagList = filterByTag({ ...json, attribute: attributeTag });
    let promoList = textAttributeFilter({ ...json, attribute: attribute2 });
    list = [...nameList, ...newTagList, ...promoList]
    let newList = filterRemoveDupes(list);
    return newList
}

function filterRemoveDupes(list) {
    const uniqueItems = new Map();

    list.forEach(item => {
        const itemJson = item.getJson();
        const itemId = itemJson._id;
        if (!uniqueItems.has(itemId)) {
            uniqueItems.set(itemId, item);
        }
    });

    return Array.from(uniqueItems.values());
}

function textAttributeFilter(json) {

    let { list, attribute, search } = json;
    if (search && search.length > 0) {
        list = list.filter(obj => obj.getJson()[attribute]?.toLowerCase().includes(search?.toLowerCase()));
    }
    return list;
}

function textFilter(json) {
    let { list, attribute, search } = json;
    if (search && search.length > 0) {
        list = list.filter(obj => obj[attribute]?.toLowerCase().includes(search?.toLowerCase()));
    }
    return list;
}