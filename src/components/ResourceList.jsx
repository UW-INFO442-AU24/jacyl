import { useState } from "react";
import { CardFilter } from "./CardFilter";
import data from "../data/resources1.json"

// const resourcesTemp = [
//     { name: "Resource 1", tags: ['Tag1', 'Tag2'], address: '123 Main Street' },
//     { name: "Resource 2", tags: ['Tag2', 'Tag3'], address: '567 Main Street' },
//     { name: "Resource 3", tags: ['Tag4', 'Tag3'], address: '321 Main Street' },
//     { name: "Outlier Resource", tags: ['Tag5'], address: 'Seattle UW' },

// ];



export function ResourceList(props) {

    const [tagFilter, setTagFilter] = useState('All')
    const [searchFilter, setSearchFilter] = useState('')

    function applyTagFilter(tag) {
        setTagFilter(tag)
    }

    function applySearchFilter(search) {
        setSearchFilter(search)
    }

    //REPLACE TEMP VALUE WHEN JSON USED 
    const tagFilteredResources = data.resources.filter((resource) => {
        if (tagFilter === 'All') {
            return resource;
        }
        else if (resource.properties.serviceType.includes(tagFilter)) {
            return resource;
        }
    })

    const searchFilteredResources = tagFilteredResources.filter((resource) => {
        if (searchFilter.length < 1) {
            return resource;
        }
        else {
            const titleUpper = resource.properties.resourceName.toUpperCase()
            const searchUpper = searchFilter.toUpperCase()
            if (titleUpper.includes(searchUpper)) {
                return resource;
            }
        }
    });

    return (
        // OVERALL BACKGROUND STYLE HERE
        <div style={{ background: 'rgb(2, 0, 36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(239,249,255,1) 0%, rgba(84,222,250,1) 98%)' }}>
            <h1>ResourceList</h1>
            <CardFilter resources={data.resources} applyTagFilterCallback={applyTagFilter} applySearchFilterCallback={applySearchFilter}></ CardFilter>
            
            {/* ROW/COLUMN STYLE HERE */}
            <div className="d-flex flex-row flex-wrap gap-4 justify-content-center" style={{ background: 'rgb(2, 0, 36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(239,249,255,1) 0%, rgba(84,222,250,1) 98%)' }}>
                <ResourceCardList resources={searchFilteredResources} />
            </div>
        </div>
    )
}






function ResourceCard(props) {

    // For when the JSON integration happens
    // const resource = props.resource;
    // const tagsList = resource.tags.map((tag) => {
    //     return (<li className="list-group-item tag" key={tag}>{tag}</li>);
    // });
    const resource = props.resource
    const tagsList = resource.properties.serviceType.map((tag) => {
        return (<li className="list-group-item tag" key={tag}>{tag}</li>);
    });

    return (

        // CARD STYLE HERE
        <div className="card" style={{ width: '20rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px', background: 'rgb(239,250,255)', background: 'linear-gradient(90deg, rgba(239,250,255,1) 0%, rgba(138,138,138,1) 100%)' }}>
            <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="card-img-top" alt="..." />

            <div className="card-body" style={{ fontSize: '1.2rem' }}>
                <h2 className="card-title" style={{ fontSize: '1.2rem' }}>{resource.properties.resourceName}</h2>
                <p className="card-text">{resource.properties.description}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <ul className="list-group list-group">
                        {tagsList}
                    </ul>
                </li>
                <li className="list-group-item">{resource.properties.address}</li>
                <li className="list-group-item"> {resource.properties.phoneNumber} </li>
                <li className="list-group-item">
                    <a href={resource.properties.website} className="card-link">{resource.properties.website}</a>
                </li>
                

            </ul>

        </div>
    )
}


function ResourceCardList(props) {
    const resources = props.resources;
    const resourceCardList = resources.map((resource, index) => {
        return (
            <div key={index}>
                <ResourceCard resource={resource} keyVal={index} key={index} />
            </div>
        );

    })
    return (
        <div className="d-flex flex-row flex-wrap gap-4 justify-content-center" >
            {resourceCardList}
        </div>
    );

}