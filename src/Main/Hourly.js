import classes from "./Main.module.css";
import React, { Component } from "react";

class Hourly extends Component {
    render() {
        if (localStorage.getItem('unit') === "c") {
            var temp = Math.round(this.props.test.temp_c)
        } else {
            var temp = Math.round(this.props.test.temp_f);
        }
        return (
          <>
            <div className={classes.hour}>
              <h4> {Date.parse(`${this.props.test.time}`).toString("h tt")}</h4>
              <img src={this.props.test.condition.icon} alt="" />
              <div>
                <p><span style={{marginRight: "7px"}}>{temp}{this.props.unit}</span><span></span></p>
              </div>
            </div>
          </>
        );
    }
}

export default Hourly;