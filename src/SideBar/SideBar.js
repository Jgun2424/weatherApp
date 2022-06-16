import classes from "./SideBar.module.css";
import SearchBar from "./SearchBar";
import React, { Component } from "react";
import cloudbg from "./Cloud-background.png";
import cloud from "./icons/HeavyCloud.png";
import clear from "./icons/Clear.png";
import rain from "./icons/HeavyRain.png";
import sleet from "./icons/Sleet.png";
import snow from "./icons/Snow.png";
import thunder from "./icons/Thunderstorm.png";
import Main from "../Main/Main";
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      location: null,
      date: null,
      search: false,
      condition: null,
      weatherIcon: null,
      left: "-800px",
      text: null,
      forecast: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }
  componentDidMount() {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=8c797274edce4c5085f190353222504&q=${localStorage.getItem(
        "city"
      )}&days=5&aqi=no&alerts=yes`
    )
      .then((response) => response.json())
      .then((data) => {
        let condition = data.current.condition.text.toLowerCase();
        if (condition.includes("clear") || condition.includes("sunny")) {
          this.setState({
            weatherIcon: clear,
          });
        }
        if (condition.includes("rain")) {
          this.setState({
            weatherIcon: rain,
          });
        }
        if (condition.includes("thunder")) {
          this.setState({
            weatherIcon: thunder,
          });
        }
        if (
          condition.includes("cloudy") ||
          condition.includes("overcast") ||
          condition.includes("mist") ||
          condition.includes("fog")
        ) {
          this.setState({
            weatherIcon: cloud,
          });
        }
        if (condition.includes("snow")) {
          this.setState({
            weatherIcon: snow,
          });
        }
        if (condition.includes("sleet")) {
          this.setState({
            weatherIcon: sleet,
          });
        }
        let unit = localStorage.getItem("unit");
        let newData = data.forecast.forecastday;
        console.log(data)
        this.setState({
          windSpeedC: data.current.wind_kph,
          windSpeedF: data.current.wind_mph
        })
        if (unit === "c") {
          const forecast = newData.map((c) => ({
            date: c.date,
            temp: c.day.avgtemp_c,
            condition: c.day.condition.text,
            unit: "°c",
            ico: c.day.condition.icon,
            mintemp: c.day.mintemp_c,
            otherdata: c.day,
            hour: c.hour
          }));
          this.setState({
            temp: Math.round(data.current.temp_c),
            text: "°c",
            forecast: forecast,
          });
        } else {
          const forecast = newData.map((c) => ({
            date: c.date,
            temp: c.day.avgtemp_f,
            condition: c.day.condition.text,
            unit: "°f",
            ico: c.day.condition.icon,
            mintemp: c.day.mintemp_f,
            otherdata: c.day,
            hour: c.hour
          }));
          this.setState({
            temp: Math.round(data.current.temp_f),
            text: "°f",
            forecast: forecast,
          });
        }
        this.setState({
          location: `${data.location.name}, ${data.location.region}`,
          condition: data.current.condition.text,
          humid: data.current.humidity,
          wind_dir: data.current.wind_dir,
          wind_degree: data.current.wind_degree,
          viskm: data.current.vis_km,
          vismiles: data.current.vis_miles,
          pressure: data.current.pressure_mb
        });
        document.getElementById('Main_rotate__Z4ew6').style.transform = `rotate(${data.current.wind_degree}deg)`
        let startVal = 1;
        let humid = data.current.humidity;
        var counter = setInterval(() => {
          startVal = startVal + 1;
          if (startVal === humid) {
            clearInterval(counter);
            localStorage.setItem("humid", startVal);
          }
          document.getElementById('ye').innerHTML = startVal
          document.getElementById("yee").value = startVal;
        }, 13);
      });
}
  searchHandler() {
    if (this.state.search === true) {
      this.setState({
        search: false,
        left: "-800px",
      });
    } else {
      this.setState({
        search: true,
        left: "0px",
      });
    }
  }
  counter() {
    let currentTime = 1;
    let value = this.props.humid;
    if (value === undefined) {
      console.log("hmm error");
      return;
    }
    var countUp = setInterval(() => {
      currentTime = currentTime + 1;
      if (currentTime === value) {
        clearInterval(countUp);
      }
      document.getElementById("ye").innerHTML = currentTime;
      document.getElementById("yee").value = currentTime;
    }, 17);
  }
  render() {
    return (
      <>
        <div className={classes.sideBar}>
          {this.state.search ? (
            <SearchBar
              onClose={this.searchHandler}
              fetch={this.componentDidMount}
              left={this.state.left}
            />
          ) : (
            <SearchBar left={this.state.left} />
          )}
          <div className={classes.sideTop}>
            <div style={{ flex: 1 }}>
              <button className={classes.button} onClick={this.searchHandler}>
                Search For Places
              </button>
            </div>
            <span
              id={classes.currentLocation}
              className="iconify"
              data-icon="bx:current-location"
            ></span>
          </div>
          <div className={classes.background}>
            <img className={classes.bg} src={cloudbg} alt=""></img>
            <div className={classes.condition}>
              <img
                style={{ marginRight: "20px" }}
                src={this.state.weatherIcon}
                alt="weather icon"
              />
            </div>
            <div className={classes.conditionText}>
              <h1 className={classes.temp}>
                <span>{this.state.temp}</span>
                <sub>
                  <span>{this.state.text}</span>
                </sub>
              </h1>
            </div>
            <div className="currentTemp">
              <h1 className={classes.temp1}>{this.state.condition}</h1>
            </div>
          </div>
          <div className={classes.cityInfo}>
            <p>
              <span
                className="iconify"
                data-icon="carbon:location-filled"
              ></span>
              {this.state.location}
            </p>
          </div>
        </div>
        <Main
          refresh={this.componentDidMount}
          forecastData={this.state.forecast}
          humid={this.state.humid}
          wind_dir={this.state.wind_dir}
          wind_degree={this.state.wind_degree}
          otherdata={this.state.otherdata}
          viskm={this.state.viskm}
          vismiles={this.state.vismiles}
          pressure={this.state.pressure}
          windSpeedC={this.state.windSpeedC}
          windSpeedF={this.state.windSpeedF}
        />
      </>
    );
  }
}

export default SideBar;
