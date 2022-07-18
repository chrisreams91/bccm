import React from 'react';
import { Line } from '@nivo/line';

export interface LineChartData {
  id: string;
  data: { x: string | number; y: string | number }[];
}

const LineChart = (data: LineChartData[], bottomLegend: string = 'time') => {
  return (
    <Line
      data={data}
      colors={{ scheme: 'paired' }}
      width={1200}
      height={800}
      pointLabelYOffset={0}
      // enablePoints={false}
      enableArea={true}
      areaOpacity={0.2}
      enableGridX={false}
      margin={{ top: 100, right: 150, bottom: 100, left: 100 }}
      axisBottom={{
        tickRotation: 25,
        tickPadding: 10,
        legend: bottomLegend,
        legendOffset: 60,
        legendPosition: 'middle',
      }}
      axisLeft={{
        legend: 'Message Count',
        legendOffset: -60,
        legendPosition: 'middle',
      }}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
        },
      ]}
      animate={false}
      isInteractive={false}
    />
  );
};

export default LineChart;
