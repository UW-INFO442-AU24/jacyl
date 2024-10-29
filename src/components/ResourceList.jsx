export function ResourceList() {
    return (
        <div>
            <h1>ResourceList</h1>
            
            <h2>Search/Filter Goes Here</h2>

            {/* Temporary flex box for visualization, 
            needs to scale w/ JSON */}
            <div className="d-flex flex-row flex-wrap gap-4 align-content-center justify-content-center">   
            <ResourceCard />
            <ResourceCard />
            <ResourceCard />
            <ResourceCard />
            <ResourceCard />
            </div>
            </div>  
    )
}






function ResourceCard(props) {
    return (
            <div className="card" style={{ width: '20rem' }}>
                <img src="https://alamocitygolftrail.com/wp-content/uploads/2022/11/canstockphoto22402523-arcos-creator.com_-1024x1024-1.jpg" className="card-img-top" alt="..." />

                <div className="card-body">
                    <h5 className="card-title">Resource Name</h5>
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