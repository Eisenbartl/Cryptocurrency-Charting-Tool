import React from 'react';
import Chart from 'chart.js';

const BtcChart = props => (
    <div style={{ position: 'relative', width: 600, height:550 }}>
        <canvas id="myChart"></canvas>
    </div>
);

export default BtcChart;