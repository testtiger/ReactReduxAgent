import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell} from "recharts";
export default class OrderHistoryPieChart extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      activeIndex:""
    };
  }

  getInitialState() {
    return {
      activeIndex: 0,
    };
  }

  onPieEnter(data,index) {
    this.setState({
      activeIndex: index,
    });
  }
  
  render() {
    let data = [{name: 'Cancelled Orders', value: this.props.response.cancelledOrdersCount}, {name: 'Fulfilled Orders', value: this.props.response.fulfilledOrdersCount},
    {name: 'Submitted', value: this.props.response.submittedOrdersCount}];

    return (
      <div>
       <center><h3>Order Classification</h3>  </center>            
        <PieChart width={600} height={400} style="margin-top: -50px;">
        <Pie 
        	activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape} 
          data={data} 
          cx={300} 
          cy={200} 
          innerRadius={60}
          outerRadius={120} 
          fill="#8884d8"
          onMouseEnter={this.onPieEnter.bind(this)}
        >{
          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
        }</Pie>
        
       </PieChart> 
      </div>   
    );
  }
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`No of Orders ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100)}% of Total`}
      </text>
    </g>
  );
};

const COLORS = ['#FF0000','#2E8B57','#FFA500'];
const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


