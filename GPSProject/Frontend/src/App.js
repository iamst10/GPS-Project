import React, {Component} from 'react';
import './css/App.css';
import Chart from './components/chart'

import Map from './Map';
import Table from './components/table';
import {DBconfig} from './config/config';
import firebase from 'firebase';


class App extends Component {
    constructor(props) {
        super(props)
        this.app = firebase.initializeApp(DBconfig);
        this.database = this.app.database().ref().child('data');
        this.state = {
            results: [],
        };
    
    }
    componentDidMount() {
        
    }
    render() {
        const {results} = this.state;
        //console.log(results);
        return (
            <div className="App">
                <Chart data={results}   />
                <Map response={results}  />
                <Table response = {results} /> 
            </div>
        );
    }
}
export default App;
