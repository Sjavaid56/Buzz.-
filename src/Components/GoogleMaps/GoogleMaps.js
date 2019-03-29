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
    venues3: [],
    venues4: [],
    venues5: [],
    venues6: [],
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    isMarkerShown: false
  }
  componentDidMount() {
    this.getVenues()
    this.getVenues2()
    this.getVenues3()
    this.getVenues4()
    this.getVenues5()
    this.getVenues6()
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
            Lat: business.venue.location.lat,
            Lng: business.venue.location.lng
         }
        })
        axios.post('/venues', bdata)
        .then(function (response){
        })
        .catch(function (error) {
          console.log(error);
        });
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
  getVenues3 = () => {
    const endPoint3 = "https://api.foursquare.com/v2/venues/explore?"
    const parameters3 = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: "Hotel",
      near: "Phoenix",
      v: "20182507"
    }
    axios.get(endPoint3 + new URLSearchParams(parameters3))
      .then(response => {
        this.setState({
          venues3: response.data.response.groups[0].items
        }, this.renderMap())
        let body =  response.data.response.groups[0].items
        console.log("body: ", body)
      }).then(()=>{

      })

      .catch(error => {
        console.log("ERROR!! " + error)
      })

    }
      getVenues4 = () => {
        const endPoint4 = "https://api.foursquare.com/v2/venues/explore?"
        const parameters4 = {
          client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
          client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
          query: "airport",
          near: "Phoenix",
          v: "20182507"
        }
        axios.get(endPoint4 + new URLSearchParams(parameters4))
          .then(response => {
            this.setState({
              venues4: response.data.response.groups[0].items
            }, this.renderMap())
            let body =  response.data.response.groups[0].items
            console.log("body: ", body)
          }).then(()=>{
    
          })
    
          .catch(error => {
            console.log("ERROR!! " + error)
          })
        }
        getVenues5 = () => {
          const endPoint5 = "https://api.foursquare.com/v2/venues/explore?"
          const parameters5 = {
            client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
            client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
            query: "Arenas",
            near: "Phoenix",
            v: "20182507"
          }
          axios.get(endPoint5 + new URLSearchParams(parameters5))
            .then(response => {
              this.setState({
                venues5: response.data.response.groups[0].items
              }, this.renderMap())
              let body =  response.data.response.groups[0].items
              console.log("body: ", body)
            }).then(()=>{
      
            })
      
            .catch(error => {
              console.log("ERROR!! " + error)
            })
          }
            getVenues6 = () => {
              const endPoint6 = "https://api.foursquare.com/v2/venues/explore?"
              const parameters6 = {
                client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
                client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
                query: "cocktail",
                near: "Phoenix",
                v: "20182507"
              }
              axios.get(endPoint6 + new URLSearchParams(parameters6))
                .then(response => {
                  this.setState({
                    venues6: response.data.response.groups[0].items
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
      zoom: 15

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
    this.state.venues3.map(myVenue => {
      console.log("latlong", this.currentLatLng)
      var contentString3 = `${myVenue.venue.name}`
      // Create A Marker
      var marker3 = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name
      })
      // Click on A Marker!
      marker3.addListener('click', function () {
        // Change the content
        infowindow.setContent(contentString3)
        // Open An InfoWindow
        infowindow.open(map, marker3)
      })


    })
    this.state.venues4.map(myVenue => {
      console.log("latlong", this.currentLatLng)
      var contentString4 = `${myVenue.venue.name}`
      // Create A Marker
      var marker4 = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name
      })
      // Click on A Marker!
      marker4.addListener('click', function () {
        // Change the content
        infowindow.setContent(contentString4)
        // Open An InfoWindow
        infowindow.open(map, marker4)
      })


    })
    this.state.venues5.map(myVenue => {
      console.log("latlong", this.currentLatLng)
      var contentString5 = `${myVenue.venue.name}`
      // Create A Marker
      var marker5 = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name
      })
      // Click on A Marker!
      marker5.addListener('click', function () {
        // Change the content
        infowindow.setContent(contentString5)
        // Open An InfoWindow
        infowindow.open(map, marker5)
      })


    })

    this.state.venues6.map(myVenue => {
      console.log("latlong", this.currentLatLng)
      var contentString6 = `${myVenue.venue.name}`
      // Create A Marker
      var marker6 = new window.google.maps.Marker({
        position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
        map: map,
        title: myVenue.venue.name
      })
      // Click on A Marker!
      marker6.addListener('click', function () {
        // Change the content
        infowindow.setContent(contentString6)
        // Open An InfoWindow
        infowindow.open(map, marker6)
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
