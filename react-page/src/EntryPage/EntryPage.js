import React from "react";
import { Col, Container, Row } from "reactstrap";
import SignUpModel from "./SignUpModel";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

class Page extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email: "email",
            password: "password",
        }
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    signIn(){
        logInWithEmailAndPassword(this.state.email,this.state.password)
    }

    render() {
        return (
            <div>
                <div className="EntryLogo">
                    <img src = {this.props.logoImage} className="logoImage"/>
                </div>
                
                <Row className="entryText">
                    <input placeholder= {this.state.email} onChange={this.handleEmail}/>
                    <input placeholder= {this.state.password} onChange={this.handlePassword}/>
                    <button type = "button" onClick={() => {this.signIn()}}>Sign In</button>
                        Or
                    <SignUpModel className="signUpCenter"/>
                </Row>
            </div>
        )
    }
}

const EntryPage = (props) => {
    return (
        <div>
            <Page logoImage = {props.logoImage}/>
        </div>
    )
}
export default EntryPage