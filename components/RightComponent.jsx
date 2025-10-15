import Chart from "./Chart"
import Card from "./Card"
import { Wind, Sunrise, Sunset, Eye, Droplets, Sun } from 'lucide-react'

const cardsConfig = {
    uv: {
        icon: <Sun size={20} />,
        unit: ''
    },
    windSpeed: {
        icon: <Wind size={20} />,
        unit: 'km/h'
    },
    sunRise: {
        icon: <Sunrise size={20} />,
        unit: ''
    },
    sunSet: {
        icon: <Sunset size={20} />,
        unit: ''
    },
    visibility: {
        icon: <Eye size={20} />,
        unit: 'km'
    },
    airQuality: {
        icon: <Droplets size={20} />,
        unit: ''
    }
  }

export default function RightComponent(props) {
    // console.log(props.highlights)
    return (
        <section className="rightComponent">
            <div className="rightComponentUp">
                <h1>Today</h1>
                <Chart 
                    dt={props.dt}
                    temps24H={props.temps24H}
                />
            </div> 
            <div className="rightComponentDown">
                <h1>Highlights</h1>
                <div className="cardContainer">
                    {
                        Object.entries(props.highlights).map( ([key,value]) => {
                            // console.log(`${key}: ${value}`);
                            return(
                                <Card
                                    key={key}
                                    className="card"
                                    title={props.highlightLabels[key]}
                                    value={value}
                                    unit={cardsConfig[key]?.unit}
                                    icon={cardsConfig[key]?.icon}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}