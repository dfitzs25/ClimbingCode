import { auth, getClimbingGym, logout, getAllGyms, getGymsFromLocation} from '../Firebase.js';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { collection, addDoc,getDocs } from "firebase/firestore"; 

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
// console.log("Document data:", docSnap.data());
// } else {
// // doc.data() will be undefined in this case
// console.log("No such document!");
// }

class MainPage extends React.Component{

    tryGetting = async() => {
        getGymsFromLocation("Rochester")
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
                    </Col>
                </header>

                <Container className='gymFavorites'>
                    <button type ="button" onClick= {() => {this.tryGetting()}}>Log all gym info</button>
                </Container>

                <Container className='otherGyms'>

                </Container>
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