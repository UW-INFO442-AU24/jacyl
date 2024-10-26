import { Profile } from "./Profile"

export function About() {

    //this array will need to be converted into objects: Name, Linkedin Link, Photo, and Project Role
    const names = ["James Nguyen", "Arya Karki", "Cole Elsasser", "Ysabelle Olairez", "Linda Li"];

    const profiles = names.map((name) => {
        return <Profile name={name} />;
    });

    return (
        <div className="container mt-5 mb-5">
        <h1 className="mb-5">About Us</h1>
            <div className="d-flex mb-5 row flex-wrap">
                <div className="col-md-7"> 
                    <iframe className="youtube-video" src="https://www.youtube.com/embed/l4V31iXtrWo" title="Overcoming the stigma around mental illness by Michaela Mulenga"/>
                </div>
                <div className="col-md-5">
                    <h2 className="mission-title mt-5 mt-md-0">Our Misson</h2>
                    <p className="mission-text">
                        Our mission is to empower young adults (16-20 year olds) in King County by providing accessible mental health resources through a user-friendly platform. We aim to reduce stigma surrounding mental health, centralize mental health resources in King County, and facilitate community connections. By providing centralized information and offering tailored support, we hope to create an inclusive environment where young adults can confidently seek help and improve their well-being.
                    </p>
                </div>
            </div>
            <div className="text-center">
                <h2 className="team-title">Meet Our Team</h2>
                <p>Informatics Students at the University of Washington</p>
            </div>
            <div className="d-flex justify-content-center flex-wrap row">
                {profiles}
            </div>
        </div>
    )
}
