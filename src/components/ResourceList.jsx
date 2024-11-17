import { useEffect, useState } from "react";
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

    const tagsList = ["Asian", "LGBTQ+", "Latino", "Bilingual Services",
        "Assessment Services", "Individual Therapy",
        "Group Therapy", "Family Therapy", "Dyadic Therapy", "Peer Support",
        "Psychiatric Provider", "School-Based Services",
        "Bilingual Services", "All Age Groups", "Youth (Up to 24 Years Old)",
        "Case Management", "Crisis Hotline"];

    const [tagFilter, setTagFilter] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    // Holds the tags that will be used to filter
    function applyTagFilter(tags) {
        setTagFilter(tags);
    }
    // Holds the search filter functions
    function applySearchFilter(search) {
        setSearchFilter(search);
    }
    // let finalSFResources = data.resources;

    // useEffect(() => {

    //     let tagFilteredResources = data.resources.filter(resource => {
    //         const resourceTags = resource.properties.serviceType || [];
    //         return tagFilter.every(tag => resourceTags.includes(tag));
    //     });
    //     console.log(tagFilteredResources, "tagFilteredResources")

    //     let searchFilteredResources = tagFilteredResources.filter((resource) => {
    //         if (searchFilter.length < 1) {
    //             return resource;
    //         }
    //         else {
    //             let titleUpper = resource.properties.resourceName.toUpperCase()
    //             let tagsUpper = resource.properties.serviceType.toString().toUpperCase();
    //             let addressUpper = resource.properties.address.toUpperCase()
    //             const searchUpper = searchFilter.toUpperCase()
    //             if (titleUpper.includes(searchUpper) || tagsUpper.includes(searchUpper)
    //                 || addressUpper.includes(searchUpper)) {
    //                 return resource;
    //             }

    //         }
    //     });
    //     finalSFResources = searchFilteredResources;
    // });



    console.log("Before filtering", tagFilter)
    // Filters the resources by the tags 
    const tagFilteredResources = data.resources.filter(resource => {
        const resourceTags = resource.properties.serviceType || [];
        return tagFilter.every(tag => resourceTags.includes(tag));
    })
    console.log(tagFilteredResources, "tagFilteredResources")

    // .filter((resource) => {
    //     // console.log("In filtering", tagFilter)
    //     if (tagFilter.length < 1) {
    //         return resource;
    //     }
    //     else if (resource.properties.serviceType.forEach((tag) => tagFilter.includes(tag))){
    //         return resource;
    //     }
    // })

    const searchFilteredResources = tagFilteredResources.filter((resource) => {
        if (searchFilter.length < 1) {
            return resource;
        }
        else {
            let titleUpper = resource.properties.resourceName.toUpperCase()
            let tagsUpper = resource.properties.serviceType.toString().toUpperCase();
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
            {!props.user && <p>You are not currently signed in. <Link to="/login">Log-in</Link> to save these resources for later.</p>  }
            <CardFilter applyTagFilterCallback={applyTagFilter} applySearchFilterCallback={applySearchFilter} searchFilter={searchFilter}/>
            
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
                <img src={resource.properties.image} className="card-img-top" alt={resource.properties.resourceName + " logo"} />

                <div className="card-body" style={{ fontSize: '1.2rem' }}>
                    <h2 className="card-title" style={{ fontSize: '1.2rem' }}>{resource.properties.resourceName}</h2>
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{"Address: " + resource.properties.address}</li>
                    <li className="list-group-item">{"Phone: " + resource.properties.phoneNumber}</li>
                    <li className="list-group-item">
                        <a href={resource.properties.website} className="card-link">{resource.properties.website}</a>
                    </li>
                </ul>
                <div className="d-flex">
                        <Link className="btn btn-primary learn-more flex-fill" to={"/resources/" + props.keyVal}>Learn More</Link>
                        {props.user && saveButton}
                </div>
            </div>
            {confirmation != "" && confirmation}
        </div>
    )
}


function ResourceCardList(props) {
    const resources = props.resources;
    const resourceCardList = resources.map((resource, index) => {
        return (
            <div className="d-flex justify-content-center col-lg-6 col-xl-4 col-sm-12" key={index}>
                <ResourceCard resource={resource} keyVal={index} key={index} user={props.user} saveResource={props.saveResource} savedResources={props.savedResources} deleteResource={props.deleteResource}/>
            </div>
        );
    })
    return (
        <div className="carditem" >
            <div className="d-flex row justify-content-center flex-wrap">
                {resourceCardList}
            </div>
        </div>
    );

}