export function Profile({ personObj }) {

    const {name, linkedin, photo} = personObj

    return (
        <div className="d-flex flex-column text-center flex-grow-3 col-xl-4 col-md-6 align-items-center mb-5"> 
            <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="profile-name">{name}</h3>
                <a href={linkedin} target="_blank"><img width={35} height={35} src="img/linkedin-icon.png" alt="linkedin logo"/></a>
            </div>
            <div>
                <div className="circle">
                    <img className="photo" src={photo} alt={"photo of " + name} />
                </div>
            </div>
        </div>
    )

}