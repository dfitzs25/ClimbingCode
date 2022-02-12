import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import EntryPage from './EntryPage/EntryPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth }from "./Firebase";
import MainBody from './MainSite/MainBody';
import { useAuthState } from "react-firebase-hooks/auth";

const logoImage = "https://www.vdiffclimbing.com/wp-content/images/basics/basic-atc/rock-climbing-belay-device-1.png"

function App() {

  const [user, loading, error] = useAuthState(auth);

  if (user){
    return(
      <div>
        <MainBody logoImage = {logoImage} user ={user}/>
      </div>
    )
  } else {
    return (
      <div className='main'>
          <EntryPage logoImage = {logoImage}/>        
      </div>
    );
  }
  
}

export default App;
