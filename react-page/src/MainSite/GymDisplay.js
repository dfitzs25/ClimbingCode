import React from "react";
import { Row } from "reactstrap";
import { getClimbingGymAtributes } from "../Firebase";
import GymDisplayModel from "./GymDisplayModel";

const nonFav = "https://upload.wikimedia.org/wikipedia/commons/b/bf/A_Black_Star.png"
const fav = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/800px-Gold_Star.svg.png"

class Gym extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            logo: "uncaught",
            name: "uncaught",
            open: false
        }
        this.toggleOpen = this.toggleOpen.bind(this)

        this.saveGym(this.props.reference)
    }

    saveGym(reference){
        getClimbingGymAtributes(reference).then(ref => {
            this.setState({
                logo: ref.logo,
                name: ref.name,
            })
        })
    }

    toggleOpen(){
        this.setState({
            open:!this.state.open
        })
    }

    findStatus(){
        if(this.props.status === true){
            return(
                <div>
                    <img src = {fav} className="gymDisplayStar"/>
                </div>
            )
        } else{
            <div>
                <img src ={nonFav} className="gymDisplayStar"/>
            </div>
        }
    }

    display(){
        if(this.state.logo !== "none"){
            return(
            <button className="gymDisplay" type="button" onClick={() => this.toggleOpen()}>
                <Row >
                    <img src = {this.state.logo}/>
                    <div className="gymDisplayText">
                        <div>{this.state.name}</div>
                        {this.findStatus()}
                    </div>
                    <GymDisplayModel isOpen = {this.state.open} toggleOpen = {this.toggleOpen} path = {this.props.reference} status = {this.props.status}/>
                </Row>
            </button>)
        } else {
           return( 
               <button className="gymDisplay" type="button" onClick={() =>this.toggleOpen()}>
                   <Row>
                        <div className="gymDisplayBigText">
                            {this.state.name}
                        </div>
                        <div className="gymDisplayText">
                            <div className="gymDisplayNotice">(no available image)</div>
                            {this.findStatus()}
                        </div>
                        <GymDisplayModel isOpen = {this.state.open} toggleOpen = {this.toggleOpen} path = {this.props.reference} status = {this.props.status}/>
                    </Row>
               </button>)
        }
    }    
    
    
    render(){
        return(
            <div>
                {this.display()}
            </div>
        )
    }
}

const GymDisplay = (props) =>{


    return(
        <div>
            <Gym reference = {props.reference} status = {props.status}/>
        </div>
    )
}

export default GymDisplay