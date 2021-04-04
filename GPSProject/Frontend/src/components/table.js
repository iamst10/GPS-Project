import React from 'react';
import moment from 'moment';

class DataTable extends React.Component {
   
   render() {
      const response = this.props.response;
      return (
      <center>
      <div id = "table" style={{'overflow-x':'auto', 'display':"none", 'max-width':"600"}}> 
        {/* overflow-x: Tự động co giãn chart, 
            display none: làm chart mặc định ẩn đi trước khi người dùng toggle bằng cách ấn vào button "Table",
            max-width: bề rộng tối đa của chart */}
         <table class="w3-table-all w3-small">
         {/* Class w3 là css từ W3.css */}
               <thead>
                  <tr class="w3-red">
                   <th>Date</th>
                   <th>Temperature</th>
                   <th>Humid</th>
                   <th>Latitude</th>
                   <th>Longitude</th>
                 </tr>
                  </thead>
            {response
              ? <tbody>
              {response.map((row,i) =>
                 <tr class="w3-hover-black">
                   <td>{moment(row.Created_date).format('DD/MM/YYYY HH:mm')}</td>
                   <td>{row.temp}</td>
                   <td>{row.humid}</td>
                   <td>{row.laitude}</td>
                   <td>{row.longitude}</td>
                 </tr>
              )}
               </tbody>
              : <tbody></tbody>
            }
            
         </table>
      </div>                           
      </center>
      );
   }
}
export default DataTable;
