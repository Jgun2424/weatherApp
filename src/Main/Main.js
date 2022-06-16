import classes from './Main.module.css';
import React, { Component } from "react";
import Forecast from './Forecast';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winDeg: 1,
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.unitHandler = this.unitHandler.bind(this);
  }
  componentDidMount() {
    let unit = localStorage.getItem("unit");
    if (unit === "c") {
      document.getElementById(unit).className = `${classes.unitActive}`;
      document.getElementById("f").className = `${classes.unit}`;
    }
    if (unit === "f") {
      document.getElementById(unit).className = `${classes.unitActive}`;
      document.getElementById("c").className = `${classes.unit}`;
    }
    if (unit === null) {
      localStorage.setItem("unit", "c");
    }
  }

  
  unitHandler(e) {
    if (e.target.id === "c") {
      localStorage.setItem("unit", "c");
      this.props.refresh();
      this.componentDidMount();
    } else {
      localStorage.setItem("unit", "f");
      this.props.refresh();
      this.componentDidMount();
    }
  }
  render() {
    let data = this.props.forecastData;
    console.log(this.props);
    return (
      <div className={classes.main}>
        <div className={classes.mainTopBar}>
          <div className={classes.placeholder}></div>
          <div className={classes.options}>
            <p className={classes.unit} onClick={this.unitHandler} id="f">
              °F
            </p>
            <p className={classes.unit} onClick={this.unitHandler} id="c">
              °C
            </p>
          </div>
        </div>
        <div className={classes.outer}>
          <h1 className={classes.fore}>Upcoming Forecast</h1>
          <div className={classes.forecastWrapper}>
            {data.map((c) => {
              return (
                <Forecast
                  temp={Math.round(c.temp)}
                  date={c.date}
                  ico={c.ico}
                  unit={c.unit}
                  mintemp={Math.round(c.mintemp)}
                  data={c.otherdata}
                  hour={c.hour}
                />
              );
            })}
          </div>
        </div>
        <div className={classes.outer}>
          <h1 className={classes.fore}>Todays Highlights</h1>
          <div className={classes.highlightsWrapper}>
            <div className={classes.highlight}>
              <h3 className={classes.top}>Wind Status</h3>
              <div className={classes.windDir} style={{ flex: ".8" }}>
                <h1>
                  {localStorage.getItem("unit") === "c" ? (
                    <span style={{ fontSize: "70px" }}>
                      {Math.round(this.props.windSpeedC)}
                      <span style={{ fontSize: "20px" }}>km</span>
                    </span>
                  ) : (
                    <span style={{ fontSize: "70px" }}>
                      {Math.round(this.props.windSpeedF)}
                      <span style={{ fontSize: "20px" }}>mph</span>
                    </span>
                  )}
                </h1>
              </div>
              <div className={classes.innerWrap}>
                <span
                  id={classes.rotate}
                  className="iconify"
                  data-icon="bi:arrow-up-circle-fill"
                ></span>
                <span style={{ marginLeft: "5px" }}>{this.props.wind_dir}</span>
              </div>
            </div>
            <div className={classes.highlight}>
              <h3 className={classes.top}>Humidity</h3>
              <div className={classes.windDir}>
                <h1>
                  <span style={{ fontSize: "70px" }}>
                    <span id="ye"></span>
                    <sub>
                      <span style={{ fontWeight: "100" }}>%</span>
                    </sub>
                  </span>
                </h1>
              </div>
              <div className={classes.progressBar}>
                <div className={classes.innerWrap}>
                  <span style={{ flex: "1" }}>0</span>
                  <span style={{ flex: "1" }}>50</span>
                  <span>100</span>
                </div>
                <progress
                  id="yee"
                  className={classes.progress}
                  min="0"
                  max="100"
                  value="1"
                ></progress>
                <div className={classes.innerWrap}>
                  <span style={{ flex: "1" }}></span>
                  <span>%</span>
                </div>
              </div>
            </div>
            <div className={classes.highlight}>
              <h3 className={classes.top}>Visibility</h3>
              <h1>
                {localStorage.getItem("unit") === "c" ? (
                  <span style={{ fontSize: "70px" }}>
                    {this.props.viskm}
                    <span style={{ fontSize: "20px" }}>km</span>
                  </span>
                ) : (
                  <span style={{ fontSize: "70px" }}>
                    {this.props.vismiles}
                    <span style={{ fontSize: "20px" }}>miles</span>
                  </span>
                )}
              </h1>
            </div>
            <div className={classes.highlight}>
              <h3 className={classes.top}>Air Pressure</h3>
              <span style={{ fontSize: "70px" }}>
                {this.props.pressure}
                <span style={{ fontSize: "20px" }}>mb</span>
              </span>
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          created by <a href="https://devchallenges.io/portfolio/Jgun2424" target="blank">Jgun2424</a> - devChallenges.io
        </p>
      </div>
    );
  }
}
export default Main;