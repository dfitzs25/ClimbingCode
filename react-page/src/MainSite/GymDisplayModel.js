import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import { getClimbingGymAtributes } from "../Firebase"

class GymModel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "uncaught",
            logo: "uncaught",
            topRope: "uncaught",
            boulder: "uncaught",
            renting: "uncaught",
            state: "uncaught",
            location: "uncaught",
        }

        this.getAtributes()
    }

    getAtributes(){
        if(this.state.name === "uncaught"){
            getClimbingGymAtributes(this.props.path).then(ref => {
                this.setState({
                    logo: ref.logo,
                    name: ref.name,
                    topRope: ref.topRope,
                    boulder: ref.boulder,
                    renting: ref.renting,
                    state: ref.state,
                    location: ref.location + ", "+ ref.state
                })
            })
        }
    }

    toggle(){
        const {toggleOpen} = this.props
        toggleOpen()
    }

    renderLogo(){
        if(this.state.logo === "none"){
            return <div>{this.state.name}</div>
        } else {
            return  <div className="gymDisplayImg"> <img src = {this.state.logo} /></div>
        }
    }

    displayBool(bool){
        if(bool){
            return "Available."
        } else {
            return "Not Offered."
        }
    }

    makeRequest(){
        console.log("REQUESTED - NEED TO IMPLEMENT")
    }

    acceptRequest(){
        console.log("ACCEPTED NEED TO DO IMPLEMENTATION")
    }

    render(){
        return(
            <div>
                <Modal isOpen = {this.props.isOpen} toggle = {() => {this.toggle()}}>
                    <ModalHeader>{this.renderLogo()}</ModalHeader>
                    <ModalBody >
                        <div className="gdmBody"> 
                            {this.state.name}
                        </div>
                        <div className="gdmBody">
                            {this.state.location}
                        </div>
                        Atributes:
                        <div className="gdmBody">
                                Top-Rope: {this.displayBool(this.state.topRope)}
                        </div>
                        <div className="gdmBody">
                                Bouldering: {this.displayBool(this.state.boulder)}
                        </div>
                        <div className="gdmBody">
                                Renting: {this.displayBool(this.state.renting)}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <button type="button" onClick={this.makeRequest}>Make Request</button>
                            <button type="button" onClick={this.acceptRequest}>Accept Request</button>
                       </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const GymDisplayModel = (props) =>{
    return (
        <div>
            <GymModel isOpen = {props.isOpen} toggleOpen = {props.toggleOpen} path = {props.path}/>
        </div>
    )
}

export default GymDisplayModel