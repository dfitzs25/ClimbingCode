import { logout,  getAllGyms, getUsersFavoriteGyms, getUserPath, getAllStates, getAllLocations, checkGymWithFilter} from '../Firebase.js';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { collection, addDoc,getDocs } from "firebase/firestore"; 
import GymDisplay from './GymDisplay.js';
import FilterModal from './FilterModal.js';


class MainPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            favorites: "Fetching...",
            favReference: "",
            others: "Fetching...",
            states: "Fetching...",
            locations: "Fetching...",
            user: this.props.user,
            filterOpen: false,
            locationFilter: "none",
            stateFilter: "none"
        }

        this.renderFavoriteGyms = this.renderFavoriteGyms.bind(this)
        this.renderOtherGyms = this.renderOtherGyms.bind(this)
        this.toggleFilter = this.toggleFilter.bind(this)
        this.applyLocationFilter = this.applyLocationFilter.bind(this)
        this.applyStateFilter = this.applyStateFilter.bind(this)

        this.renderFavoriteGyms()
        this.renderOtherGyms()
    }

    toggleFilter(){
        this.setState({
            filterOpen: !this.state.filterOpen
        })
    }

    applyLocationFilter(location){
       this.setState({
           locationFilter: location
       })
       this.renderFavoriteGyms()
       this.renderOtherGyms()
       console.log("NEW LOCATION FILTER: ", this.state.locationFilter)
    }

    applyStateFilter(state){
        this.setState({
            stateFilter: state
        })
        this.renderFavoriteGyms()
        this.renderOtherGyms()
        console.log("NEW STATE FILTER: ", this.state.stateFilter)
    }

    tryGetting = async() => {
        getAllLocations().then(states => {
            console.log(states)
        })
    }

    getFavoritesDefault(){
        let display = []
        let gymsList = []
        getUsersFavoriteGyms(this.state.user).then(gyms =>{

            gyms.forEach(gym =>{
                gymsList.push(gym)
                
                if (this.state.stateFilter != "none" || this.state.locationFilter != "none"){
                    checkGymWithFilter(gym,this.state.locationFilter,this.state.stateFilter).then(valid => {
                        if(valid){
                            display.push(<GymDisplay key = {gym} reference={gym} status ={true}/>)
                        }
                    })
                } else {
                    display.push(<GymDisplay key = {gym} reference={gym} status ={true}/>)
                }
                      
            })

            this.setState({
                favorites:display,
                favGyms: gymsList
            })
        })
    }

    renderFavoriteGyms(){
        this.getFavoritesDefault()
        
        return this.state.favorites
    }   

    renderOtherGyms(){
        let others = []
    
        getUsersFavoriteGyms(this.state.user).then(favs => {
            getAllGyms().then(ref =>{
                ref.forEach(gym=>{
                    let path = gym.data().path
                    if (this.state.stateFilter != "none" || this.state.locationFilter != "none"){
                        checkGymWithFilter(path,this.state.locationFilter,this.state.stateFilter).then(valid => {
                            console.log(valid, "THEHAOIHDOIHOAHDODSNFOIJ")
                            if(valid){
                                console.log("PUSHING IT")
                                if(!favs.includes(path)){
                                    others.push(<GymDisplay key ={path} reference = {path} status = {false}/>)
                                }
                            }
                        })
                    } else {
                        if(!favs.includes(path)){
                            others.push(<GymDisplay key ={path} reference = {path} status = {false}/>)
                        }
                    }
                })

                this.setState({
                    others: others
                })
            })
        })    
    
        
        return this.state.others
    }
    
    render() {
        return(
            <div>
                <header className='mainHeader'>
                    <div >
                        <img src = {this.props.logoImage} className='headerImage'/>
                    </div>
                    <Col className="buttonHeadAlign">
                        <button type= "button" onClick={logout} className="mainSignOut" >Sign Out</button>
                        <button type= "button" onClick={() => {this.tryGetting()}}>testing</button>  
                    </Col>
                </header>
                <button type='button' onClick={() =>{this.toggleFilter()}}>Filter</button>
                <FilterModal isOpen = {this.state.filterOpen} toggleOpen = {this.toggleFilter}
                    applyLocationFilter = {this.applyLocationFilter}
                    applyStateFilter = {this.applyStateFilter}
                    curLoc = {this.state.locationFilter}
                    curSta = {this.state.stateFilter}
                />
                
                {/* Gym displays below */}
                <div className='mainSection'>Favorited Gyms</div>    
                <Row className='gymFavorites' sm = {4}>                 
                    {/* <this.renderFavoriteGyms/> */}
                    {this.state.favorites}
                </Row>
                <div className='mainSection'>Other Gyms</div>  
                <Row className='otherGyms' sm ={4}>
                    {/* <this.renderOtherGyms/> */}
                    {this.state.others}
                </Row>
            </div>
        )
    }
}

const MainBody = (props) => {
    return (
        <div>
            <MainPage logoImage = {props.logoImage} user={props.user}/>
        </div>
    )
}

export default MainBody;