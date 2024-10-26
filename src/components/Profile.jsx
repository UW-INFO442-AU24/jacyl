export function Profile({ name }) {
    return (
        <div className="d-flex flex-column text-center flex-grow-3 col-lg-4 col-md-6 align-items-center mb-5"> 
            <div className="d-flex align-items-center gap-3 mb-3">
                <h1>{name}</h1>
                <a href="https://linkedin.com" target="_blank"><img width={35} height={35} src="img/linkedin-icon.png" /></a>
            </div>
            <div>
                <div className="circle"></div>
            </div>
        </div>
    )

}