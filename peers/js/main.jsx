import React from 'react';
import ReactDOM from 'react-dom';
import Prob from './prob';

ReactDOM.render(
    <Kmplot url="/api/kmplot/"/>,
    document.getElementById('kmplot'),
);


ReactDOM.render(
    <Prob url="/api/prob/" />,
    document.getElementById('probability'),
);