import React, { Component } from 'react';
import auth from '../../services/auth';
import DragnDrop from '../../pics/dragndrop.png';
import ViewMedia from '../../componentListNPM/componentForms/media/viewMediaComponent';
import Compressor from 'compressorjs';
import "../../App.css"
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';


class UploadComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            list: [],
            newPics: [],
            paths: [],
            showPics: false,
            loading: false,
            name: "",
            type: "monster",
            delList: [],
            index:0,


        };
    }
    createUUID(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-#';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    changeHandler = async (event) => {


        let list = [...this.state.newPics];
        let paths = [...this.state.paths];
        let index = this.state.index
        let oldList;
        if (event.target.files[0].name?.toLowerCase()?.includes('.mov') || event.target.files[0].name?.toLowerCase()?.includes('.mp4')) {
            oldList = [...this.state.list, { video: true, file: URL.createObjectURL(event.target.files[0]) }];
            var fileOfBlob = new File([event.target.files[0]], event.target.files[0].name, { type: event.target.files[0].type });
            

            let path ="media/" + fileOfBlob.name;
            list.push(fileOfBlob);
            paths.push(path);
            this.setState({ newPics: list, paths: paths, list: oldList, showPics: true });
        }
        else {
            oldList = [...this.state.list, URL.createObjectURL(event.target.files[0])];
            let file = event.target.files[0];
            new Compressor(file, {
                quality: 0.6,

                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(result) {
                    ;
                    var compressedFile = new Blob([result], { type: file.type, lastModified: Date.now() });
                    let timestamp = Date.now() - 803333333;
                    let timestamper = Date.now();

                    let extension = file.name.split('.')[0];
                    let filename = `${timestamp}${extension}`;
                    let theType = compressedFile.type.split('/')[1];
                    let path = `media/${filename}.` + theType;
                    
                    list.push(compressedFile);
                    paths.push(path);

                },

                error(err) {
                    console.log(err.message);
                },
            });
            
            this.setState({ newPics: list, paths: paths, list: oldList, showPics: true,  });

        }


    };
    async handleSubmission() {
        
        let component = this.props.app.state.currentComponent
        if (this.state.newPics.length !== 0) {
            await this.setState({ loading: true });
        let list = [...this.state.newPics];
        for (const key in list) {
            await auth.uploadPics(list[key], this.state.paths[key]);

        }
        }



        
       


        
        component.setJson({ ...component.getJson(), owner: component.getJson()?.owner === "" ? this.props.app.state.user.getJson()?._id : component.getJson()?.owner })
        if(this.state.paths.length>0){
            await component.getPicSrc([...this.state.paths]);

        }
        else{
            component.setCompState({picURLs:{...component.getJson().picURLs}})
        }

        if (this.props.app.state.popupSwitch === "updateCard") {
            if(component.getJson()?.picURLs){
            let li = Object.values(component.getJson()?.picURLs);
            let obj = {...component.getJson()?.picURLs};
            let newob={}
            for (const key in li) {
                if (!this.state.delList?.includes(li[key])) {
                    let index = this.state.index
                    for(let string of Object.keys(obj)){
                        if(obj[string]===li[key]){
                            newob[string]= li[key];
                        }
                    }
                    

                }
            }
            component.setJson({ ...component.getJson(), picURLs: {...component.getJson().picURLs, ...obj} })
        }
        }



        
        await component.getOperationsFactory().run();
        await this.setState({ loading: false,  });


        this.props.app.dispatch({ popupSwitch: "", currentComponent: undefined })




    };
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        
        if(!this.props.app.state.currentComponent?.getJson()?.picURLs){
            document.addEventListener('mousedown', this.handleClickOutside);
            return
        }
        let name = Object.keys(this.props.app.state.currentComponent?.getJson()?.picURLs).length !== 0 ? "picURLs" : "picURL";
        let obj = this.props.app.state?.currentComponent;
        let uploads = obj.getJson()[name];
        if (uploads !== "" && uploads !== undefined) {
            let items = Object.prototype.toString.call(uploads) === "[object String]" ? [uploads] : Object.values(uploads);;
            let list = []
            for (const key in items) {
                list.push(items[key]);
            }
            this.setState({ list: list });
        }
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined) {
                this.props.emitClickedOutside(this.state);
            }
        }
    }
    render() {

        let app = this.props.app;
        let state = app.state;
        let component = this.props.obj ? this.props.obj : state.currentComponent;

        let styles = state.styles;

        return (

            <div ref={this.wrapperRef} style={{
                display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center", alignSelf: "center",
                zIndex: "10000",
            }} className={this.props.wrapperClass}>

                <div style={{ fontSize: "24px", marginTop: "", zIndex: "900" }}>
                    ~ New Card ~
                </div>

                {/* Title */}
                <ParentFormComponent
                    wrapperStyle={{ display: "flex", flexDirection: "column", marginTop: "20px", justifyContent: "center", alignItems: "center", marginBottom: "30px" }} maxLength={120}
                    placeholder={"Max 120 Characters"}
                    // inputStyle={{ width: "150px", zIndex: "900", height: "20px", fontSize: "15px", borderRadius: "3px", padding: "3px" }}
                    // labelStyle={{ fontSize: "2.1vh", marginBottom: "1vh", }}
                    theme="default" label="Title: " name="name" obj={component} />
                <ParentFormComponent
                    // wrapperStyle={{ display: "flex", flexDirection: "column", marginTop: "20px", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}
                    
                    // inputStyle={{ width: "200px",  height:"200px", zIndex: "900", fontSize: "15px", borderRadius: "3px", padding: "3px" }}
                    // labelStyle={{ fontSize: "2.1vh", marginBottom: "1vh", }}
                    theme="default"
                    label="Description: " name="description" 
                     type="richEditor" 
                    rows={3} obj={component} class="scroller" />
                {/* // INPUT STYLE - inner style (text box, input etc) WRAPPER STYLE - outer style */}

                {/* TYPE */}





                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none", background: "#22222222", width: window.innerWidth<state.phoneUIChange?"55vw":"28vw", borderRadius: "2vmin", marginBottom: "2vmin" }}>
                    <img style={{ width: window.innerWidth<state.phoneUIChange?"50vw":"24vw", height: "19.8vh", objectFit: "cover", marginTop: "1vmin", borderRadius: "2vmin", userSelect: "none" }}

                        src={DragnDrop} />
                    <label><div style={{ marginBottom: "1vh" }}></div></label>
                    <div style={{
                        cursor: "pointer", width: "24vw",
                        height: "20vh", marginTop: "-20vh"
                    }}> <input style={{
                        cursor: "pointer", width: "24vw",
                        height: "20vh", marginTop: "-22vh", opacity: "0"
                    }} type="file" name="file" onChange={this.changeHandler} /></div>

                </div>

                <ViewMedia removeMedia={(obj) => {
                    
                    let list = [...this.state.list];
                    let paths = [...this.state.paths];
                    let newPics = [...this.state.newPics];
                    let delList = [...this.state.delList];
                    delList.push(obj.content);
                    list.splice(obj.index, 1);
                    if(paths.length>0){
                        paths.splice(obj.index, 1);

                    }
                    if(newPics.length>0){
                        newPics.splice(obj.index, 1);

                    }

                    this.setState({ list: list, delList: delList, paths: paths, newPics: newPics });

                }} editable={true} media={[...this.state.list]}
                    inputStyle={{ objectFit: "scale-down" }}
                    wrapperStyle={{ objectFit: "scale-down" }}
                    labelStyle={{ fontSize: "2.1vh", marginBottom: "1vh" }} />



                <div style={{ height: "35px", cursor: "pointer", width: "120px", position: "absolute", bottom: "10px", background: "#3CB371", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", color: "white"}} onClick={this.handleSubmission}>{state.popupSwitch?.includes("update")?"Save": "Create Card"}</div>
                <div style={{ fontSize: "2.1vh", marginTop: "1vh", }}>{this.state.message}</div>
            </div>
        );
    }
}



export default UploadComponent;