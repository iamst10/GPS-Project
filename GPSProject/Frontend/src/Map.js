import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoBox } from 'react-google-maps';

class Map extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var posList = this.props.response;
    var center;
    if (!posList) {
      // posList = false => tạo array, set center là điểm mặc định
      posList = [];
      center = {lat: 10.773793, lng:  106.660886} 
      Marker.position={lat: 10.773793, lng: 106.660886}
     
    }
    else {
      // Chọn điểm đầu tiên làm center
      const firstPos = posList[0];
      
      

    {posList.map((row,i) => {
        return (
          
          center = {lat: row.laitude, lng: row.longitude}
        )})}

    }
    const GoogleMapExample = withGoogleMap( props => (
      <GoogleMap

        defaultCenter = {center}
        defaultZoom = {16}>

        {posList.map((row,i) => {
          return (
            
            <Marker position={{lat: row.laitude, lng: row.longitude}} />
          )})}
      </GoogleMap>
    ));
    return(
       <div id = "googlemap" style={{'display':"none"}}>
         <GoogleMapExample
           containerElement={ <div style={{ height: '500px', width: '100%' }} /> }
           mapElement={ <div style={{ height: '500px' }} /> }
         />1
       </div>
    );
    }
 };
 export default Map;
