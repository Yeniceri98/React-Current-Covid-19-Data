import React, { useEffect, useState } from 'react';
import './App.css';
import { Cards, Chart, CountryPicker} from './components';
import { fetchData } from './API';
import corona from './image/corona.png';

class App extends React.Component {
    state = {
        data: {},      // Cards
        country: "",   // CountryPicker
    }

    // FETCHING DATA
    async componentDidMount() {
        const fetchedData = await fetchData();
        console.log(fetchedData);
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country })
        console.log(fetchedData);   
        console.log(country);       
    }

    render() {
        const { data, country } = this.state;   
        return (
            <div className="container">
                <img src={corona} alt="covid-19" className="image"/>
                <Cards data={data} />   
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App

