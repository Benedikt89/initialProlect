import React, {ReactNode} from "react";
// import { compose, withProps } from "recompose";
// import { GOOGLE_API_KEY } from "../reducer/requests";
// import {
//     withGoogleMap,
//     GoogleMap,
//     Marker,
//     withScriptjs,
// } from "react-google-maps";

interface I_props {
    lat: number,
    lng: number,
}
const MapComponent = ({ lat, lng }:I_props) => (
    <div>
        {/*<GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>*/}
        {/*    <Marker position={{ lat, lng }} />*/}
        {/*</GoogleMap>*/}
    </div>
);

// export default compose(
//     withProps({
//         googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `400px` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
//     // @ts-ignore
// )(MapComponent);
export default MapComponent;