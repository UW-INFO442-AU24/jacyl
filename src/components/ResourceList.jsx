import { useState } from "react";
import { CardFilter } from "./CardFilter";
import data from "../data/resources1.json"
import { Link } from "react-router-dom";
import { remove } from "firebase/database";
// const resourcesTemp = [
//     { name: "Resource 1", tags: ['Tag1', 'Tag2'], address: '123 Main Street' },
//     { name: "Resource 2", tags: ['Tag2', 'Tag3'], address: '567 Main Street' },
//     { name: "Resource 3", tags: ['Tag4', 'Tag3'], address: '321 Main Street' },
//     { name: "Outlier Resource", tags: ['Tag5'], address: 'Seattle UW' },

// ];



export function ResourceList(props) {

    const [tagFilter, setTagFilter] = useState([])
    const [searchFilter, setSearchFilter] = useState('')

    function applyTagFilter(tag) {
        setTagFilter(tag);
    }

    function applySearchFilter(search) {
        setSearchFilter(search);
    }

    //REPLACE TEMP VALUE WHEN JSON USED 
    const tagFilteredResources = data.resources.filter((resource) => {
        if (tagFilter.length < 1) {
            return resource;
        }
        else if (tagFilter.every(tag => 
            resource.properties.serviceType.includes(tag))) {
            return resource;
        }
    })

    const searchFilteredResources = tagFilteredResources.filter((resource) => {
        if (searchFilter.length < 1) {
            return resource;
        }
        else {
            let titleUpper = resource.properties.resourceName.toUpperCase()
            let tagsUpper = resource.properties.serviceType.toString().toUpperCase();
            // tagsUpper = (tagsUpper.toString)
            let addressUpper = resource.properties.address.toUpperCase()
            const searchUpper = searchFilter.toUpperCase()
            if (titleUpper.includes(searchUpper) || tagsUpper.includes(searchUpper)
                || addressUpper.includes(searchUpper)) {
                return resource;
            }
                
        }
    });

    return (
        // OVERALL BACKGROUND STYLE HERE
        <div className="container my-4">
            <h1>Resource List</h1>
            {!props.user && <p>You currently aren't signed in. <Link to="/login">Log-in</Link> to save these resources for later.</p>  }
            <CardFilter applyTagFilterCallback={applyTagFilter} applySearchFilterCallback={applySearchFilter}></ CardFilter>
            
            {/* ROW/COLUMN STYLE HERE */}
            <div>
                <ResourceCardList resources={searchFilteredResources} user={props.user} saveResource={props.saveResource} savedResources={props.savedResources} deleteResource={props.deleteResource} />
            </div>
        </div>
    )
}


function ResourceCard(props) {

    const [confirmation, setConfirmation] = useState("");

    const resource = props.resource;

    let saveButton = (<button className="btn btn-success action-button flex-fill" onClick={() => {
                            props.saveResource(props.keyVal);
                            setConfirmation(<p>This resource has been successfully saved to your <Link to="/user">profile</Link>.</p>);
                        }}>Save Resource</button>);

    if (props.user && props.savedResources != null) {
        props.savedResources.forEach((resource) => {
            if (resource.resourceNum == props.keyVal) {
                saveButton = <button className="btn btn-danger action-button flex-fill" onClick={() => {
                    props.deleteResource(props.keyVal);
                    setConfirmation(<p>This resource has been successfully removed from your <Link to="/user">profile</Link>.</p>);
                }}>Remove Saved Resource</button>
            }
        })
    } else if (!props.user) {
        saveButton = (<p>Want to save this resource for later? <Link to="/login">Sign-in</Link> to save it!</p>);
    }

    
    return (
        <div className="mb-5" style={{ width: '20rem'}}>
            <div className="card" style={{ width: '20rem'}}>
                <img src={resource.properties.image} className="card-img-top" alt="..." />

                <div className="card-body" style={{ fontSize: '1.2rem' }}>
                    <h2 className="card-title" style={{ fontSize: '1.2rem' }}>{resource.properties.resourceName}</h2>
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{"Address: " + resource.properties.address}</li>
                    <li className="list-group-item">{"Phone: " + resource.properties.phoneNumber}</li>
                    <li className="list-group-item">
                        <a href={resource.properties.website} className="card-link">{resource.properties.website}</a>
                    </li>
                    <div className="d-flex">
                        <Link className="btn btn-primary learn-more flex-fill" to={"/resources/" + props.keyVal}>Learn More</Link>
                        {props.user && saveButton}
                    </div>
                </ul>
            </div>
            {confirmation != "" && confirmation}
        </div>
    )
}


function ResourceCardList(props) {
    const resources = props.resources;
    const resourceCardList = resources.map((resource, index) => {
        return (
            <div className="justify-content-center col-md-4 col-sm-6" key={index}>
                <ResourceCard resource={resource} keyVal={index} key={index} user={props.user} saveResource={props.saveResource} savedResources={props.savedResources} deleteResource={props.deleteResource}/>
            </div>
        );
    })
    return (
        <div className="d-flex flex-row gap-4 justify-content-center carditem" >
            <div className="row">
                {resourceCardList}
            </div>

        </div>
    );

}