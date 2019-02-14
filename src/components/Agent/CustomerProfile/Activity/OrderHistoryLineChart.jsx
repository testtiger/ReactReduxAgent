import React, { Component } from "react";

import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar
} from "recharts";

export default class OrderHistoryLineChart extends Component {
  render() {
    var resp= this.props.response;
    
    var data=getDataForChart(resp);
    return (
      <div>
        <h3>Order Stats</h3>
        <br/>
        <br/>
        <br/>
  <ComposedChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey='OrderTotal' barSize={20} fill='#413ea0' />        
      </ComposedChart>   
           
      </div>
    );
  }
}

function getDataForChart(response){
  var collecteData = response.items.map(function(order) {
    return {
      name: new Intl.DateTimeFormat("en-IND").format(
        new Date(order.submittedDate)
      ),
      OrderTotal: order.priceInfo.total
    };
  });
  return collecteData;
}


