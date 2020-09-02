import React from 'react';
import './app.css';

import Chart from './../chart/chart';
import Filter from './../filter/filter';

export default () => {

    return (<div className={'c-app'}>
        <div className={'c-app__content'}>
            <Filter />
            <Chart />
        </div>
    </div>);
};
