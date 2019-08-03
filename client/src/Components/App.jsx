import React from 'react';
import Axios from 'axios';
import { Line } from 'react-chartjs-2';
import SelectDates from './SelectDates.jsx';
// import BtcChart from './BtcChart.jsx';

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
                        type: 'line',
                        fill: false,
                        data: []
                    }
                ]
            },
            toDate: '',
            fromDate: ''
        }

        this.chartLabels = this.chartLabels.bind(this);
        this.toDate = this.toDate.bind(this);
        this.fromDate = this.fromDate.bind(this);
        this.checkDates = this.checkDates.bind(this);
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

    // componentDidMount() {
    //     Axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2019-08-01')
    //     .then( res => this.setState({ btc: res.data }))
    //     .then( res => this.chartLabels())
    //     .catch( err => console.log('Error: ', err));
    // }

    toDate(e) {
        this.setState({ toDate: e.target.value });
    }

    fromDate(e) {
        this.setState({ fromDate: e.target.value });
    }

    checkDates() {
        Axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.toDate}&end=${this.state.fromDate}`)
        .then( res => this.setState({ btc: res.data }))
        .then( res => this.chartLabels())
        .catch( err => console.log('Error: ', err));
    }

    render() {
        return (
            <div style={{ position: 'relative', width: 1500, height:200 }}>
                <h1>bitcoin price chart</h1>
                <Line 
                    options={{
                        responsive: true
                    }}
                    data={this.state.newBTC}
                />
                <SelectDates
                    toDate={this.toDate}
                    fromDate={this.fromDate}
                    checkDates={this.checkDates}
                />
            </div>
        )
    }
}

export default App;