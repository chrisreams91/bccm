import React from 'react';
import { Line } from '@nivo/line';

export interface LineChartData {
  id: string;
  data: { x: any; y: any }[];
}

const LineChart = (data: LineChartData[]) => {
  return (
    <Line
      data={data}
      width={900}
      height={400}
      pointLabelYOffset={0}
      // yScale={{
      //   type: 'linear',
      //   stacked: true,
      // }}
      // margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      // enableSlices={'x'}
    />
  );
};

export default LineChart;
