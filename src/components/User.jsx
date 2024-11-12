import { useNavigate } from "react-router-dom"
import data from "../data/resources1.json"
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function ResourceCard({ resource, keyVal }) {
    return (
        <div className="card mb-5" style={{ width: '20rem'}}>
            <img src={resource.image} className="card-img-top" alt="..." />

            <div className="card-body" style={{ fontSize: '1.2rem' }}>
                <h2 className="card-title" style={{ fontSize: '1.2rem' }}>{resource.resourceName}</h2>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">{"Address: " + resource.address}</li>
                <li className="list-group-item">{"Phone: " + resource.phoneNumber} </li>
                <li className="list-group-item">
                    <a href={resource.website} className="card-link">{resource.website}</a>
                </li>
                <Link className="btn btn-primary" to={"/resources/" + keyVal}>Learn More</Link>
            </ul>

        </div>
    )
}


export function User({user, savedResources}) {
    const auth = getAuth();

    function signout() {
        signOut(auth)
            .catch((err) => {
                console.log(err);
            })
        navigate("/");
        
    }

    const navigate = useNavigate();
    

    let savedResourcesCards = [];
    if (savedResources) {
        savedResources.forEach((savedResource, index) => {
            savedResourcesCards.push(
            <div className="d-flex justify-content-center col-md-4 col-sm-6" key={index}>
                <ResourceCard resource={data.resources[savedResource.resourceNum].properties} keyVal={savedResource.resourceNum}/>
            </div>
            );
        })
    }


    return (
        <div className="container">
            <h1>{"Welcome back " + (user ? user.displayName : "")}</h1>
            {user ? <button className="btn btn-primary" onClick={signout}>Logout</button> : <button className="btn btn-primary">Login</button>}
            <h2>Saved Resources</h2>
            
            <div className="d-flex row">
                {savedResourcesCards}
            </div>

        </div>
    )
}