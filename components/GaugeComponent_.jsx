import GaugeComponent from 'react-gauge-component'

export default function GaugeComponent_(props) {
    // console.log(props)
    return (
        <GaugeComponent
            type="radial"
            arc={{
                width: 0.15,
                padding: 0.005,
                cornerRadius: 1,
                // gradient: true,
                subArcs: [
                    {
                        limit: -10,
                        color: '#1E88E5',
                        showTick: true,
                        tooltip: {
                            text: 'Very low Temperature'
                        }
                    },
                    {
                        limit: 10,
                        color: '#42A5F5',
                        showTick: true,
                        tooltip: {
                            text: 'Low temperature'
                        }
                    },
                    {
                        limit: 25,
                        color: '#66BB6A',
                        showTick: true,
                        tooltip: {
                            text: 'OK temperature'
                        }
                    },
                    {
                        limit: 35,
                        color: '#FFA726',
                        showTick: true,
                        tooltip: {
                            text: 'High temperature'
                        }
                    },
                    {
                        color: '#EA4228',
                        tooltip: {
                            text: 'Very high temperature!'
                        }
                    }
                ]
            }}
            pointer={{
                color: '#4c504eff',
                length: 0.9,
                width: 15,
            }}
            labels={{
                valueLabel: { formatTextValue: value => value + 'ºC' },
                tickLabels: {
                    type: 'inner',
                    defaultTickValueConfig: {
                        formatTextValue: (value) => value + 'ºC',
                        style: { 
                            fontSize: 10 ,
                            fill: 'white'
                        }
                    },
                    ticks: [
                        { value: 0 },
                        { value: -25 }
                    ],
                }
            }}
            value={Math.floor(props.temperature * 2) / 2}
            minValue={-40}
            maxValue={40}
        />
    )
}