import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy, limit } from "firebase/firestore";
import { db, storage, auth } from '../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail, updateEmail, deleteUser } from "firebase/auth";
import hashService from "./hashService.js";

class Auth {
    loginReturnURL= "../"
    urlEnpoint = "MP"

    setLoginReturnURL(url){
        this.loginReturnURL= url;
    }
    getLoginReturnURL(){
        return this.loginReturnURL
    }
    async getCurrentUser() {
        return localStorage.getItem("user");
    }
    async setCurrentUser(student) {
        await localStorage.setItem("user", JSON.stringify(student));
    }

    async getFeaturesByUser(componentList, userId){
        let rawData = [];
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where("type", '==', "feature"), where("owner", "==", userId));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
                rawData.push(data);
            
        }
        await componentList.addComponents(rawData, false);
        return componentList.getList("feature")
    }



    async firebaseGetter(value, componentList, attribute, type) {
        let list = componentList.getComponents();
        let IDlist = [];
        for (const key in list) {
            IDlist.push(list[key].getJson()?._id)
        }
        let rawData = [];
        const components = await query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where(attribute, '==', value));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
            if (!IDlist.includes(data._id)) {
                rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
        if (type) {
            return componentList.getList(type, value, attribute)
        }
        else {
            return true;

        }

    }
    async getAllMPItems(componentList){
        const components =  query(collection(db,  "MPusers","MPAPP", "components"), where('type', '!=', "user"));
        let comps = await getDocs(components);
        let rawData = comps.docs.map(doc => doc.data());
        await componentList.addComponents(rawData, false);
        const components1 =  query(collection(db,  "GMSusers","GMSAPP", "components"), where('type', '==', "user"), where('partner', '==', true));
        let comps1 = await getDocs(components1);
        
        let rawData1 = []
        for(let doc of comps1.docs) {
            let d = await doc.data();
            d.type="publisher";
            d.hash =  await hashService.hashEmail(d._id);
            rawData1.push(d);
        }
        await componentList.addComponents(rawData1, false);
    }

    async getuser(email, componentList, dispatch) {

        try {
            
            let list = componentList.getComponents();
            let IDlist = [];
            for (const key in list) {
                IDlist.push(list[key]?.getJson()?._id)
            }
            let rawData = [];
            let publisher;

   

            const components =  query(collection(db, "GMSusers", "GMSAPP", "components"), where('_id', '==', email), orderBy("date"));
            let comps = await getDocs(components);
            for (const key in comps.docs) {
                let data = comps.docs[key].data()
                if (!IDlist.includes(data._id)) {
                   
                    rawData.push(data);
                }
                else{
                    publisher = componentList.getComponent("publisher", data._id)
                }
            }
            const components1 =  query(collection(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components"), where('_id', '==', email), orderBy("date"));
            let comps1 = await getDocs(components1);
            for (const key in comps1.docs) {
                let data = comps1.docs[key].data()
                if (!IDlist.includes(data._id)) {
                    if(data.type==='campaign'){
                        data.type="mpCampaign"
                    }
                    rawData.push(data);
                }
            }
            await this.getAllMPItems(componentList);


            await componentList.addComponents(rawData, false);
            let user = publisher|| componentList.getComponent("user");
 

            if (dispatch) {
           
                    dispatch({
                        login: true, email: email, user: user, keepLogin: false,

                    })

                }

            }
        
        catch (e) {
            console.log(e)
        }
    }
    

    async GetAllData(email, componentList, dispatch) {

        let rawData = [];
        const components = await query(collection(db, "users"));
        // let comps= await getDocs(components);

        let comps = await getDocs(components);


        rawData = [];
        let emails = [];


        for (const key in comps.docs) {

            let data = comps.docs[key].data()
            if (!emails.includes(data.email)) {
                rawData.push(data);
                emails.push(data.email)

            }
        }
        for (const key in emails) {
            const components1 = await query(collection(db, "users", emails[key], "components"));

            let rawData1 = [];

            // let comps= await getDocs(components);
            let comps1 = await onSnapshot(components1, async (querySnapshot) => {


                rawData1 = [];



                for (const key in querySnapshot.docs) {

                    let data = querySnapshot.docs[key].data()
                    rawData1.push(data);
                }

                await componentList.addComponents(rawData1, false);
                if (emails[key] === emails[emails.length - 1]) {
                    await localStorage.setItem("email", JSON.stringify(email));

                    await dispatch({ email: email, login: false });
                }




            });


        }



    }

    async login(email, password, componentList, dispatch) {


        let user;
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
        if (user) {
            let saveUser = user

            if (componentList !== undefined && dispatch !== undefined) {
                await localStorage.setItem("user", JSON.stringify(saveUser));
                if(window.location.href.includes("login")){
                    window.location.href=this.loginReturnURL
                  }

                await this.getuser(email, componentList, dispatch);

            }




        }
        return user;
    }
   
    async register(email, password, addToCache) {

        let user;
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
        if (addToCache) {
            localStorage.setItem("user", JSON.stringify(user));

        }

        return user;
    }

    async logout() {
        await localStorage.clear();
        let logouser;
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                logouser = user.uid;
                // ...
            }
        })
        if (logouser) {
            await signOut(auth);

        }
        window.location.reload();
    }
    async uploadPics(pic, name) {
        const storageRef = ref(storage, name);
        await uploadBytes(storageRef, pic).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
    async downloadPics(name) {
        let src;
        await getDownloadURL(ref(storage, name)).then((url) => {

            src = url;
        })
        return src;
    }
    deletePics(name) {
        //
        const delRef = ref(storage, name);
        // Delete the file
        deleteObject(delRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }
    /**
         * 
         * @param {*} role 
         * @param {*} id 
         * @param {*} changeData 
         * @returns change any data I want.
         */
    async dispatch(obj, email, dispatch, backendReloader) {
        
        for (const key in obj) {
            let operate = obj[key];
            for (let i = 0; i < operate.length; i++) {
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
                let component = key !== "del" ? { ...operate[i].getJson() } : operate[i];

                for (const key in component) {

                    if (component[key] === undefined) {
                        component[key] = "";
                    }
                    if(Array.isArray(component[key])){
                        component[key] =""
                    }
                }

                try {


                    switch (key) {
                        case "add":
                            if (email === undefined) {
                                email = component.owner
                            }
                            component.collection = email;
                            if (!component.owner) {
                                component.owner = email
                            }
                            if(component.type ==="user"){
                                component._id = email;
                            }
                            component.date = await serverTimestamp();
                            await setDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component._id), component);
                            break;
                        case "del":


                            await deleteDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component));
                            break;
                        case "update":
                            if(component.type !=="post"){
                                component.date = await serverTimestamp();

                            }

                            await updateDoc(doc(db, this.urlEnpoint + "users", this.urlEnpoint + "APP", "components", component._id), component);
                            break;
                    }
                } catch (error) {
                    console.log(error);
                    console.log(component)
                }

            }
        }
        
        if (dispatch) {
            

            dispatch({ dispatchComplete: true, data: obj })

        }
        if(backendReloader){
            window.location.reload();
        }
    }

}

export default new Auth();