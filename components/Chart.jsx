import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: '10px',
                borderRadius: '5px',
                color: 'white'
            }}>
                <p style={{ margin: 0 }}>{`${Math.round(payload[0].value)}°C`}</p>
            </div>
        );
    }
    return null;
};

export default function Chart(props) {
    // console.log(props)

    if (!props.temps24H) {
        return <div>Loading...</div>
    }

    const temps24H = []

    for (let i = 0; i < 24; i += 3) {
        temps24H.push(props.temps24H[i])
    }

    const data = []

    for (let i = 0; i < 8; i++) {
        const hour = i * 3
        data[i] = {
            name: `${hour.toString().padStart(2, '0')}:00`,
            pv: Math.round(temps24H[i])
        }
    }

    // console.log(data)

    return (
        <ResponsiveContainer width="95%" height="80%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis 
                    dataKey="name" 
                    axisLine={{ stroke: 'white' }}
                    tickLine={{ stroke: 'white' }}
                    tick={{ fill: 'white' }} 
                />
                <YAxis 
                    domain={[0, 50]}
                    axisLine={{ stroke: 'white' }}
                    tickLine={{ stroke: 'white' }}
                    tick={{ fill: 'white' }}
                /> 
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="pv"
                    fill="#ffffffff"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                    barSize={30}  
                    label={{ position: 'top', fill: '#ffffff', formatter: (value) => `${Math.round(value)}°C` }} 
                />
            </BarChart>
        </ResponsiveContainer>
    )
}