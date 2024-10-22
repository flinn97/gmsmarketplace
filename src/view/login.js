import React, { Component } from 'react';
import authService from '../services/auth';
import { Link } from 'react-router-dom';
import logo from '../pics/logoava2.png';
import google from '../pics/Sign Up/6929234_google_logo_icon.png';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            selectedFile: undefined,
            path: undefined,
            email: "",
            password: "",
            errorMessage: undefined,
        }
    }

    handleChange = async (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })

    };


    async handleSubmission() {


        let user = await authService.login(this.state.email, this.state.password, this.props.app.state.componentList, this.props.app.dispatch);
        if (user.error) {
            // console.log(user);
            this.setState({ errorMessage: user.error });
            return
        }
        if (this.props.callbackFunc) {
            this.props.callbackFunc(user)
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

        const warning = { color: 'red', marginTop: '10px', fontSize: styles.fonts.fontSmallest, background: "" };


        return (
            <div style={{
                padding: "5%", transition: "all ease-out", justifyContent: "center", flexDirection: "row", display: "flex",
                width: "100%", paddingTop: "35px",
            }}>

                <div
                    style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", width: "950px",
                        background: styles.colors.color2 + "2e", borderRadius: "28px", height: "540px", paddingBottom: "80px",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                    }}>
                    {/* <img src={logo} style={{ width: "144px", userSelect: "none", }} draggable="false" /> */}

                    <div style={{ opacity: ".94", paddingBottom: "40px", width: "fit-content" }}>


                        {/* <div style={{fontFamily: styles?.fonts?.fontTitle, fontSize: styles?.fonts?.fontHeader5, color: styles?.colors?.color5}}>Login</div>                      */}
                        <div style={{ color: styles.colors.color3, marginTop: ".4rem", marginBottom: "7px", marginTop: "22px" , fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem", }}>Email</div>
                        <input autoComplete='off' style={{
                            width: "344px", padding: "4px 9px", color: "#ffffffe4", height: window.innerWidth > 800 ? "1.6rem" : "2rem", rows: "1",
                            fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem", border: "1px solid " + styles.colors.colorWhite,
                            borderRadius: "4px", background: styles.colors.color2 + "5c", borderWidth: "0px",
                            alignItems: "left", textAlign: "left", justifyContent: "center",
                        }} id="pwd" onChange={this.handleChange} name="email" />




                        {!this.state.forgot && <>
                            <div style={{ color: styles.colors.color3, marginTop: ".4rem", marginBottom: "7px", marginTop: "22px", fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem", }}>Password</div>
                            <input autoComplete='off' style={{
                                width: "344px", padding: "4px 9px", color: "#ffffffe4", height: window.innerWidth > 800 ? "1.6rem" : "2rem", rows: "1",
                                fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem", border: "1px solid " + styles.colors.colorWhite,
                                borderRadius: "4px", background: styles.colors.color2 + "5c", borderWidth: "0px",
                                alignItems: "left", textAlign: "left", justifyContent: "center",
                            }} type="password" id="pwd" onChange={this.handleChange} name="password" /></>}


                    </div>

                    {this.state.errorMessage && (
                        <div style={{ ...warning, marginTop: "-18px" }}>
                            {this.state.errorMessage}
                        </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "fit-content", }}>
                        <button className="hover-btn"
                            style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "24px", padding: "8px 34px", width: "200px", border: "1px solid " + styles.colors.colorWhite,
                                color: styles?.colors?.color3, fontSize: window.innerWidth > 800 ? "1.2rem" : "1.6rem"
                            }}
                            class="hover-btn" onClick={() => {
                                if (!this.state.forgot) {
                                    this.handleSubmission()
                                }
                                else {
                                    this.setState({ errorMessage: "An email was sent to your account." });
                                    authService.sendForgotPasswordChange(this.state.email);
                                }
                            }}>
                            {this.state.forgot ? ("Submit") : ("Login")}</button>



                        <div
                            style={{
                                display: "flex", flexDirection: "column", justifyContent: "center", width: "200%",
                                background: "#0000002e", borderRadius: "28px", height: "6px", marginTop: "10px", marginBottom: "-2px",
                                alignContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                            }}></div>
                        {!this.state.forgot && (<div onClick={async () => {
                            const newUrl = '../';
                            debugger
                            await authService.googleJustSignIn(this.props.app.state.componentList, this.props.app.dispatch);



                        }} className='hover-img' title="Login or Sign Up using your Google Account" style={{
                            ...styles?.buttons?.buttonAdd, marginTop: "12px", background: "", justifyContent: "center",
                            padding: "0px 0px", paddingLeft: "14px", textDecorationColor: styles.colors.color8, alignItems: "center",
                            color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall, alignContent: "center", alignSelf: "center", textDecoration: "",
                            border: "solid 2px #4285F4F0", borderRadius: "11px", width: "200px",
                        }}> <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <img src={google} style={{ width: "28px", marginRight: "10px", height: "28px", marginTop: "1.5px" }} />
                                <div style={{
                                    background: "#4285F4F0", borderRadius: "0px 8px 8px 0px", padding: "4px 11px", fontSize: "13.87px", textDecoration: "", width: "150px",
                                    textAlign: "center", paddingTop: "6px"
                                }}>Sign in with Google</div>
                            </div>

                        </div>)}

                        <a className='hover-img' style={{
                            ...styles?.buttons?.buttonAdd,  marginTop: "22px", padding: "8px 19px", width: "200px",
                            color: styles?.colors?.colorWhite + "98", fontSize: window.innerWidth > 800 ? "1.2rem" : "1.6rem"
                        }} href="https://gms.arcanevaultassembly.com/playerregister">Register</a>


                        {this.state.forgot ? (<div onClick={() => { this.setState({ forgot: false }) }} style={{
                            ...styles?.buttons?.buttonAdd, marginTop: "22px", padding: "8px 19px", width: "200px",
                            color: styles?.colors?.colorWhite + "98", fontSize: window.innerWidth > 800 ? "1.2rem" : "1.6rem"
                        }} >Back</div>) : (
                            <div className='hover-img' onClick={() => {
                                this.setState({ forgot: true })
                            }} style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "24px", padding: "8px 19px", width: "200px",
                                color: styles?.colors?.colorWhite + "98", fontSize: window.innerWidth > 800 ? ".91rem" : "1rem", border:"", background:"",
                            }}>Forgot Password?</div>)}

                    </div>
                </div>


            </div>
        )
    }

}