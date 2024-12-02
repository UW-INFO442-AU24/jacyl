// File contains a personalized dashboard when user is logged in to view and delete their saved resources

import { useNavigate } from "react-router-dom"
import data from "../data/resources1.json"
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

function ResourceCard({ resource, keyVal, deleteResource, user }) {

    return (
        <div className="card mb-5" style={{ width: '20rem' }}>
            <img src={resource.image} className="card-img-top" alt={resource.resourceName + " logo"} />

            <div className="card-body" style={{ fontSize: '1.2rem' }}>
                <h2 className="card-title" style={{ fontSize: '1.2rem' }}>{resource.resourceName}</h2>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">{"Address: " + resource.address}</li>
                <li className="list-group-item">{"Phone: " + resource.phoneNumber} </li>
                <li className="list-group-item">
                    <a href={resource.website} className="card-link">{resource.website}</a>
                </li>        
                <div className="d-flex flex-column">
                    <Link className="btn btn-primary learn-more" to={"/resources/" + keyVal}>Learn More</Link>
                    {user && <button className="btn btn-danger action-button flex-fill" onClick={() => {
                        deleteResource(keyVal);
                    }}>Remove Saved Resource</button>}
                </div>
        
            </ul>
        </div>
    )
}


export function User({ user, savedResources, deleteResource }) {
    const auth = getAuth();

    function signout() {
        signOut(auth)
            .catch((err) => {
                console.log(err);
            })
        navigate("/");

    }

    useEffect(() => {
        if (user == null) {
            navigate("/");
        }
    }, [user])

    const navigate = useNavigate();

    let savedResourcesCards = [];
    let firstName = "";

    if (user) {
        const nameSpace = user.displayName.indexOf(" ");
        firstName = user.displayName.substring(0, nameSpace);
    } 

    if (savedResources) {
        [...savedResources].reverse().forEach((savedResource, index) => {
            savedResourcesCards.push(
                <div className="d-flex justify-content-center col-md-6 col-sm-12 col-lg-4" key={index}>
                    <ResourceCard resource={data.resources[savedResource.resourceNum].properties} keyVal={savedResource.resourceNum} user={user} deleteResource={deleteResource} />
                </div>
            );
        })
    }

    return (
        <div className="container">
            {user ?
                <div className="user-container row mt-4 mb-5">
                    <div className="welcome-container col-md-4">
                        <h1 className="mb-md-2">Welcome{user ? ", " + firstName + "." : ""}</h1>
                        <p className="mb-md-4">Find all of your saved resources on this page. Looking for more resources? <Link to="/resources">Find them here.</Link></p>
                        <button className="btn btn-primary" onClick={signout}>Logout</button>
                    </div>
                    <div className="col-md-8">
                        <h2 className="text-center mb-4">Saved Resources</h2>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex row">
                                    {savedResourcesCards.length > 0 ? savedResourcesCards : <p className="text-center mt-3">You currently don't have any saved resources. <Link to="/resources">Find some resources here.</Link></p>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                :
                <div>
                    <h1>Please Login to view or save resources!</h1>
                    <Link className="btn btn-primary" to="/login">Login</Link>
                </div> /* this appears if useEffect doesn't work for some reason  */
            }

        </div>
    )
}