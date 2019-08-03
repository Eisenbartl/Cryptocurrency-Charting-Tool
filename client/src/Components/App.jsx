import React from 'react';
import Axios from 'axios';
import { Line } from 'react-chartjs-2';
import BtcChart from './BtcChart.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btc: {},
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Bitcoin Price',
                        backgroundColor: 'red',
                        data: []
                    }
                ]
            }
        }

        this.chartLabels = this.chartLabels.bind(this);
    }

    chartLabels() {
        let newBTC = this.state.data;
        let dates = this.state.btc.bpi;
        let x = [];
        let y = [];

        for (let key in dates) {
            x.push(key);
            y.push(dates[key]);
        }


        newBTC.labels = x;
        newBTC.datasets[0].data = y;
        this.setState({ newBTC });
    }

    componentDidMount() {
        Axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?index=[USD/CNY]')
        .then( res => this.setState({ btc: res.data }))
        .then( res => this.chartLabels())
        .catch( err => console.log('Error: ', err));

        
    }

    render() {
        return (
            <div style={{ position: 'relative', width: 1200, height:550 }}>
                <h1>30 day bitcoin price</h1>
                <Line 
                    options={{
                        responsive: true
                    }}
                    data={this.state.newBTC}
                />
            </div>
        )
    }
}

export default App;