import React from 'react'
// import './App.css';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

// Sample chart data
const pdata = [
    {
        name: 'jan',
        Textmessage: 11,
        fax: 90
    },
    {
        name: 'feb',
        Textmessage: 20,
        fax: 40
    },
    {
        name: 'mar',
        Textmessage: 5,
        fax: 50
    },
    {
        name: 'apr',

        Textmessage: 40,
        fax: 20
    },
    {
        name: 'may',
        Textmessage: 9,
        fax: 5
    },
    {
        name: 'jun',
        Textmessage : 7,
        fax: 40
    },
    {
        name: 'jul',
        Textmessage : 10,
        fax: 10
    },
    {
        name: 'aug',
        Textmessage : 4,
        fax: 6
    },
    {
        name: 'sep',
        Textmessage : 10,
        fax: 10
    },
    {
        name: 'oct',
        Textmessage : 4,
        fax: 20
    },
    {
        name: 'nov',
        Textmessage : 10,
        fax: 40
    },
    {
        name: 'dec',
        Textmessage : 50,
        fax: 90
    },
];

export default function Charts() {
    return (
        <>
            <h1 className="text-heading">
                Analytics Chart 
            </h1>
            <ResponsiveContainer width="50%" aspect={3}>
                <LineChart data={pdata} margin={{ right: 0 ,left: 300}}>
                    <CartesianGrid />
                    <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} />
                    
                    <Legend />
                    <Tooltip />
                    <Line dataKey="Textmessage"
                        stroke="green" activeDot={{ r: 8 }} />
                    <Line dataKey="fax"
                        stroke="blue" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}
