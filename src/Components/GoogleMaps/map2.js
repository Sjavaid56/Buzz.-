// import React from 'react'
// import { compose, withProps } from 'recompose'
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, google } from 'react-google-maps'
// import { Ref } from 'semantic-ui-react';
// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


// const keyGoogle = 'AIzaSyC-Tk6bC9tZGDA5Xe_aFoRyi63Q3ior4sw';



// const MapComponent = compose(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${keyGoogle}&v=3.exp&libraries=geometry,drawing,places`,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `100vh` }} />,
//     mapElement: <div style={{ height: `86%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={17}
//     defaultCenter={{
//       lat: props.currentLocation.lat,
//       lng: props.currentLocation.lng,
//     }}
//   >
//     {props.isMarkerShown &&
//       <Marker
//         position={{
//           lat: props.currentLocation.lat,
//           lng: props.currentLocation.lng,
//         }}
//           icon={{
//             url: "https://www.google.com/search?biw=1440&bih=820&tbm=isch&sa=1&ei=Q0eeXIauCsHY-gSp2YSQAQ&q=bee+icon&oq=bee+icon&gs_l=img.3..35i39l2j0j0i67j0l3j0i5i30j0i5i10i30j0i5i30.11402.12433..12576...0.0..0.137.787.0j6......1....1..gws-wiz-img.Sg3krO7Pago#imgrc=s-z_QbFN1Tgp2M:",
//             Anchor: new window.google.maps.Point(37, 24)
//           }}
//         onClick={props.onMarkerClick}
//       />
      
      
//     }
//   </GoogleMap>
// )

// export default MapComponent