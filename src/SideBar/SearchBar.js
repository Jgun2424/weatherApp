import classes from './SideBar.module.css';
import SearchResults from './SearchResults';
import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
    };
      this.inputHandel = this.inputHandel.bind(this); 
  }
  inputHandel(e) {
    let field = e.target.value;
    fetch(`https://api.weatherapi.com/v1/search.json?key=8c797274edce4c5085f190353222504&q=${field}`).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then((data) => {
      const cityNames = data.map(c => ({name: c.name, region: c.region}))
      this.setState({
        names: cityNames
      })
    })
  }
  render() {
    let data = this.state.names
    return (
      <div className={classes.searchBar} style={{left: `${this.props.left}`}}>
        <div className={classes.searchTopBar}>
          <div style={{ flex: "1" }}>
            <input
              type="text"
              className={classes.searchInput}
              placeholder="search for a city"
              onInput={this.inputHandel}
              id="inp"
            />
          </div>
          <div onClick={this.props.onClose} className={classes.bar}>
            <span
              className="iconify"
              data-icon="eva:arrow-back-fill"
              style={{ color: "white", fontSize: "25px" }}
            ></span>
          </div>
        </div>
        {data.length === 0 ? <h3 style={{marginLeft: "10px", marginTop: "10px"}}>No Search Results</h3> : <h3 style={{marginLeft: "10px", marginTop: "20px"}}>{data.length} results</h3>}
        <div/>
        {data.map(e => <SearchResults names={e.name} region={e.region} fetch={this.props.fetch} o={this.props.onClose} removeResults={this.inputHandel}/>)}
      </div>
    );
  }
}



export default SearchBar;