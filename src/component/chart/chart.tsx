import React, {useEffect} from 'react';
import { CartesianGrid, Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaignsData } from './../../service/campaigns-data/actions';
import { data, selectedCampaigns, selectedSources, loading } from './../../service/campaigns-data/selectors';
import { CampaignRow } from './../../service/campaigns-data/types';
import config from './../../config';
import Loader from '../loader/loader';
import strategies from './../../helper/strategy';

import './chart.css';

const calculatePoints = (points:CampaignRow[], sources:string[], campaigns:string[]) => {
    let pointsToDisplay:CampaignRow[] = points;

    if (sources.length) {
        pointsToDisplay = pointsToDisplay.filter((r:CampaignRow) => sources.indexOf(r.Datasource) > -1);
    }

    if (campaigns.length) {
        pointsToDisplay = pointsToDisplay.filter((r:CampaignRow) => campaigns.indexOf(r.Campaign) > -1);
    }
    const modulo = Math.ceil(pointsToDisplay.length / config.chart.points);

    /**
     * Change strategy type to see differences in data rendering.
     * Allowed types are: naive, forward, backward, middle.
     *
     * @see src/helper/strategy.ts for strategy descriptions
     */
    return strategies.middle(pointsToDisplay, modulo);
};

const calculateTicks = (pointsToDisplay:CampaignRow[], ticks:number) => {
    const moduloTick = Math.ceil(pointsToDisplay.length / ticks);

    return pointsToDisplay
            .filter((r:CampaignRow, i:number) => !(i%moduloTick) || i === pointsToDisplay.length - 1)
            .map((r:CampaignRow) => r.Date);
};

export default () => {
    const dispatch = useDispatch();
    const points = useSelector(data);
    const sources = useSelector(selectedSources);
    const campaigns = useSelector(selectedCampaigns);
    const isLoading = useSelector(loading);

    const pointsToDisplay:CampaignRow[] = calculatePoints(points, sources, campaigns);
    const ticks:string[] = calculateTicks(pointsToDisplay, config.chart.ticks);

    useEffect(() => {
        dispatch(getCampaignsData())
    }, [ dispatch ]);

    return (<div className={'c-chart'}>
        { isLoading && <Loader /> }
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