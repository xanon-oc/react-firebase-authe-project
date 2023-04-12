import React, { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../FireBase/FireBase.init";
const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  console.log(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    // console.log("google mama is coming");
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={handleGoogleSignIn}>Google Login</button>
      <button onClick={handleSignOut}>Sign Out</button>
      {user && (
        <div>
          <h3>user : {user?.displayName}</h3>
          <p>Email : {user.email}</p>
          <img src={user?.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
