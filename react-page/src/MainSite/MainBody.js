import { logout, getClimbingGymAtributes,  getAllGyms, getGymsFromLocation,renderGymsFromLocation} from '../Firebase.js';
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

        this.renderFavoriteGyms = this.renderFavoriteGyms.bind(this)
    }

    tryGetting = async() => {
        let gym = await getClimbingGymAtributes("Gyms/Rochester/CRG Rochester/Atributes")
        console.log("Here is the gotten gym", gym.name)
        return gym
    }

    //This is currently being used to 'test' how I am using the display array.
    renderFavoriteGyms(){
        //the commented code that is below is another way how I tried to display the gyms

        // renderGymsFromLocation("Rochester").then(display => {
        //     console.log(display, "In render for Main Body")
        //     return display
        // })

        let display = []

        display.push(<GymDisplay key = {"test"} reference={"Gyms/Rochester/CRG Rochester/Atributes"}/>)

        getGymsFromLocation("Rochester").then(ref =>{
            ref.forEach(gym => {
                //In here seems to be the issue, nothing 
                display.push(<GymDisplay key = {gym} reference={gym}/>)
            })
            
            console.log(display,"IN FIREBASE")
            // I tried having return here but it would not do anything
        })
        return display //putting the return here would at least return the gym manually added. I have a fealling its a async issue but I do not know what to change.
    }   
    
    //Used to see 
    testArrayDisplay(){
        let display = []

        for (let i =0;i<2;i++){
            display.push(<GymDisplay key = {"test",i} reference={"Gyms/Rochester/CRG Rochester/Atributes"}/>)
        }

        return display
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
                        {this.renderFavoriteGyms()}
                </Row>

                <Row className='otherGyms' sm ={4}>
                    <this.testArrayDisplay/>
                </Row>
            </div>
        )
    }
}

const MainBody = (props) => {
    return (
        <div>
            <MainPage logoImage = {props.logoImage}/>
        </div>
    )
}

export default MainBody;