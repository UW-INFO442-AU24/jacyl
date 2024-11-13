import { Profile } from "./Profile"

export function About() {

    //this array will need to be converted into objects: Name, Linkedin Link, Photo, and Project Role
    const names = [
        { name: "James Nguyen", linkedin: "https://www.linkedin.com/in/jam860", photo: "/img/james.jpg" },
        { name: "Arya Karki", linkedin: "https://www.linkedin.com/in/arya-karki", photo: "/img/arya.jpg" },
        { name: "Cole Elsasser", linkedin: "https://www.linkedin.com/in/cole-elsasser-a450022b1", photo: "/img/cole.jpg" },
        { name: "Ysabelle Olairez", linkedin: "https://www.linkedin.com/in/ysabellelara", photo: "/img/ysabelle.jpg" },
        { name: "Linda Li", linkedin: "https://www.linkedin.com/in/linda-li-01ab372b6", photo: "/img/linda.jpg" }];

    const profiles = names.map((personObj) => {
        return <Profile personObj={personObj} key={personObj.name} />;
    });

    return (
        <div className="container mt-5 mb-5">
            <h1 className="mb-5">About Us</h1>
            <div className="d-flex mb-5 row flex-wrap">
                <div className="col-md-7">
                    <iframe className="youtube-video" src="https://www.youtube.com/embed/l4V31iXtrWo" title="Overcoming the stigma around mental illness by Michaela Mulenga" />
                </div>
                <div className="d-flex col-md-5">
                    <div className="card mt-4 mt-md-0">
                        <div className="card-body">
                            <h2 className="mission-title">Our Misson</h2>
                            <p className="mission-text">
                                Our mission is to empower young adults (16-20 year olds) in King County by providing accessible mental health resources through a user-friendly platform. We aim to reduce stigma surrounding mental health, centralize mental health resources in King County, and facilitate community connections. By providing centralized information and offering tailored support, we hope to create an inclusive environment where young adults can confidently seek help and improve their well-being.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="text-center">
                        <h2 className="team-title mb-1">Meet Our Team</h2>
                        <p className="mb-5">Informatics Students at the University of Washington</p>
                    </div>
                    <div className="d-flex justify-content-center flex-wrap row">
                        {profiles}
                    </div>
                </div>
            </div>
        </div>
    )
}
