import React from "react";
import { Container, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { auth, registerWithEmailAndPassword,signInWithGoogle, } from "../Firebase.js";

class SignUp extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOpen:false,
            name: "John Doe",
            email: "example@123.com",
            password: "password",
        }
    }

    toggelOpen(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    addName = (e) => {
        this.setState ({
            name: e.target.value
        })
    }
    
    addEmail = (e) => {
        this.setState ({
            email: e.target.value
        })
    }

    addPassword = (e) => {
        this.setState ({
            password: e.target.value
        })
    }

    signUp(){
        registerWithEmailAndPassword(this.state.name, this.state.email, this.state.password)
        if(true){
            this.toggelOpen()
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <button type="button" onClick={() => {this.toggelOpen()}}>Sign Up</button>
                </Container> 
                <Modal isOpen = {this.state.isOpen} toggle = {() => {this.toggelOpen()}}>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupText>Enter a Name:</InputGroupText>
                            <Input placehodler = {this.state.name} onChange = {this.addName}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupText>Enter a valid Email:</InputGroupText>
                            <Input placehodler = {this.state.email} onChange = {this.addEmail}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupText>Enter a valid Password:</InputGroupText>
                            <Input placehodler = {this.state.password} onChange = {this.addPassword}/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Row className="vertial-align">
                            <button type="button" onClick={() =>{this.signUp()}}>Sign Up</button>
                        </Row>
                        <Row>
                            <button type="button" onClick={() => {this.toggelOpen()}}>Close</button>
                        </Row>
                    </ModalFooter>
                </Modal>
                
            </div>
        )
    }
}

const SignUpModel = (props) =>{
    return (
        <div>
            <SignUp/>
        </div>
    )
}

export default SignUpModel