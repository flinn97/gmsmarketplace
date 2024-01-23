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
        _id: ""
        
       

    }

    
    
}

class MPCampaign extends componentBase{
    
    json={
        type:"mpCampaign",
        name: "",
        description: "",
        _id: ""
    }
}
class MPMap extends componentBase{
    
    json={
        type:"mpMap",
        name: "",
        description: "",
        _id: ""
    }
}
class MPLore extends componentBase{
    
    json={
        type:"mpLore",
        name: "",
        description: "",
        _id: ""
    }
}
class MPEncounter extends componentBase{
    
    json={
        type:"mpEncounter",
        name: "",
        description: "",
        _id: ""
    }
}
class MPmonster extends componentBase{
    
    json={
        type:"mpMonster",
        name: "",
        description: "",
        _id: ""
    }
}
class MPImage extends componentBase{

    json={
        type:"mpImage",
        name: "",
        description: "",
        _id: ""
    }
}
class Promotional extends componentBase{
    json= {
        
        type: "promotional",
        name: "",
        tagType: "",
        _id: ""
        
       

    }
}


function forFactory(){
    return { user: UserThings, tag:Tag, mpCampaign:MPCampaign, mpEncounter:MPEncounter, mpMonster:MPmonster,mpMap:MPMap, mpLore:MPLore, promotional:Promotional, mpImage:MPImage  }
}


export {forFactory}
