import React, { Component } from "react";
import './home.css';
import flowers from './flowers.jpg';
import peaches from './peaches.jpg';
import pastries from './pastries.jpg';
import waffles from './waffles.jpg';
import coffee from './coffee.jpeg';
import makeup from './makeup.jpg';
import hiking from './hiking.jpg';
import baloon from './baloon.jpeg';
import ferriswheel from './ferriswheel.jpg';
import beach from './beach.jpg';

import { Route, Link } from 'react-router-dom'; 
import businessSearch from '../businessSearch/businessSearch.js'; 
import searchnearme from '../searchnearme/searchnearme.js';

class Home extends Component {

  render() {
    return (
        <div className="home">
          <Route exact path="/businessSearch" component={businessSearch} />
          <Route exact path="/searchnearme" component={searchnearme} />

          <div class="home-overlay"></div>
          <div class="home-description">
            <h1>Discover Great Experiences</h1>
            <p>Choosing the right experience can be hard. We're here to help.</p>  
            <div className="home-search-by">
              <div className="search-by-business">
                <h2>Flavors</h2>
                <div className="business-images">
                  <img src={flowers} alt="Flowers" />
                  <img src={pastries} alt="Pastries" />
                  <img src={coffee} alt="Coffee" />
                  <img src={peaches} alt="Fruit" />
                  <img src={waffles} alt="Waffles" />
                  <img src={makeup} alt="Makeup" />
                  <img src={hiking} alt="Hiking" />
                  <img src={beach} alt="Beach" />
                  <img src={baloon} alt="Balloon" />
                  <img src={ferriswheel} alt="FerrisWheel" />
                </div>
                <p>Search by product, service, experience, and everything in between</p>
                <p1>Explore by:</p1>
                <div className="search-container">
                  <Link to="/businessSearch">
                    <button>Location</button>
                  </Link> 
                  <Link to="/searchnearme">
                    <button>Near Me</button>
                  </Link> 
                </div>
              </div>
            </div>
             
            
          </div>
          
        </div>
    );
  }
}
 
export default Home;