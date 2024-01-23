import React, { Component } from 'react';
import authService from '../../../../services/auth';
import loading from "../../../../pics/loading.gif";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.registerStudent = this.registerStudent.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            selectedFile: undefined,
            path: undefined,
            email: "",
            password: "",
            code: false
        }
    }

    handleChange = async (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })

    };
    async registerStudent() {

        let app = this.props.app;
        let state = app.state;
        let componentList = state.componentList;
        let user = await authService.register(this.state.email, this.state.password);
        if (user) {
            await authService.firebaseGetter(this.state.id, componentList, "_id");
            let student = await componentList.getComponent("student", this.state.id, "_id");
            await student.setCompState({ email: this.state.email });

            await authService.setCurrentUser(student.getJson());
            await state.opps.cleanPrepareRun({ update: student });
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(2000);
            window.location.reload();

        }
        else{
            this.setState({currentMessage:"Either your password was not accepted or your email has already been registered"})
        }

    }



    async handleSubmission() {
        this.setState({loading:true})
        if (this.state.code) {
            let email = this.state.email + "@dreammaker.com";
            let password = this.state.email;
            let user = await authService.login(email, password);

            if (user) {
                let teacher = await authService.getStudentsTeacher(email);
                let teacherID = Object.values(teacher)[0];

                this.setState({
                    studentRegister: true,
                    email: "",
                    password: "",
                    message: "code accepted now enter a new email and password",
                    code: false,
                    id: password,
                    teacherId: teacherID
                })
                await authService.firebaseGetter(teacherID, this.props.app.state.componentList, "_id");
                let user = this.props.app.state.componentList.getComponent("user", teacherID, "_id");
                this.props.app.dispatch({ user: user });
            }
            return

        }
        if (this.state.studentRegister) {
            this.registerStudent();
            return
        }
        else {
           let user = await authService.login(this.state.email, this.state.password, this.props.app.state.componentList, this.props.app.dispatch)
           if(!user){
            this.setState({currentMessage:"Email or Password incorrect", loading:false})
           }
        }



    };
    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let component = state.currentComponent;

        let styles = state.styles;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        let key = compJson?.collection ? "update" : "add";
        return (
            <div style={{

                width: "100vw",
                marginLeft: "1vw",
                marginTop: window.innerWidth<state.phoneUIChange?"4vh":"25vh",
                maxHeight: "100vh",
                paddingTop: "2vh",
                paddingLeft: "1vw",
                paddingRight: "1vw",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                display: "flex",
            }}>
                <div
                    style={{
                        ...styles.smallCard, display: "flex", flexDirection: "column", justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        
                        marginTop: window.innerWidth<state.phoneUIChange?"45%": "0px",
                    }}>
                    <div style={{ fontFamily: styles?.fonts?.fontTitle, fontSize: styles?.fonts?.fontHeader5, }}>Login</div>
                    <div>{this.state.message}</div>
                    <div style={{ marginTop: "2vh", }} >

                        <label htmlFor="lastName"><div style={{ fontFamily: styles?.fonts?.fontNormal, marginRight: styles?.margins?.marginSmallW, fontSize: styles?.fonts?.fontHeader1, }}>{this.state.code ? "Enter Code" : "Email"}</div></label>
                        <input value={this.state.email} style={{ width: window.innerWidth<state.phoneUIChange?"325px":"250px", height: "25px", marginTop: "10px", fontSize: "15px", color: "black", borderRadius: "3px", background: "gainsboro", border: "none" }} type="text" id="last" onChange={this.handleChange} name="email" />
                    </div>
                    {!this.state.code && (
                        <div style={{ marginTop: "2vh", marginBottom: styles?.margins?.marginSmallH }} >
                            <label htmlFor="lastName"><div style={{ fontFamily: styles?.fonts?.fontNormal, marginRight: styles?.margins?.marginSmallW, fontSize: styles?.fonts?.fontHeader1, }}>Password</div></label>
                            <input style={{ width: window.innerWidth<state.phoneUIChange?"325px":"250px", height: "25px", marginTop: "10px", fontSize: "15px", color: "black", borderRadius: "3px", background: "gainsboro", border: "none" }} type="password" id="pwd" value={this.state.password} onChange={this.handleChange} name="password" />
                        </div>)}
                    <div style={{}}>
                        <div style={{ height: "30px", color: "#F0F2EF", width: "120px", marginBottom: "2vh", background: styles.colorPalette.color5, borderRadius: "7px", justifyContent: "center", alignItems: "center", display: "flex", margin: "10px" }} onClick={this.handleSubmission}>
                        <span>{this.state.loading ? (<><img src={loading} style={{ alignSelf: "center", marginBottom: "1vh", width: "20px", }} />Loading...</>) : (<>Login</>)}</span>
                            </div>

                    </div>
                    <div onClick={() => { this.setState({ code: !this.state.code }) }} style={{ color: "blue", cursor: "pointer", textDecoration: "underline", marginRight: "auto", marginLeft: "auto", fontSize:"20px" }}>{this.state.code ? "Back" : "Have a Code?"}</div>

                    {/* <div onClick={() => { this.props.app.dispatch({ register: true }) }} style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }} >Register</div> */}
                    <div style={{color:"red"}}>{this.state.currentMessage}</div>
                </div>
            </div>
        )
    }

}
//670324
