import {avaibleCities} from "./avaibleCities";

let avaibleCountries = []
avaibleCities.filter(i => avaibleCountries.includes(i.country) ? null : avaibleCountries.push(i.country))

export default avaibleCountries