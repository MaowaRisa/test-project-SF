import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import './App.css'
import app from "./firebase/firebase.config";
import { useState } from "react";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      setUser(loggedUser)
    })
    .catch(error =>{
      console.log(error.message);
    })
  }
  const handleFacebookSignIn = () =>{
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      setUser(loggedUser)
    })
    .catch(error =>{
      console.log(error.message);
    })
  }
  const handleGoogleSignOut = () =>{
    signOut(auth)
    .then(()=>{
      setUser(null)
    })
    .catch(error =>{
      console.log(error.message)
    })
  }
  return (
    <>
      <h1>Firebase + React</h1>
      <div>
        {
          user ? 
            <button onClick={handleGoogleSignOut}>Sign out</button> : 
            <div>
              <button onClick={handleGoogleSignIn}>Sign in with Google</button>
              {/* Because of some facebook settings I didn't complete it but it is possible to do  */}
              <button onClick={handleFacebookSignIn}>Sign in with Facebook</button>
            </div>
        }
        {
          user && 
          <div>
            <h1>{user.displayName}</h1>
            <img src={user.photoURL} alt="" />
          </div>
        }
      </div>
    </>
  )
}

export default App
