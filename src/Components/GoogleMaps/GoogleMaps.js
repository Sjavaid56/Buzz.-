import React, { Component } from 'react'
import './GoogleMaps.css'
import axios from 'axios'
import Diamond from '/Users/shawnjavaid/Documents/Buzz.-/src/images/assets/logo/buzz-logo-orange-nobg.png';

const getGeoLocation = () => {
  const geolocation = navigator.geolocation;

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject(new Error('Permission denied'));
    });
  });

  return location
};

class App extends Component {
  state = {
    venues: [],
    venues2: [],
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    isMarkerShown: false
  }
  componentDidMount() {
    // this.getVenues()
    this.getVenues2()
    this.initGeoLocation();
    
  }

  componentWillUpdate() {
    this.initGeoLocation()
  }
  initGeoLocation() {
    getGeoLocation().then(location => {
      this.setState({
        currentLatLng: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
        isMarkerShown: true
      })
    });
  }
  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.initGeoLocation()
  }
  renderMap = () => {
    console.log("lat long", this.currentLatLng)
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAw-IsGNyHe3mJi28Anppdw3uTzRX4l6mY&callback=initMap")
    window.initMap = this.initMap
  }
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: "coffee",
      near: "Phoenix",
      v: "20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }
  getVenues2 = () => {
    axios.get("/dbvenues")
      .then(business => {
        this.setState({
          venues2: business.data
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })
  }


  
  initMap = () => {
    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 33.4486, lng: -112.0773 },
      zoom: 12

    })

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow()
    // Display Dynamic Markers
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`
      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name
      })
      // Click on A Marker!
      marker.addListener('click', function () {
        // Change the content
        infowindow.setContent(contentString)
        // Open An InfoWindow
        infowindow.open(map, marker)
      })
    })


    this.state.venues2.map(myVenue => {
      console.log("latlong", myVenue.latitude)
      var contentString2 = `${myVenue.business_name}`
      // Create A Marker
   

      var marker2 = new window.google.maps.Marker({
        position: { lat: myVenue.latitude, lng: myVenue.longitude },
        map: map,
        title: myVenue.business_name,
        // icon: image
        // animation: google.maps.Animation.DROP,

      })
      // Click on A Marker!
      marker2.addListener('click', function () {
        // Change the content
        infowindow.setContent(contentString2)
        // Open An InfoWindow
        infowindow.open(map, marker2)
      })

    })


  }
  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}
export default App;


// import React, { Component } from 'react';
// import MapComponent from './map2';
// import axios from "axios";

// const getGeoLocation = () => {
//   const geolocation = navigator.geolocation;
  
//   const location = new Promise((resolve, reject) => {
//     if (!geolocation) {
//       reject(new Error('Not Supported'));
//     }
    
//     geolocation.getCurrentPosition((position) => {
//       resolve(position);
//     }, () => {
//       reject (new Error('Permission denied'));
//     });
//   });
  
//   return location
// };

// class GoogleMaps extends Component {
//   state = {
//     loading: true,
//     venues: [],
//     name:[],
//     lat: [],
//     lng: [],
//     currentLatLng: {
//       lat: 0,
//       lng: 0,
//     },
//     isMarkerShown: false
//   }

  // componentDidMount() {
  //   this.initGeoLocation();
  //   axios.get("/dbvenues").then(business => {
  //     console.log("db bdata", business.data.latitude, business.data.business_name)
  //     console.log(typeof business.data[0].latitude)
  //     console.log("full db info",business.data)
  //     this.setState({
  //       venues: business.data
  //     })
  //   })
  // }
  

  


//   componentWillUpdate(){
//     this.initGeoLocation()
//   }

//   initGeoLocation() {
//     getGeoLocation().then(location=> {
//       this.setState({
//         loading: false,
//         currentLatLng: {
//           lat: location.coords.latitude,
//           lng: location.coords.longitude,
//         },
//         isMarkerShown: true
//       })
//     });
//   }

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.initGeoLocation()
//   }

 
//   render() {

    
//     const { loading, isMarkerShown, currentLatLng } = this.state;

//     if (loading) {
//       return 'One second, Buzz is looking for some hives near you.';
//     }
    
//     return (
      
//       <MapComponent
//         isMarkerShown={isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//         currentLocation={currentLatLng}
//         venues = {this.state.venues}
//       />
//     );
//   }
// }

// export default GoogleMaps;