import React, { Component } from 'react';
import rainbow from './rainbow.jpg';

import { BrowserRouter, Route, Link } from 'react-router-dom'; 
import businessSearch from './businessSearch/businessSearch.js'; 
import searchnearme from './searchnearme/searchnearme.js';
import home from './home/home.js';

import './App.css';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-md">
          <div className="navigation-sub">
            <Link to="/" className="item">
              <img src={rainbow} className="logo-image" alt="Logo" />
            </Link>

            <Link to="/" className="item">Home</Link>
            <Link to="/businessSearch" className="item">Location Search</Link>
            <Link to="/searchnearme" className="item">Places Near Me</Link>

          </div>
        </nav>

        {/* Page Content */}
      <div className="main-container">
          {/* Routing different pages */}
          <Route exact path="/businessSearch" component={businessSearch} />
          <Route exact path="/searchnearme" component={searchnearme} />
          <Route exact path="/" component={home} />

        {/* Footer */}
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <h6 className="text-uppercase font-weight-bold">Additional Information</h6>
                <p>This website was created with Yelp's Fusion API.</p>
                <p>For more information, please visit them at their website at Yelp.com</p>

              </div>
            
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <p>rebecca.shu@duke.edu 
              <br/>+1 (513) 602-0055
              </p>
            </div>
          </div>
          <div className="footer-copyright text-center">© 2020 Copyright: MyWebsite.com</div>
          </div>
        </footer>
        
        </div>
      </div>
    </BrowserRouter>
  );
  }
}

export default App;
