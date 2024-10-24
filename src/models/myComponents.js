import BaseClass from "../componentListNPM/baseClass";
import auth from "../services/auth.js";
import moment from 'moment';
class componentBase extends BaseClass{
    constructor(opps){
        super(opps);
        this.createUUID=this.createUUID.bind(this);

    }
    json;
    startobj={
        date: "",
        _id: "",
        description: "",
        title: "",
        owner: "",
        user: "",
        type: "",
        
        collection:"",
    }

    userInfo={
        about: "",
        picURL:"",
        email: "",
        firstName:"",
        lastName:"",
        password:"",
        phone: "",
        role: "",
        date: "",
        pics: "",
        
        collection:""
    }
    createUUID(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-#';
        var charactersLength = characters.length;
        for(var i =0; i<length; i++){
            result +=characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }


    
    

}



class UserThings extends componentBase{
    constructor(opps){
        super(opps);
        
    }
    json= {
        ...this.userInfo, 
        role:"teacher",
        type: "user",
        signUpDate: moment().format('L'),
        paidCustomer: false,
        _id: ""
    }

    
    
}

class Tag extends componentBase{
   
    json= {
        
        type: "tag",
        name: "",
        tagType: "",
        _id: "",
        publisher: "",
        
       

    }

    
    
}

class MPCampaign extends componentBase{
    
    json={
        type:"mpCampaign",
        name: "",
        description: "",
        _id: "",
        publisher: "",
        realizedPrice: "",
        price: "",
    }
}
class MPMap extends componentBase{
    
    json={
        type:"mpMap",
        name: "",
        description: "",
        _id: "",
        publisher: "",
        realizedPrice: "",
        price: "",
    }
}
class MPLore extends componentBase{
    
    json={
        type:"mpLore",
        name: "",
        description: "",
        _id: "",
        publisher: "",
        realizedPrice: "",
        price: "",
    }
}
class MPEncounter extends componentBase{
    
    json={
        type:"mpEncounter",
        name: "",
        description: "",
        _id: "",
        publisher: "",
        realizedPrice: "",
        price: "",
    }
}
class MPmonster extends componentBase{
    
    json={
        type:"mpMonster",
        name: "",
        description: "",
        _id: "",
        publisher: "",
    }
}
class MPImage extends componentBase{

    json={
        type:"mpImage",
        name: "",
        description: "",
        _id: "",
        publisher: "",
        realizedPrice: "",
        price: "",
    }
}
class Promotional extends componentBase{
    json= {
        
        type: "promotional",
        name: "",
        tagType: "",
        _id: "",
        publisher: "",
       

    }
}

class Buy extends componentBase{
    json={
        type:"buy",
        email:"",
        boughtItem:"",
        _id: "",
        publisher: "",
    }
}
class MarketplaceItem extends componentBase {
    constructor(opps) {
        super(opps);

    }
    json = {
        type: "mpItem",
        id: "",
    }

}

class Publisher extends componentBase{
    json = {
        type:"publisher",
        name:""
      }
}

class Feature extends componentBase{
    json = {
        type:"feature",
        name:"",
        picURL:"",
        featurePosition:"",
        mpId:""
      }
}

function forFactory(){
    return { user: UserThings, feature:Feature, tag:Tag, mpCampaign:MPCampaign, mpItem:MarketplaceItem, publisher:Publisher, mpEncounter:MPEncounter, mpMonster:MPmonster,mpMap:MPMap, mpLore:MPLore, promotional:Promotional, mpImage:MPImage ,buy:Buy }
}


export {forFactory}
