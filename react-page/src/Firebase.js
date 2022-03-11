import { async } from "@firebase/util";
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
    updateDoc,
    arrayUnion,
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

const getUserPath = async(user) => {
    // ViKv6N9ZuLTZM1RzloAQ
    const q = query(collection(db, "users"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // });

    return querySnapshot.docs[0].id
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
    const querySnapshot = await getDocs(collection(db, "GymTest"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().path);
    });

    return querySnapshot;
}

/**
 * 
 * @param {The locatoin to be returned} location 
 * @returns all clubs from one location
 */
const getGymsFromLocation = async(location) =>{
    const q = query(collection(db, "GymTest"), where("location", "==", location));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });

    return querySnapshot
}

const getGymsFromState = async(state) => {
    const q = query(collection(db, "GymTest"), where("state", "==", state));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });

    return querySnapshot
}

const getAllStates = async() => {
    let states = []
    const querySnapshot = await getDocs(collection(db, "GymTest"));
    querySnapshot.forEach((doc) => {
        let state = doc.data().state

        if (!states.includes(state)){
            states.push(state)
        }
    });

    return states;
}

const getAllLocations = async() => {
    let locations = []
    const querySnapshot = await getDocs(collection(db, "GymTest"))
    querySnapshot.forEach(doc => {
        let loc = doc.data().location
        console.log(doc.id, " => ", loc)
        if(!locations.includes(loc)){
            locations.push(loc)
        }
    })

    return locations
}

const checkGymWithFilter = async(gymRef,stateLoc,stateSta) =>{
    console.log("TESTING THE FILTERS")
    let valid = false
    let gym = await getClimbingGymAtributes(gymRef)
   
    let loc = gym.location
    let sta = gym.state
    if (stateSta != "none" && stateLoc != "none"){
        if(sta === stateSta && loc === stateLoc){
            console.log("BOTH ARE DIFFERENT")
            valid = true
        } 
    } else if (stateSta != "none"){
        if(sta === stateSta){
            console.log("STATE IS DIFFERENT")
            valid =  true
        }
    } else if (stateLoc != "none"){
        if(loc === stateLoc){
            console.log("LOCATION IS DIFFERENT", loc, stateLoc, loc === stateLoc)
            valid = true
        }
    }
    
    return valid
}

const addGymToUserFavorite = async(user, gym) => {
    let gyms = await getUsersFavoriteGyms(user)
    let id = ""
    const q = query(collection(db, "users"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        id = doc.id
    })

    let gymNew = []

    gyms.forEach(gym => {
        gymNew.push(gym)
    })

    gymNew.push(gym)

    const ref = doc(db, "users", id)
    
    await updateDoc(ref, {
        Favorites: gymNew
    })
}

const removeGymFromUserFavorite = async(user, gym) => {
    let gyms = await getUsersFavoriteGyms(user)
    let id = ""

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
        id = doc.id
    })
     
    let gymNew = []

    gyms.forEach(gymCur =>{
        if (gymCur !== gym){
            gymNew.push(gymCur)
        }
    })

    const ref = doc(db, "users", id)
    
    await updateDoc(ref, {
        Favorites: gymNew
    })
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
    getGymsFromState,
    getUserPath,
    getAllStates,
    getAllLocations, 
    checkGymWithFilter,
    addGymToUserFavorite,
    removeGymFromUserFavorite
};