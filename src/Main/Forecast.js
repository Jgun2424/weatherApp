import classes from "./Main.module.css";
import cloudbg from '../SideBar/Cloud-background.png'
import React, { Component } from "react";
import PopoutForecast from "./PopoutForecast";

class Forecast extends Component {
  constructor(props){
    super(props);
    this.state = {
      showScreen: false,
    };
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
    if (this.state.showScreen === true) {
      this.setState({
        showScreen: false,
      });
    } else {
      this.setState({
        showScreen: true,
      });
    }
  }

  render() {
    return (
      <>
        <div className={classes.fc} onClick={this.clickHandler}>
          <img className={classes.bg} src={cloudbg} alt=""></img>
          <img
            className={classes.imgSmall}
            src={this.props.ico}
            alt="weathericon"
          ></img>
          <div className={classes.rightSide}>
            <div className={classes.grow}>
              <h3>
                {Date.parse(`${this.props.date}`).toString("dddd, d MMM")}
              </h3>
            </div>
            <div className={classes.temps}>
              <h1>
                {this.props.temp}
                <sub>{this.props.unit}</sub>
              </h1>
              <h1 className={classes.smaller}>
                {this.props.mintemp}
                <sub>{this.props.unit}</sub>
              </h1>
            </div>
          </div>
        </div>
        {this.state.showScreen ? <PopoutForecast click={this.clickHandler} locationDetail={this.props} unit={this.props.unit}/> : null}
      </>
    );
  }
}

export default Forecast;
