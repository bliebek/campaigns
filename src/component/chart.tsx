import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { useSelector } from 'react-redux';
import { data } from './../service/campaigns/selectors';
import { Campaign } from './../service/campaigns/types';

export default () => {
    const points = useSelector(data);

    console.log('PPP', points);

    return (<div className={'c-chart'}>
        <LineChart width={600} height={300} data={points.filter((r:Campaign, i:number) => !(i%1000))}>
            <Line type="monotone" yAxisId="left" dataKey="Clicks" stroke="#ff0000" />
            <Line type="monotone" yAxisId="right" dataKey="Impressions" stroke="#0000ff" />
            <XAxis dataKey="Date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
        </LineChart>
    </div>);
}