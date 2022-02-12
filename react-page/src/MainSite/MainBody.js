import { logout, getClimbingGymAtributes,  getAllGyms, getGymsFromLocation,renderGymsFromLocation, getUsersFavoriteGyms} from '../Firebase.js';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { collection, addDoc,getDocs } from "firebase/firestore"; 
import GymDisplay from './GymDisplay.js';

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
// console.log("Document data:", docSnap.data());
// } else {
// // doc.data() will be undefined in this case
// console.log("No such document!");
// }

class MainPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            favorites: "Fetching...",
            favReference: "",
            others: "Fetching...",
            user: this.props.user
        }

        this.renderFavoriteGyms = this.renderFavoriteGyms.bind(this)
        this.renderOtherGyms = this.renderOtherGyms.bind(this)
    }

    tryGetting = async() => {
        // let gym = await getClimbingGymAtributes("Gyms/Rochester/CRG Rochester/Atributes")
        // console.log("Here is the gotten gym", gym.name)
        // return gym
        // this.renderOtherGyms()
        this.renderOtherGyms()
    }

    renderFavoriteGyms(){
        if (this.state.favorites === "Fetching..."){
            let display = []
            let gymsList = []
            getUsersFavoriteGyms(this.state.user).then(gyms =>{

                gyms.forEach(gym =>{
                    gymsList.push(gym)
                    display.push(<GymDisplay key = {gym} reference={gym} status ={true}/>)
                })

                this.setState({
                    favorites:display,
                    favGyms: gymsList
                })
            })
        }
        return this.state.favorites
    }   

    renderOtherGyms(){
        let others = []
        
        if(this.state.others === "Fetching..."){
            getUsersFavoriteGyms(this.state.user).then(favs => {
                getAllGyms().then(ref =>{

                    ref.forEach(gym=>{
                        console.log(favs.includes(gym), "IN THEI MAIN BODY")
                        if(!favs.includes(gym)){
                            others.push(<GymDisplay key ={gym} reference = {gym} status = {false}/>)
                        }
                    })
                    this.setState({
                        others: others
                    })
                    console.log(this.state.others, "OTEHRS THINGY")
                })
            })    
        }
        
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

                <Row className='gymFavorites' sm = {4}>                      
                    <this.renderFavoriteGyms/>
                </Row>

                <Row className='otherGyms' sm ={4}>
                    <this.renderOtherGyms/>
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