import React from 'react';
import { CartesianGrid, Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSelector } from 'react-redux';
import { data, selectedCampaigns, selectedSources } from './../service/campaigns/selectors';
import { Campaign } from './../service/campaigns/types';
import config from './../config';

import './chart.css';

export default () => {
    const points = useSelector(data);
    const sources = useSelector(selectedSources);
    const campaigns = useSelector(selectedCampaigns);
    let pointsToDisplay:Campaign[] = points;

    if (sources.length) {
        pointsToDisplay = pointsToDisplay.filter((r:Campaign) => sources.indexOf(r.Datasource) > -1);
    }

    if (campaigns.length) {
        pointsToDisplay = pointsToDisplay.filter((r:Campaign) => campaigns.indexOf(r.Campaign) > -1);
    }
    // console.log('PPP1', sources, campaigns, pointsToDisplay.length);
    const modulo = Math.ceil(pointsToDisplay.length / config.chart.points);

    pointsToDisplay = pointsToDisplay
                        .filter((r:Campaign, i:number) => !(i%modulo));

    const moduloTick = Math.ceil(pointsToDisplay.length / config.chart.ticks);
    let ticks:string[] = pointsToDisplay
                            .filter((r:Campaign, i:number) => !(i%moduloTick) || i === pointsToDisplay.length - 1)
                            .map((r:Campaign) => r.Date);

    // console.log('PPP2', modulo, pointsToDisplay, pointsToDisplay.length);

    return (<div className={'c-chart'}>
        { !!(pointsToDisplay.length) && (<div className={'c-chart__container'}>
            <ResponsiveContainer>
                <LineChart data={pointsToDisplay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dot={false} yAxisId="left" dataKey="Clicks" stroke="#e7272e" />
                    <Line type="monotone" dot={false} yAxisId="right" dataKey="Impressions" stroke="#197fe6" />
                    <XAxis dataKey="Date" ticks={ticks} />
                    <YAxis yAxisId="left" label={{ value: 'Clicks', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Impressions', angle: 90, position: 'insideRight' }} />
                    <Legend verticalAlign="bottom" height={36}/>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>) }
        { !(pointsToDisplay.length) && <div className={'c-chart__placeholder'}>No data to display</div> }
    </div>);
}