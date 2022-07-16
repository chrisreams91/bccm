import React from 'react';
import { Pie } from '@nivo/pie';

export interface PieData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

const PieChart = (data: PieData[]) => (
  <Pie
    data={data}
    colors={{ scheme: 'paired' }}
    height={800}
    width={1200}
    innerRadius={0.5}
    padAngle={1}
    // sortByValue={true}
    enableArcLabels={false}
    arcLabelsSkipAngle={11}
    margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
    arcLinkLabelsSkipAngle={2}
    arcLinkLabelsDiagonalLength={36}
    arcLinkLabelsStraightLength={36}
    arcLinkLabelsColor={{
      from: 'color',
    }}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 0,
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

export default PieChart;
