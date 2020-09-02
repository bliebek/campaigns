import React from 'react';
import { useSelector } from 'react-redux';
import { loading } from './../service/campaigns/selectors';
import './loader.css';

export default () => {
    const isLoading = useSelector(loading);

    return isLoading ? <div className={'c-loader'}><span>Loading data...</span></div> : null;
}