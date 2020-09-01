import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCampaignsData } from './actions';

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCampaignsData())
    }, [ dispatch ]);

    return null;
}
