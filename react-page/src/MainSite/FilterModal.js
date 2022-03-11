import React from "react"
import { render } from "react-dom"
import { Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import { getAllLocations, getAllStates } from "../Firebase"

class Filter extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            locations: [],
            states: []
        }

        this.getLocations = this.getLocations.bind(this)
        this.getStates = this.getStates.bind(this)
    }

    applyLocation(locatoin){
        const {applyLocationFilter} = this.props
        applyLocationFilter(locatoin)
    }

    applyState(state){
        const {applyStateFilter} = this.props
        applyStateFilter(state)
    }

    clearFilter(){
        this.applyState("none")
        this.applyLocation("none")
    }

    getLocations(){
        if(this.state.locations.length === 0){
            let tempLoc = []
            getAllLocations().then(locations => {
                locations.forEach(loc => {
                    tempLoc.push(<button key = {loc} type="button" onClick={() =>{this.applyLocation(loc)}}>{loc}</button>)
                })
                this.setState({
                    locations: tempLoc
                })
            })
        }
        return this.state.locations
    }

    getStates(){
        if(this.state.states.length === 0){
            let tempState = []
            getAllStates().then(states => {
                states.forEach(sta => {
                    tempState.push(<button key = {sta} type="button" onClick={() => {this.applyState(sta)}}>{sta}</button>)
                })

                this.setState({
                    states: tempState
                })
            })
        }
        return this.state.states
    }

    toggle(){
        const {toggleOpen} = this.props
        toggleOpen()
    }

    render(){
        return(
            <div>
                <Modal isOpen = {this.props.isOpen} toggle ={() => {this.toggle()}}>
                    <ModalHeader>Filter</ModalHeader>
                    <ModalBody>
                        <div>
                            Active Filter
                        </div>
                        <div>
                            Location: {this.props.curLoc}
                        </div>
                        <div>
                            State: {this.props.curSta}
                        </div>
                    </ModalBody>
                    <ModalBody>
                        Locations
                        <Row>
                            <this.getLocations/>
                        </Row>
                        States
                        <Row>
                            <this.getStates/>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" onClick={() => {this.clearFilter()}}>Clear Filter</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const FilterModal = (props) => {
    return(
        <div>
            <Filter isOpen = {props.isOpen} toggleOpen = {props.toggleOpen}
            applyLocationFilter = {props.applyLocationFilter}
            applyStateFilter = {props.applyStateFilter}
            curSta ={props.curSta}
            curLoc = {props.curLoc}
            />
        </div>
    )
}

export default FilterModal;