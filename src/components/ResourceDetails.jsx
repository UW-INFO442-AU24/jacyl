import { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import data from "../data/resources1.json";
import { useParams, useNavigate } from "react-router-dom";
import { set as firebaseSet } from "firebase/database";



export function ResourceDetails({user, saveResource, deleteResource, savedResources}) {

    const [confirmation, setConfirmation] = useState("");
    const urlParams = useParams();

    const { resourceName, address, description, image, phoneNumber, serviceType, website } = data.resources[urlParams.id].properties;

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    });

    const navigate = useNavigate();

    const position = data.resources[urlParams.id].geometry.coordinates;
    let saveButton = (<button className="btn btn-primary" onClick={() => {
                            saveResource(urlParams.id);
                            setConfirmation(<p>This resource has been successfully saved to your <Link to="/user">profile</Link>.</p>)
                        }}>Save Resource</button>)

    if (user && savedResources != null) {
        savedResources.forEach((resource) => {
            if (resource.resourceNum == urlParams.id) {
                saveButton = <button className="btn btn-secondary" onClick={() => {
                    deleteResource(urlParams.id);
                    setConfirmation(<p>This resource has been successfully removed from your <Link to="/user">profile</Link>.</p>)
                }}>Remove Saved Resource</button>
            }
        })
    } else if (!user) {
        saveButton = (<p>Want to save this resource for later? <Link to="/login">Sign-in</Link> to save it!</p>);
    }

    return (
        <div className="details-wrap my-5">
            <div className="container">
                <div className="mb-3">
                    <Link onClick={() => navigate(-1)}>&#8592; Return To Previous Page</Link>
                </div>
                <div className="d-flex row">
                    <div className="col-md-6">
                        <div className="mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-title">{resourceName}</h1>
                                    <p className="card-text">{description}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <h2 className="card-text mb-0">Phone Number</h2>
                                        <p>{phoneNumber}</p>
                                    </div>
                                    <div>
                                        <h2 className="card-text mb-0">Location</h2>
                                        <p>{address}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="card-text mb-0">Website Link</h2>
                                        <a href={website} target="_blank">{website}</a>
                                    </div>
                                    <div>
                                        <h2 className="card-text mb-0">Categories</h2>
                                        {serviceType.join(", ")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div>
                            <MapContainer center={position} zoom={15} style={{ height: "500px", width: "100%" }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>{resourceName}</Popup>
                                </Marker>

                            </MapContainer>
                        </div>
                        <div className="mt-2">
                            {saveButton}
                            {confirmation}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}