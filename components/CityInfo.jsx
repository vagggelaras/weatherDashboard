export default function CityInfo(props){
    return(
        <section className="cityInfo">
            <img
                className="weatherIcon"
                src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
                alt="weather"
            />
            <div className="weatherText">
                <h3>{props.weatherDescription}</h3>
            </div>            
        </section>
    )
}