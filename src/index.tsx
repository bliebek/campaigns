import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './component/app';
import store, { sagaMiddleware } from './store';
import { rootSaga } from './service/root-reducer';

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
