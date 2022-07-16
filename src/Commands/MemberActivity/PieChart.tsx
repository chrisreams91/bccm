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
    sortByValue={true}
    arcLabelsSkipAngle={11}
    arcLinkLabelsSkipAngle={0}
    arcLinkLabelsColor={{
      from: 'color',
    }}
    margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
  />
);

export default PieChart;
