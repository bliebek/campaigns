import React from 'react';

const whyDidYouRender = require('@welldone-software/why-did-you-render');
const ReactRedux = require('react-redux/lib');
whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [
        [ReactRedux, 'useSelector']
    ]
});
