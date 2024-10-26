import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmYSO8nYMz_7O3cfjZScNYdB-QhCxNy5I",
  authDomain: "mindconnect-af628.firebaseapp.com",
  projectId: "mindconnect-af628",
  storageBucket: "mindconnect-af628.appspot.com",
  messagingSenderId: "899239528503",
  appId: "1:899239528503:web:828ad75ad334288308d7b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
