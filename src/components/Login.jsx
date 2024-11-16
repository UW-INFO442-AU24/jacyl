//import auth functions and variables from Firebase
import { getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//import the component -- pick one!
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; //install option 1

//an object of configuration values
const firebaseUIConfig = {
  signInOptions: [ //array of sign in options supported
    //array can include just "Provider IDs", or objects with the IDs and options
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup', //don't redirect to authenticate
  credentialHelper: 'none', //don't show the email account chooser
  callbacks: { //"lifecycle" callbacks
    signInSuccessWithAuthResult: () => {
      return false; //don't redirect after authentication
    }
  }
}

//the React compnent to render
export function Login({user}) {

  const auth = getAuth(); //access the "authenticator"
  console.log("render");

  return (
    <div className="container d-flex justify-content-center">
      <div style={{ width: "300px"}}>
        <div className="card my-5 py-5">
          <div className="card-body">
            {!user ? 
            <div>
              <p className="text-center">Sign-in to your account to get easy access to saving resources.</p>
              <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
            </div> :
            <div>
              <p>You have been successfully signed in! </p>
              <p>Get started with <Link to="/resources">looking for resources!</Link></p>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}