import React from 'react';
import './app.css';

import DataProvider from './../service/campaigns/data-provider';
import Loader from './loader';
import Chart from './chart';
import Filter from './filter';

export default () => {

    return (<div className={'c-app'}>
        <DataProvider />
        <Loader />
        <div className={'c-app__content'}>
            <Filter />
            <Chart />
        </div>
    </div>);
}