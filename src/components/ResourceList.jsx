
import { CardFilter } from "./CardFilter";

export function ResourceList() {
    return (
        <div>
            <h1>ResourceList</h1>

            {/* Temporary flex box for visualization, 
            needs to scale w/ JSON */}
            <CardFilter></ CardFilter>
            <div className="d-flex flex-row flex-wrap gap-4 justify-content-center">
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                {/* <ResourceCardList /> */}
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


    return (
        <div className="card" style={{ width: '20rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px', backgroundColor: '#fff'}}>
            <img src="https://alamocitygolftrail.com/wp-content/uploads/2022/11/canstockphoto22402523-arcos-creator.com_-1024x1024-1.jpg" className="card-img-top" alt="..." />

            <div className="card-body">
                <h4 className="card-title" style={{fontSize: '1.2rem'}}>Resource Name</h4>
                <p className="card-text">This is where a lot of the description information will go and the summary of the resource.</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">Tags</li>
                <li className="list-group-item">Address</li>
                <li className="list-group-item">
                    <a href="#" className="card-link">Resource Link 1</a>
                </li>

            </ul>

        </div>
    )
}


function ResourceCardList(props) {
    const resource = props.resource;
    const resourceCardList = resource.map((location, index) => {
        return (
            <div key={index}>
                <LocationCard location={location} keyVal={index} key={index} />
            </div>
        );

    })
    return (
        <div>
            {resourceCardList}
        </div>
    );

}