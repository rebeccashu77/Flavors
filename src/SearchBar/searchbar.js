import React from 'react';
import './searchbar.css';
import { Button } from 'react-bootstrap';
import '../results/results.js';
import { BrowserRouter, Route, Link } from 'react-router-dom'; 


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      location: 'New York City',
      sortBy: 'best_match'
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

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

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);

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

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-fields">
          <ul>
            <input placeholder="Search Businesses" onChange={this.handleTermChange} />
            <p> </p>
            <input placeholder="Where?" onChange={this.handleLocationChange}/>
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
    );
  }
}

export default SearchBar;