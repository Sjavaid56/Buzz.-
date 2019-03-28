import React, { Component } from 'react'
import './GoogleMaps.css'
import axios from 'axios'
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
    this.getVenues()
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
        console.log(response)
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
        const bdata = response.data.response.groups[0].items.map(business => {
          return {
            Name: business.venue.name,
            Type: business.venue.categories[0].pluralName,
            lat: business.venue.location.lat,
            Lng: business.venue.location.lng
         }
        })
        console.log("the stuff",bdata)
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }
  getVenues2 = () => {
    const endPoint2 = "https://api.foursquare.com/v2/venues/explore?"
    const parameters2 = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: "books",
      near: "Phoenix",
      v: "20182507"
    }
    axios.get(endPoint2 + new URLSearchParams(parameters2))
      .then(response => {
        this.setState({
          venues2: response.data.response.groups[0].items
        }, this.renderMap())
        let body =  response.data.response.groups[0].items
        console.log("body: ", body)
      }).then(()=>{

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
      console.log("latlong", this.currentLatLng)
      var contentString2 = `${myVenue.venue.name}`
      // Create A Marker
      var marker2 = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name
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
  sendLocToBack = () =>{
    for(let i = 0; i < this.state.venues2.length; i++){
      let body = {
        business_name:this.state.venues2[i].venue.name,
        business_type:this.state.venues2[i].venue.categories[i].pluralName,
        latitude:this.state.venues2[i].venue.location.lat,
        longitude:this.state.venues2[i].venue.location.lng,
        // number_of_users:0
      }
      console.log("SENDING: ", body)
      // axios.post("/getVenues")
    }
}
  render() {
    console.log("map buss",)

    console.log(this.state.venues)
    return (
      <main>
        <button onClick={this.sendLocToBack}> </button>
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
