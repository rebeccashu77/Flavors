import React from 'react';
import './business.css';

class business extends React.Component {
  render() {
    return (
      <div className="Business">
                <div className="image-container">
                    <img src={this.props.business.imageSrc} />
                </div>
              <div className="Business-information">
                 <a href={this.props.business.url}>
                    <h3>{this.props.business.name.toUpperCase()}</h3>
                  </a>
                  <p>{this.props.business.address}, {this.props.business.city}, {`${this.props.business.state} ${this.props.business.zipCode}`}</p>
                  <p>Rating: {this.props.business.rating}/5 Stars</p>
                  <p>{this.props.business.phone}</p>
                  <p>{this.props.business.price}</p>
              </div>

      </div>
    );
  };
} 
export default business;