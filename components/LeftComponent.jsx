import GaugeComponent_ from "./GaugeComponent_"
import CityInfo from "./CityInfo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function LeftComponent(props) {

    const { city, temperature, weatherDescription, weatherIcon, maxTemp, minTemp} = props

    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear()

    return (
        <section className="leftComponent">
            <div className="city-header">
                <h1>{city} {day}/{month}/{year}</h1>
            </div>

            <div className="gauge-container">
                <GaugeComponent_
                    temperature={temperature}
                />
            </div>

            <div className="weather-info">
                <CityInfo
                    weatherDescription={weatherDescription}
                    icon={weatherIcon}
                />
            </div>

            <div className="additional-info">
                <img
                    className="mountainPhoto"
                    src="components\mountain.png"
                />
                <div className="highLowTemp">
                    <div className="temps">
                        <h2>{maxTemp} <span>ºC</span></h2>
                        <h3>HIGH <FontAwesomeIcon icon={faSun} /></h3>
                    </div>
                    <div className="divider"></div>
                    <div className="temps">
                        <h2>{minTemp} <span>ºC</span></h2>
                        <h3>LOW <FontAwesomeIcon icon={faMoon} /></h3>
                    </div>
                </div>
            </div>
        </section>
    )
}