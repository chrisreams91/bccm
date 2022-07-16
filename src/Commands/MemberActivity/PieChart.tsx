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
    height={600}
    width={800}
    innerRadius={0.5}
    padAngle={1}
    // sortByValue={true}
    arcLabelsSkipAngle={11}
    arcLinkLabelsSkipAngle={0}
    arcLinkLabelsColor={{
      from: 'color',
    }}
  />
);

export default PieChart;
