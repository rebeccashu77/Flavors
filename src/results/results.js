import React from 'react';
import './results.css';
import Business from '../business/business.js'; 

class results extends React.Component {
    render() {
      return (
        <div className="results">
          {
            this.props.businesses.map(business => {
              return <Business business={business} key={business.id} />
            })
          }
        </div>
      );
    }
  }
  
  export default results;