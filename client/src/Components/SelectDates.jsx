import React from 'react';

class SelectDates extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="select-dates">
                <div className="to-from-date">
                    <p>Enter date year/month/day in numerical format, Ex: 2018-07-01</p>
                    <input onChange={ e => {this.props.toDate(e)}} type="text" placeholder="start date" />
                    <input onChange={ e => {this.props.fromDate(e)}} type="text" placeholder="end date" />
                </div>
                <button className="search-btn" onClick={() => {this.props.checkDates()}}>Search</button>
            </div>
        )
    }
}; 

export default SelectDates;