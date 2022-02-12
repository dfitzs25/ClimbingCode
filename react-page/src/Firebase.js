import { initializeApp } from "firebase/app"
import { GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    doc,
    getDoc,
    } from "firebase/firestore";
import GymDisplay from "./MainSite/GymDisplay";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOQueRW3AadfIZMB5cb-gTD1VZ9P7wXOc",
    authDomain: "webpage-391c8.firebaseapp.com",
    projectId: "webpage-391c8",
    storageBucket: "webpage-391c8.appspot.com",
    messagingSenderId: "466366056009",
    appId: "1:466366056009:web:1566d2f713e8d4f8f76198",
    measurementId: "G-PCHTZENE4Q"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const googleProvider = new GoogleAuthProvider();


//SIGN IN/SIGN UP
//


/**
 * brings you to a google thingy idk
 */
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

/**
 * 
 * @param {Email to log in with} email 
 * @param {Passwod to log in with} password 
 */
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

/**
 * 
 * @param {Name of the account} name 
 * @param {Email for the account} email 
 * @param {password of account} password 
 */
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// RETRIEVING GYM INFO METHODS BELOW 
//


/**
 * 
 * @param {the location of the gym} location 
 * @param {the name of the specifc gym} clubName 
 * @returns that speicif gym array (logo, website, boldering, top rope, can rent)
 */
const getClimbingGymAtributes = async (reference) =>{
    const ref = doc(db, reference);
    
    try {
        const doc = await getDoc(ref);
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached getClimbingGymAtributes data:", doc.data().name);
        return doc.data()
      } catch (e) {
        console.log("Error getting cached document:", e);
      }
}

const getGymInformation = async(reference, item) =>{
  
}

const getUsersFavoriteGyms = async(user) =>{
    let favorites = ""
    console.log(user)

    const q = query(collection(db, "users"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

    favorites = doc.data().Favorites
    });

    return favorites
}

/**
 * 
 * @returns all Gyms in the db (by returning all locations)
 */
const getAllGyms = async() =>{
    const ref = doc(db, '/GymLocations/Locations')
    try{
        const doc = await getDoc(ref)

        const locations = doc.data().locations


        console.log(locations, "ALL GYMS")

        return locations
    } catch(e){
        console.log("Error getting all gyms:",e)
    }
}

/**
 * 
 * @param {The locatoin to be returned} location 
 * @returns all clubs from one location
 */
const getGymsFromLocation = async(location) =>{
    const ref = doc(db, "Gyms/"+location )

    try {
        const doc = await getDoc(ref)

        // console.log("Cached getGymsFromLocation data:", doc.data().gyms)
        return doc.data().gyms
      } catch (e) {
        console.log("Error getting cached document:", e)
      }
}

//PASSWORD RESET 
//

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

//LOGOUT
//

const logout = () => {
    signOut(auth);
};

//OTHER USEFUL

const getUser = () =>{
    return auth.currentUser
}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getUser,
    getClimbingGymAtributes,
    getAllGyms, 
    getGymsFromLocation,
    getUsersFavoriteGyms,
};