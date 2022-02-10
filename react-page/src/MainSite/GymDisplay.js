import React from "react";
import { Row } from "reactstrap";
import { getClimbingGymAtributes } from "../Firebase";

class Gym extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            logo: "uncaught",
            name: "uncaught",
        }
        this.saveGym(this.props.reference)
    }

    async saveGym(reference){
        getClimbingGymAtributes(reference).then(ref => {
            this.setState({
                logo: ref.logo,
                name: ref.name
            })
        })
    
    }

    
    
    
    render(){
        return(
            <Row className="gymDisplay">
                <img src = {this.state.logo} className="gymDisplayImg"/>
                <div className="gymDisplayText">
                    {this.state.name}
                </div>
            </Row>
        )
    }
}

const GymDisplay = (props) =>{

    console.log("creating gymDisplay")

    return(
        <div>
            <Gym reference = {props.reference}/>
        </div>
    )
}

export default GymDisplay