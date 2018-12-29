import React, { Component } from 'react';
import axios from 'axios';
import escapeStringRegexp from 'escape-string-regexp';
import Sidebar from './Sidebar';
import HamburgerIcon from './HamburgerIcon';
import Footer from './Footer';

let map;
let markers = []; // To keep the list and markers in sync

class App extends Component {
  state = {
    venues: [],
    markers: [],
    query: ''
  }

  updateQuery = query => {
    this.setState({
      query: query.trim()
    })
  }

  getVenus = () => {
    axios.get('https://api.foursquare.com/v2/venues/explore?client_id=2VUTQ0CCAZK3YVC4SY3MEHXE3W5UWKMKLULADZY5PSTF51K3&client_secret=BHXTXXB3QFI1U1RNFXKISAUFY4TBYGKE0J0YQS4NICSC4DGG&v=20180323&limit=30&ll=29.2800,47.9763&section=food')
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        });
        this.renderMap();
      })
      .catch(error => {
        alert(`Error: ${error}`);
      })
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZcpHWK64araDQYUAdlRA37_5PZEQe-GM&v=3&callback=initMap');
    window.initMap = this.initMap;
  }

  initMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.28, lng: 47.976},
      zoom: 14,
      mapTypeId: 'roadmap'
    });

    this.addMarkers();
  }

  addMarkers = () => {
    const bounds = new window.google.maps.LatLngBounds();
    const infoWindow = new window.google.maps.InfoWindow();

    for (const item of this.state.venues) {
       // Marker
       const marker = new window.google.maps.Marker({
        position: item.venue.location,
        map: map,
        title: item.venue.name,
        animation: window.google.maps.Animation.DROP
      });

      // Info Window
      const contentString = `<h3>${item.venue.name}</h3>
      <h4>${item.venue.categories[0].name}</h4>
      <h5>${item.venue.location.state ? item.venue.location.state : ''}</h5>`;

      marker.addListener('click', function() {
        this.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          this.setAnimation(null);
        }, 500)
        infoWindow.setContent(contentString);
        infoWindow.open(map, this);
      })

      markers.push(marker);
      bounds.extend(marker.position);
    }

    map.fitBounds(bounds);

    this.setState({
      markers
    })
  }

  openInfoWindow = i => {
    window.google.maps.event.trigger( markers[i], 'click' );
    // Toggle Sidebar
    if (window.innerWidth <= 662) {
      const sidebar = document.querySelector('#sidebar');
      sidebar.style.cssText = "flex: 0 0.01rem; padding: 0;";
    }
  }

  componentDidMount() {
    this.getVenus();
  }

  render() {
    let venues;
    if (this.state.query) {
      const match = new RegExp(escapeStringRegexp(this.state.query), 'i');
      // Venues
      venues = this.state.venues.filter(item => match.test(item.venue.name));
      // Markers to remove
      const markersToRemove = this.state.markers.filter(marker => !match.test(marker.title));
      for (const marker of markersToRemove) {
        marker.setMap(null);
      }
      // Markers to show
      const markersToShow = this.state.markers.filter(marker => match.test(marker.title));
      markers = markersToShow;
      for (const marker of markersToShow) {
        marker.setMap(map);
      }
    } else {
      venues = this.state.venues;
      markers = this.state.markers;
      for (const marker of this.state.markers) {
        marker.setMap(map);
      }
    }

    return (
      <div id="app">
        <HamburgerIcon />
        <Sidebar 
          markersCount={venues.length} 
          venues={venues} 
          openInfoWindow={i => this.openInfoWindow(i)}
          updateQuery={query => this.updateQuery(query)}
        />
        <div id="map"></div>
        <Footer />
      </div>
    );
  }
}

function googleError() {
  alert('Error rendering the map!');
}

function loadScript(url) {
  const index = window.document.querySelector('body script');
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  script.onerror = googleError;
  index.parentNode.insertBefore(script, index);
}

export default App;