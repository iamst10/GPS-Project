import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, Hint, HorizontalGridLines, LineMarkSeries, DiscreteColorLegend, Crosshair} from 'react-vis';
import moment from 'moment';

var i;
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            items: [
                {title: 'Temp', color: 'gray'},
                {title: 'Humid', color: 'red'}],        
        };
      }
      _forgetValue = () => {this.setState({value: null});
      };
      _rememberValue = value => {this.setState({value});
    };
    render() {
        const {items, value} = this.state;
    return (
      <center>
      <div id = "chart">
        <XYPlot xType="ordinal" width={1000} height={500}>
        <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
        <VerticalGridLines style={{stroke: '#B7E9ED'}} /> 
        <XAxis
            title="Date"
            style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}}}/>
        <YAxis title="Temp & Humid" />
        <DiscreteColorLegend height={200} width={300} items={items}/>
        <LineMarkSeries 
    
            onValueMouseOver={this._rememberValue}
            onValueMouseOut={this._forgetValue}
            data={this.props.data.map( row=> {return {x: moment(row.Created_date).format("DD/MM HH:mm:ss"), y: row.temp}})}
            fill={'white'}
            size={3}
            style={{stroke: 'red', strokeWidth: 2}}
            curve={'curveMonotoneX'}/>
            
        <LineMarkSeries
            onValueMouseOver={this._rememberValue}
            onValueMouseOut={this._forgetValue}
            data={this.props.data.map( row=> {return {x: moment(row.Created_date).format("DD/MM HH:mm:ss"), y: row.humid}})}
            fill={'white'}
            size={3}
            style={{stroke: 'gray', strokeWidth: 2}}
            curve={'curveMonotoneX'}/>
            {value ? <Hint 
                        value={value} 
                        style={{value: {color: 'yellow'}} }
                         /> : null}       
        </XYPlot>
        </div>
        </center>
    );
}
}
export default Chart;

