import classes from "./Main.module.css";
import React, { Component } from "react";
import Hourly from "./Hourly";

class PopoutForecast extends Component {
  render() {
        let mapData = this.props.locationDetail.hour
        let data = this.props.locationDetail.data
        console.log(data)
        if (localStorage.getItem('unit') === "c") {
            var maxTemp = Math.round(data.maxtemp_c)
            var minTemp = Math.round(data.mintemp_c);
            var visible = Math.round(data.avgvis_km);
            var mile = "km"
        } else  {
            var maxTemp = Math.round(data.maxtemp_f);
            var minTemp = Math.round(data.mintemp_f);
            var visible = Math.round(data.avgvis_miles);
            var mile = "mi"
        }
    return (
      <>
        <div className={classes.modalBg} onClick={this.props.click}></div>
        <div className={classes.modal}>
          <div className={classes.middleBox}>
            <div className={classes.boxTop}>
              <h1 style={{ margin: "5px", flex: "1" }}>
                {Date.parse(`${this.props.locationDetail.date}`).toString(
                  "dddd, d MMM"
                )}
              </h1>
              <div onClick={this.props.click} className={classes.closeBtn}>
                <span
                  style={{ fontSize: "30px" }}
                  class="iconify"
                  data-icon="ep:close-bold"
                ></span>
              </div>
            </div>
            <div className={classes.avg}>
              <div className={classes.child_of_avg}>
                <h2><span style={{fontSize: "13px", fontWeight: "900"}}>HIGH</span> {maxTemp}{this.props.unit}</h2>
                <h2><span style={{fontSize: "13px", fontWeight: "900"}}>PERCIP</span> {data.daily_chance_of_rain}%</h2>
                <h2><span style={{fontSize: "13px", fontWeight: "900"}}>LOW</span> {minTemp}{this.props.unit}</h2>
                <h2><span style={{fontSize: "13px", fontWeight: "900"}}>VIS</span> {visible}<span style={{fontSize: "13px"}}>{mile}</span></h2>
              </div>
            </div>
            <h3 style={{ marginLeft: "5px", marginTop: "10px" }}>
              24 Hour Forecast
            </h3>
            <div className={classes.hourly} id="scrollContain">
              {mapData.map((c) => {
                return <Hourly test={c} unit={this.props.unit}/>;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PopoutForecast;
