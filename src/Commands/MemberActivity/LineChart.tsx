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
      width={1200}
      height={600}
      pointLabelYOffset={0}
      enablePoints={false}
      enableArea={true}
      areaOpacity={0.2}
      enableGridX={false}
      // pointBorderWidth={3}
      // yScale={{
      //   type: 'linear',
      //   stacked: true,
      // }}
      margin={{ top: 100, right: 150, bottom: 100, left: 100 }}
      enableSlices={'x'}
      legends={[
        {
          anchor: 'bottom-right',
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
          // symbolBorderColor: 'rgba(0, 0, 0, .5)',
        },
      ]}
    />
  );
};

export default LineChart;
