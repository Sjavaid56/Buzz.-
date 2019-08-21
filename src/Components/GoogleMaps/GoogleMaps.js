import React, { Component } from 'react'
import './GoogleMaps.css'
import axios from 'axios'
import HiveIcon from '../../images/icons8-hive-96.png';
import GrayHiveIcon from '../../images/icons8-hive-96 -gray.png'
import BeeIcon from '../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import { updateLocation } from "../../redux/reducer"
import { connect } from "react-redux"


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
    this.initGeoLocation();
    this.getVenues2()
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    console.log("current venues:", this.state.venues2.length)
    console.log("prevs venues:", prevState.venues2.length)
    console.log("current lat:", this.state.currentLatLng.lat)
    console.log("prev lat:", prevState.currentLatLng.lat)

    if (this.state.venues2.length !== prevState.venues2.length) {
      this.renderMap()
      console.log('THE COMPONENT JUST UPDATED!')
    }
  }

  componentWillUpdate() {
    // this.initGeoLocation()
  }
  initGeoLocation() {
    getGeoLocation().then(location => {
      this.props.updateLocation(location.coords)
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
        },
        )
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }
  getVenues2 = () => {
    console.log("getting venues")
    axios.get("/getRooms")
      .then(business => {
        console.log(business);

        this.setState({
          venues2: business.data
        })
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })


  }


  initMap = () => {
    // Create A Map
    console.log(this.state.currentLatLng)
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng },
      zoom: 16

    })

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow()
    // Display Dynamic Markers
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`
      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng
        },
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
      // console.log("latlong", myVenue.latitude)
      var contentString2 = `${myVenue.business_name}`
      // Create A Marker


      var marker2 = new window.google.maps.Marker({
        position: { lat: myVenue.latitude, lng: myVenue.longitude },
        map: map,
        title: myVenue.business_name,
        icon: {
          url: HiveIcon,
          scaledSize: new window.google.maps.Size(50, 50)
        }

      })
      // Click on A Marker!
      marker2.addListener('click', function () {
        // Change the content
        infowindow.setContent(contentString2)
        // Open An InfoWindow
        infowindow.open(map, marker2)
      })

    })

    var UserLocation = new window.google.maps.Marker({
      position: { lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng },
      map: map,
      title: "MY LOCATION",
      icon: {
        url: BeeIcon,
        scaledSize: new window.google.maps.Size(35, 35)
      }
      // animation: google.maps.Animation.DROP,

    })
    var circle = new window.google.maps.Circle({
      map: map,
      radius: 500,    // 10 miles in metres
      fillColor: '#ffcb34',
      strokeColor: '#ffcb34',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#ffcb34',
      fillOpacity: 0.29,
    });
    circle.bindTo('center', UserLocation, 'position');


  }
  render() {
    console.log("current", this.state.currentLatLng, this.state.venues2)
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
export default connect(null, { updateLocation })(App);
