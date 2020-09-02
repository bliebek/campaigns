import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select, { Option } from 'rc-select';
import { sources, campaigns } from './../../service/campaigns/selectors';
import { setSelectedSources, setSelectedCampaigns } from './../../service/campaigns/actions';

import './filter.css';
import './rc-select.css';

export default () => {
    const dispatch = useDispatch();
    const sourcesList = useSelector(sources);
    const campaignsList = useSelector(campaigns);
    const onSourcesChange = useCallback((sources:string[]) => dispatch(setSelectedSources(sources)), [ dispatch ]);
    const onCampaignsChange = useCallback((campaigns:string[]) => dispatch(setSelectedCampaigns(campaigns)), [ dispatch ]);

    return (<div className={'c-filter'}>
                <h1 className={'c-filter__title'}>Filter dimension values</h1>
                <div className={'c-filter__section'}>
                    <label className={'c-filter__label'}>Datasource</label>
                    <Select
                        showArrow
                        allowClear
                        placeholder="Choose datasource or leave blank for all datasources"
                        mode={'tags'}
                        onChange={onSourcesChange}>
                        {sourcesList.map((r:string) => <Option key={r} value={r}>{r}</Option>)}
                    </Select>
                </div>
                <div className={'c-filter__section'}>
                    <label className={'c-filter__label'}>Campaign</label>
                    <Select
                        showArrow
                        allowClear
                        placeholder="Choose campaign or leave blank for all campaigns"
                        mode="tags"
                        onChange={onCampaignsChange}>
                        {campaignsList.map((r:string) => <Option key={r} value={r}>{r}</Option>)}
                    </Select>
                </div>
    </div>);
}

