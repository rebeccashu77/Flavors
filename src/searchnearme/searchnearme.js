import React, { Component } from "react";
import CurrentYelp from '../Yelp/CurrentYelp.js';
import Results from "../results/results.js";
import './searchnearme.css';
import '../SearchBar/searchbar.css';
import SplitPane from 'react-split-pane';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from '../Maps/maps.js';

const mapStyles = {
  width: '100%',
  height: '100%'
}

export class searchnearme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: [],
      region: [],
      updateMap: false,
      latitude: -1.2884,
      longitude: 36.8233,
      term: '',
      location: 'New York City',
      sortBy: 'best_match',
      showingInfoWindow: false, 
      activeMarker: {},          
      selectedPlace: {}
    };
    this.searchYelp = this.searchYelp.bind(this);

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count',
      'Distance': 'distance'
    };
  }
  /* Google Maps functions */
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  /* Yelp functions */
  searchYelp(term, latitude, longitude, sortBy) {
    CurrentYelp.search(term, latitude, longitude, sortBy).then((businesses) => {
      this.setState({
        businesses: businesses,
      });
    })    
  };

  /* Search Bar functions */
  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }
  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }
  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.searchYelp(this.state.term, this.state.latitude, this.state.longitude, this.state.sortBy);

  }
  handleSearch(event) {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("Geolocation is not supported by this brower.")
    }
    this.setState({updateMap: true});
    event.preventDefault();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (<ul> <button className={this.getSortByClass(sortByOptionValue)}
                  key={sortByOptionValue}
                  onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {sortByOption}
             </button> </ul>);
    });
  }

  renderCenter(){
      return (
        <Map 
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          center= {{lat: this.state.latitude, lng: this.state.longitude}}
        >
        
        {(this.state.businesses.map(business =>{
           return(
            <Marker key={business}
              onClick={this.onMarkerClick}
              name={business.name}
              position={{lat: business.latitude, lng: business.longitude}}
            >
            </Marker>
            )
        }
      ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <a>{this.state.selectedPlace.name}</a>
          </div>
        </InfoWindow>
      </Map>
      );
  }

  render() {
      const updateMap = this.state.updateMap;
      let map;

      /* Conditional Rendering the map from current location to input */
        if(updateMap){
          map = (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                >
                {this.renderCenter()}
            </Map>
          )

        } 
        else{map = (
          /* Default map to users location */
          <CurrentLocation
              google={this.props.google}
              centerAroundCurrentLocation
              style={mapStyles}
              >
              <Marker
                onClick={this.onMarkerClick}
                name={'current location'}
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <a>{this.state.selectedPlace.name}</a>
                </div>
              </InfoWindow>
          </CurrentLocation>
          );
        }
      
      return(
        <div className="searchnearme">
            
        <SplitPane split="vertical" defaultSize={700} >

          {/* Main text */}
          <div className="searchnearme-description">
            <h2>PLACES NEAR ME</h2>

          {/* SEARCH BAR */}
            <div className="SearchBar">
              <div className="SearchBar-fields">
                <ul>
                  <input placeholder="Search Businesses" onChange={this.handleTermChange} />
                </ul>
              </div>
              <div className="SearchBar-sort-options">
                <a>Sort By:</a>
                <ul>
                  {this.renderSortByOptions()}
                </ul>
              </div>
              <div className="SearchBar-submit">
                <button onClick={this.handleSearch}>Search</button>
              </div>
            </div>
            
            {/* Getting yelp results, displaying them */}  
            <Results businesses={this.state.businesses} />

          </div> 
          {/* Second container holding map */}
          <div className="map">
            {map}
          </div>
        </SplitPane>
        </div>
        

      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCYyV1rEug5GYFReqiADFE2r4R1n7OBcwo'
})(searchnearme);