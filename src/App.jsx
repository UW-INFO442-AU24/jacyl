import { useState } from 'react'
import { useEffect } from "react"
import { About } from "./components/about"
import {ResourceList} from "./components/ResourceList"
// import { CardFilter } from "./components/cardfilter"
// import { Quiz } from "./components/Quiz"
import { Map } from "./components/Map"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";
import { Home } from "./components/Home"
import { Routes, Route, Navigate } from 'react-router-dom';
import { Quiz } from './components/Quiz';
import { QuizQuestion } from './components/QuizQuestion';
import { ResourceDetails } from "./components/ResourceDetails"
import { Login } from "./components/Login" 
import { User } from "./components/User"
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { onAuthStateChanged, getAuth} from "firebase/auth"
import { useNavigate } from "react-router-dom"


function App() {

  const [user, setUser] = useState(null);
  const [savedResources, setSavedResources] = useState(null);

  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        console.log(firebaseUser);
        const userRef = ref(db, firebaseUser.uid + "/resources");
        onValue(userRef, (snapshot) => {
          const userResourcesObj = snapshot.val();
          if (userResourcesObj) {
            const userResourcesKeys = Object.keys(userResourcesObj);
            const userResources = userResourcesKeys.map((key) => {
              const resourceNum = userResourcesObj[key];
              const resourceObj = {resourceNum, key};

              return resourceObj;
            })
            setSavedResources(userResources);
          }
        })
      } else {
        setUser(null);
        setSavedResources(null);
        console.log("logged out");
      }
      // navigate('/');
    })

    return unsubscribe;
  }, [auth]);


  function saveResource(resourceNum) {
    //resourceNum example would be "22"
    const location = ref(db, user.uid + "/resources");

    if (!user) {
        navigate("/login");
    } else {
        firebasePush(location, resourceNum);
    }
  }

  function deleteResource(resourceNum) {
    let newSavedResources = [];
    savedResources.forEach((resource) => {
      if (resource.resourceNum != resourceNum) {
        newSavedResources.push(resource);
      } else {
        const location = ref(db, user.uid + "/resources/" + resource.key);
        firebaseSet(location, null);
      }
    })
    setSavedResources(newSavedResources);
  }

  return (
    <div>
      <Navbar user={user}/>
        <Routes>
         <Route path="*" element={<Home />} />
         <Route path="about" element={<About />} />
         <Route path="map" element={<Map />} />
         <Route path="quiz" element={<Quiz />} />
         <Route path="quizquestion" element={<QuizQuestion />} />
         <Route path="resources" element={<ResourceList />} />
         <Route path="resources/:id" element={<ResourceDetails user={user} saveResource={saveResource} savedResources={savedResources} deleteResource={deleteResource}/>} />
         <Route path="login" element={<Login /> } />
         <Route path="user" element={<User user={user} savedResources={savedResources}/>} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
