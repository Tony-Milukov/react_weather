import React from 'react';
import Card from '../Card/Card';
import {avaibleCities} from "../../availableCities/avaibleCities";

const defaultCity = "Klagenfurt"
class WeekContainer extends React.Component {
  state = {
    days: [],
    city: defaultCity,
    weatherURL: `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&lang=en&units=metric&APPID=79cce12f32339641751ec2b2c1ccfc2f`,
    isChoosed: false,
  }

  componentDidMount = (i) => {
    fetch(i ? i : this.state.weatherURL)
    .then(res => res.json())

    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
      this.setState({days: dailyData})
    })
  }

  formatCards = () => {
    return this.state.days.map((day, index) => <Card day={day} key={index}/>)
  }
  inputstate = (e) => {
    let weatherURL  = `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&lang=en&units=metric&APPID=79cce12f32339641751ec2b2c1ccfc2f`
    console.log(e.target.value)
    this.setState({...this.state,city: e.target.value,
      weatherURL: weatherURL
    })
        this.setState({
          ...this.state,
          isChoosed: true
        })
    this.componentDidMount(weatherURL)



  }

  render() {
    return (
      <div className="">
        <h1 className="display-4 jumbotron">Weather forecast for 5 days</h1>
        {/*<h1>{this.state.city === "" ? defaultCity : !this.state.error ? this.state.city : `There is no ${this.state.city} city`}</h1>*/}
        {/*<input className={"cityInput"} onInput={this.inputstate} type="text"/>*/}
        <select className={"cityInput"} onChange={this.inputstate} onSelect={this.inputstate}>
          {!this.state.isChoosed ? <option value="">Choose your City  </option> : null}
          {avaibleCities.map(i => <option value={i.city}>{i.name} </option>)}
        </select>
        {this.state.isChoosed ?  <>
          <div className="row justify-content-center">

            {this.formatCards()}

          </div></> : null}
      </div>
    )
  }
}

export default WeekContainer
