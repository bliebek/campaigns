import React, {useEffect} from 'react';
import { CartesianGrid, Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaignsData } from './../../service/campaigns-data/actions';
import { data, selectedCampaigns, selectedSources, loading } from './../../service/campaigns-data/selectors';
import { CampaignRow, CampaignRowSimple } from './../../service/campaigns-data/types';
import config from './../../config';
import Loader from '../loader/loader';
import sumBy from 'lodash/sumBy';
import uniqBy from 'lodash/uniqBy';

import './chart.css';

const calculatePoints = (points:CampaignRow[], sources:string[], campaigns:string[]) => {
    let pointsToDisplay:CampaignRow[] = points;

    if (sources.length) {
        pointsToDisplay = pointsToDisplay.filter((r:CampaignRow) => sources.indexOf(r.Datasource) > -1);
    }

    if (campaigns.length) {
        pointsToDisplay = pointsToDisplay.filter((r:CampaignRow) => campaigns.indexOf(r.Campaign) > -1);
    }

    return uniqBy(pointsToDisplay, 'Date')
        .map((r:CampaignRow) => ({
            Date: r.Date,
            Clicks: sumBy(pointsToDisplay
                .filter((s:CampaignRow) => s.Date === r.Date), 'Clicks'),
            Impressions: sumBy(pointsToDisplay
                .filter((s:CampaignRow) => s.Date === r.Date), 'Impressions')
        }));
};

const calculateTicks = (pointsToDisplay:CampaignRowSimple[], ticks:number) => {
    const moduloTick = Math.ceil(pointsToDisplay.length / ticks);

    return pointsToDisplay
            .filter((r:CampaignRowSimple, i:number) => !(i%moduloTick) || i === pointsToDisplay.length - 1)
            .map((r:CampaignRowSimple) => r.Date);
};

export default () => {
    const dispatch = useDispatch();
    const points = useSelector(data);
    const sources = useSelector(selectedSources);
    const campaigns = useSelector(selectedCampaigns);
    const isLoading = useSelector(loading);

    const pointsToDisplay:CampaignRowSimple[] = calculatePoints(points, sources, campaigns);
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