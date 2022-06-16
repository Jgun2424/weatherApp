
import './index.css'
import React, { Component } from "react";

class NoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageActive: true,
      errorMessage: "",
      color: ""
    };
    this.addLoc = this.addLoc.bind(this);
  }
  addLoc() {
      let value = document.getElementById('input').value
fetch(`https://api.weatherapi.com/v1/forecast.json?key=8c797274edce4c5085f190353222504&q=${value}&days=5&aqi=no&alerts=yes`).then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
})
.then((data) => {
  localStorage.setItem('city', value)
  this.setState({
    errorMessage: "Valid location!",
    color: "green",
  });
  window.location.reload();
})
.catch((error) => {
  console.log(error)
  this.setState({
      errorMessage: "Invalid Location!",
      color: "red"
  })
});

  }
  render() {
    return (
      <div className="noLocation">
        <h1 style={{textAlign:"center"}}>Oops! You need to add a location!</h1>
        <div className="inputField">
          <input
            id="input"
            className="input"
            type="text"
            placeholder="Enter City Name"
          />
          <div>
            <button className="button" onClick={this.addLoc}>
              Submit
            </button>
          </div>
        </div>
        <p style={{ color: `${this.state.color}`, marginTop: "10px" }}>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default NoLocation;