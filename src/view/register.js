import React, { Component } from "react";
import AuthService from "../services/auth";
import validator from 'validator';
import loading from "../pics/loading.gif";

import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

export default class Register extends Component {

    //state creation and binding.
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            enabled: false,
            loading: false,
            messageSwitch: false,
            currentMessage: "",
            captcha: false,
            message: {
                email: "Please fill out the required fields.",
                password: "Password must include at least 1 symbol 1 number 1 upper and lower case letters and be at least 8 characters long",
                notAnEmail: "Please enter a valid email"

            },
            attempt: 0,
            tooManyLoginAttempts: false,


        };
    }
    async componentDidMount() {
        if(this.props.app.state.user!==undefined){
            window.location.href="/"
        }
        if (this.props.app.state.componentList) {
            await this.props.app.state.componentList?.getOperationsFactory().cleanPrepare({ adduser: 1 });
            let user = this.props.app.state.componentList?.getOperationsFactory().getUpdater("add");
            user = user[0];
            this.props.app.dispatch({ currentComponent: user });

        }

        window.addEventListener('keyup', (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.handleLogin(e);

            }

        })
    }
    onChange(value) {
        if (value) {
            this.setState({ captcha: true })
        }
    }
    //handles all changes with state.
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //submites for login using the controller to connect with backend. Sends to the teacher profile if teacher or the student if back end spits out student.
    async handleLogin(e) {

        if (this.state.attempt >= 10) {
            this.setState({
                tooManyLoginAttempts: true,
            })
            return;
        }
        else {
            this.setState({
                attempt: this.state.attempt + 1
            })
        }
        await this.setState({
            loading: true
        })
        if (validator.isStrongPassword(this.state.password, {
            minLength: 6, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {

        } else {
            if (this.state.email.length > 0) {
                this.setState({
                    currentMessage: this.state.message.password,
                    loading: false,
                    messageSwitch: true
                })
                return
            }

        }

        if (this.state.email === "" || this.state.password === "" || this.state.firstName === "" || this.state.lastName === ""
            //   || !this.state.captcha
        ) {
            this.setState({
                currentMessage: this.state.message.email,
                loading: false,
                messageSwitch: true
            })
            return
        }
        if (!validator.isEmail(this.state.email)) {
            this.setState({
                currentMessage: this.state.message.notAnEmail,
                loading: false,
                messageSwitch: true
            })
            return
        }
        await this.props.app.dispatch({
            email: this.state.email
        })

        e.preventDefault();
        let user = await AuthService.register(this.state.email, this.state.password, true);
        if (user) {
            

            await this.props.app.state.currentComponent?.getOperationsFactory().componentDispatch({ addemail: this.state.email, addlastName: this.state.lastName, addfirstName: this.state.firstName, add_id: this.state.email })
            let comp = this.props.app.state.currentComponent;
            await this.props.app.dispatch({ user: comp, login: true, register: false });
            await this.props.app.state.componentList?.getOperationsFactory().run();
            window.location.href="/"


        }

    }

    render() {
        let app = this.props.app;
        let dispatch = app.dispatch;
        let state = app.state;
        let styles = state.styles;
        let comp = this.props.app.state.componentList;
        //login page for the screen. 
        return (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ ...styles.tallerCard, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: window.innerWidth<state.phoneUIChange?"8vh":"20vh", }}>
                    <div style={{ width: "fit-content", height: "fit-content", marginTop: "1vh", fontSize: "2.3vh", pointer: "cursor", userSelect: "none" }}
                        onClick={this.props.app.dispatch.bind(this, { login: true })}>
                        Register
                    </div>
                    {state.currentComponent && (
                        <div className="col-md-12" style={{ background: "linear-gradient(#FFFFFF, #C9F5E1, #FFFFFF)" }}>
                            <div className="card card-container" style={{ background: "white" }}>
                                <div style={{ marginTop: "7px", display: "flex", flexDirection: "column", marginTop: "20px"}}>
                                    <label htmlFor="Email">First Name</label>
                                    <input
                                        type="text"

                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                        maxLength="30"
                                        style={{ width: window.innerWidth<state.phoneUIChange?"325px":"250px", height: "25px", marginTop: "10px", fontSize: "15px", color: "black", borderRadius: "3px", background: "gainsboro", border: "none" }}
                                    />
                                </div>
                                <div style={{ marginTop: "7px", display: "flex", flexDirection: "column" }}>
                                    <label htmlFor="Email">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                        maxLength="30"
                                        style={{ width: window.innerWidth<state.phoneUIChange?"325px":"250px", height: "25px", marginTop: "10px", fontSize: "15px", color: "black", borderRadius: "3px", background: "gainsboro", border: "none" }}
                                    />
                                </div>
                                <div style={{ marginTop: "7px", display: "flex", flexDirection: "column" }}>
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        maxLength="30"
                                        style={{ width: window.innerWidth<state.phoneUIChange?"325px":"250px", height: "25px", marginTop: "10px", fontSize: "15px", color: "black", borderRadius: "3px", background: "gainsboro", border: "none" }}
                                    />
                                </div>

                                <div style={{ marginTop: "7px", display: "flex", flexDirection: "column" }}>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        maxLength="20"
                                        style={{ width:window.innerWidth<state.phoneUIChange?"325px": "250px", height: "25px", marginTop: "10px", fontSize: "15px", color: "black", borderRadius: "3px", background: "gainsboro", border: "none" }}
                                    />
                                </div>
                                {/* <div style={{marginTop:"15px"}}>
                                <ReCAPTCHA

        sitekey={process.env.REACT_APP_SITE_KEY}
        onChange={this.onChange}
      /></div> */}
                                <div style={{ marginTop: "20px", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                                    <div style={{ height: "3.2vh", color: "#F0F2EF", width: "150px", marginBottom: "2vh", background: styles.colorPalette.color5, borderRadius: "7px", justifyContent: "center", alignItems: "center", display: "flex" }} onClick={this.handleLogin} >
                                        <span>{this.state.loading ? (<><img src={loading} style={{ alignSelf: "center", marginBottom: "1vh", width: "20px", }} />Loading...</>) : (<>Register</>)}</span>
                                    </div>
                                    {this.state.messageSwitch && (<div style={{ color: "red" }}>{this.state.currentMessage}</div>)}
                                </div>



                            </div>
                        </div>
                    )}
                    <div style={{ width: "fit-content", height: "fit-content", marginLeft: "1vw", marginTop: "1vh", textDecoration: "underline", fontSize: "1.5vh", pointer: "cursor", userSelect: "none" }}
                    >
                        Have an account? <div onClick={()=>{
                            window.location.href= "/";
                            window.location.reload();
                        }} style={{ color: "blue", justifyContent: "center", alignSelf: "center", display: "flex" }}>Login</div>
                    </div>
                    <div style={{color:"red"}}>{this.state.currentMessage}</div>
                </div></div>
        );
    }
}