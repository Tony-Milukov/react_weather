import React from 'react';
import Card from '../Card/Card';
import {avaibleCities} from "../../availableCities/avaibleCities";
import avaibleCountries from "../../availableCities/avaibleCountries";

const defaultCity = "Klagenfurt"
class WeekContainer extends React.Component {
  state = {
    days: [],
    city: defaultCity,
    weatherURL: `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&lang=en&units=metric&APPID=79cce12f32339641751ec2b2c1ccfc2f`,
    isChoosed: false,
  }

  componentDidMount = (i) => {

    console.log(avaibleCountries)
    fetch(i ? i : this.state.weatherURL)
    .then(res => res.json())

    .then(data => {

      let date = new Date().getDate()-1
      let dailyData = []

      for(let i = 0; i < 8; i++) {
        dailyData.push(...data.list.filter(i => i.dt_txt.includes(`${new Date().getUTCFullYear()}-${parseInt(new Date().getMonth())+1 >= 10  ? "" : "0"}${new Date().getMonth()+1}-${date+1}`)).filter(item => item.dt_txt.includes("15:00")))
        console.log(`${new Date().getUTCFullYear()}-${parseInt(new Date().getMonth())+1 >= 10  ? "" : "0"}${new Date().getMonth()+1}-${date++}`)
      }

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
        <h1 className="display-4 jumbotron">Weather forecast</h1>
        <select className={"cityInput"} onChange={this.inputstate} onSelect={this.inputstate}>
          {!this.state.isChoosed ? <option value="">Choose your City  </option> : null}
          {avaibleCountries.map(i =>
              <>
                <optgroup label={i}/>
                { avaibleCities.map(item => item.country === i ?  <option value={item.city}>{item.name}</option> : null)}
              </>

          )}
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
