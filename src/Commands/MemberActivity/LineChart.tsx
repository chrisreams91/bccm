import React from 'react';
import { Line } from '@nivo/line';

export const LineChart = () => {
  const data = [
    {
      id: 'whisky',
      color: 'hsl(188, 70%, 50%)',
      data: [
        { color: 'hsl(229, 70%, 50%)', x: 'LY', y: 14 },
        { color: 'hsl(134, 70%, 50%)', x: 'IT', y: 26 },
        { color: 'hsl(177, 70%, 50%)', x: 'GT', y: 50 },
        { color: 'hsl(85, 70%, 50%)', x: 'CA', y: 1 },
        { color: 'hsl(97, 70%, 50%)', x: 'BH', y: 23 },
        { color: 'hsl(323, 70%, 50%)', x: 'PE', y: 13 },
        { color: 'hsl(235, 70%, 50%)', x: 'SN', y: 40 },
        { color: 'hsl(251, 70%, 50%)', x: 'QA', y: 60 },
        { color: 'hsl(116, 70%, 50%)', x: 'RS', y: 24 },
        { color: 'hsl(93, 70%, 50%)', x: 'CH', y: 9 },
        { color: 'hsl(147, 70%, 50%)', x: 'FK', y: 54 },
        { color: 'hsl(314, 70%, 50%)', x: 'PM', y: 59 },
        { color: 'hsl(334, 70%, 50%)', x: 'NG', y: 2 },
        { color: 'hsl(157, 70%, 50%)', x: 'BA', y: 13 },
        { color: 'hsl(171, 70%, 50%)', x: 'AU', y: 0 },
        { color: 'hsl(56, 70%, 50%)', x: 'MZ', y: 21 },
        { color: 'hsl(182, 70%, 50%)', x: 'TN', y: 56 },
        { color: 'hsl(74, 70%, 50%)', x: 'FR', y: 40 },
      ],
    },
    {
      id: 'rhum',
      color: 'hsl(40, 70%, 50%)',
      data: [
        { color: 'hsl(46, 70%, 50%)', x: 'LY', y: 59 },
        { color: 'hsl(273, 70%, 50%)', x: 'IT', y: 8 },
        { color: 'hsl(337, 70%, 50%)', x: 'GT', y: 25 },
        { color: 'hsl(33, 70%, 50%)', x: 'CA', y: 51 },
        { color: 'hsl(176, 70%, 50%)', x: 'BH', y: 55 },
        { color: 'hsl(299, 70%, 50%)', x: 'PE', y: 2 },
        { color: 'hsl(251, 70%, 50%)', x: 'SN', y: 56 },
        { color: 'hsl(158, 70%, 50%)', x: 'QA', y: 49 },
        { color: 'hsl(240, 70%, 50%)', x: 'RS', y: 2 },
        { color: 'hsl(295, 70%, 50%)', x: 'CH', y: 37 },
        { color: 'hsl(26, 70%, 50%)', x: 'FK', y: 27 },
        { color: 'hsl(180, 70%, 50%)', x: 'PM', y: 60 },
        { color: 'hsl(205, 70%, 50%)', x: 'NG', y: 26 },
        { color: 'hsl(171, 70%, 50%)', x: 'BA', y: 10 },
        { color: 'hsl(70, 70%, 50%)', x: 'AU', y: 35 },
        { color: 'hsl(344, 70%, 50%)', x: 'MZ', y: 9 },
        { color: 'hsl(179, 70%, 50%)', x: 'TN', y: 11 },
        { color: 'hsl(241, 70%, 50%)', x: 'FR', y: 6 },
      ],
    },
    {
      id: 'gin',
      color: 'hsl(146, 70%, 50%)',
      data: [
        { color: 'hsl(63, 70%, 50%)', x: 'LY', y: 10 },
        { color: 'hsl(122, 70%, 50%)', x: 'IT', y: 4 },
        { color: 'hsl(351, 70%, 50%)', x: 'GT', y: 45 },
        { color: 'hsl(323, 70%, 50%)', x: 'CA', y: 42 },
        { color: 'hsl(132, 70%, 50%)', x: 'BH', y: 42 },
        { color: 'hsl(210, 70%, 50%)', x: 'PE', y: 33 },
        { color: 'hsl(352, 70%, 50%)', x: 'SN', y: 50 },
        { color: 'hsl(14, 70%, 50%)', x: 'QA', y: 11 },
        { color: 'hsl(335, 70%, 50%)', x: 'RS', y: 0 },
        { color: 'hsl(93, 70%, 50%)', x: 'CH', y: 42 },
        { color: 'hsl(171, 70%, 50%)', x: 'FK', y: 20 },
        { color: 'hsl(338, 70%, 50%)', x: 'PM', y: 55 },
        { color: 'hsl(85, 70%, 50%)', x: 'NG', y: 42 },
        { color: 'hsl(297, 70%, 50%)', x: 'BA', y: 3 },
        { color: 'hsl(69, 70%, 50%)', x: 'AU', y: 31 },
        { color: 'hsl(340, 70%, 50%)', x: 'MZ', y: 53 },
        { color: 'hsl(302, 70%, 50%)', x: 'TN', y: 32 },
        { color: 'hsl(52, 70%, 50%)', x: 'FR', y: 42 },
      ],
    },
    {
      id: 'vodka',
      color: 'hsl(191, 70%, 50%)',
      data: [
        { color: 'hsl(88, 70%, 50%)', x: 'LY', y: 59 },
        { color: 'hsl(63, 70%, 50%)', x: 'IT', y: 29 },
        { color: 'hsl(191, 70%, 50%)', x: 'GT', y: 51 },
        { color: 'hsl(50, 70%, 50%)', x: 'CA', y: 17 },
        { color: 'hsl(294, 70%, 50%)', x: 'BH', y: 42 },
        { color: 'hsl(291, 70%, 50%)', x: 'PE', y: 19 },
        { color: 'hsl(349, 70%, 50%)', x: 'SN', y: 5 },
        { color: 'hsl(117, 70%, 50%)', x: 'QA', y: 55 },
        { color: 'hsl(223, 70%, 50%)', x: 'RS', y: 12 },
        { color: 'hsl(143, 70%, 50%)', x: 'CH', y: 12 },
        { color: 'hsl(203, 70%, 50%)', x: 'FK', y: 55 },
        { color: 'hsl(262, 70%, 50%)', x: 'PM', y: 58 },
        { color: 'hsl(45, 70%, 50%)', x: 'NG', y: 40 },
        { color: 'hsl(333, 70%, 50%)', x: 'BA', y: 2 },
        { color: 'hsl(330, 70%, 50%)', x: 'AU', y: 11 },
        { color: 'hsl(65, 70%, 50%)', x: 'MZ', y: 16 },
        { color: 'hsl(347, 70%, 50%)', x: 'TN', y: 27 },
        { color: 'hsl(331, 70%, 50%)', x: 'FR', y: 33 },
      ],
    },
    {
      id: 'cognac',
      color: 'hsl(172, 70%, 50%)',
      data: [
        { color: 'hsl(91, 70%, 50%)', x: 'LY', y: 20 },
        { color: 'hsl(244, 70%, 50%)', x: 'IT', y: 41 },
        { color: 'hsl(331, 70%, 50%)', x: 'GT', y: 15 },
        { color: 'hsl(314, 70%, 50%)', x: 'CA', y: 47 },
        { color: 'hsl(180, 70%, 50%)', x: 'BH', y: 42 },
        { color: 'hsl(94, 70%, 50%)', x: 'PE', y: 18 },
        { color: 'hsl(26, 70%, 50%)', x: 'SN', y: 47 },
        { color: 'hsl(278, 70%, 50%)', x: 'QA', y: 1 },
        { color: 'hsl(110, 70%, 50%)', x: 'RS', y: 45 },
        { color: 'hsl(193, 70%, 50%)', x: 'CH', y: 37 },
        { color: 'hsl(144, 70%, 50%)', x: 'FK', y: 33 },
        { color: 'hsl(172, 70%, 50%)', x: 'PM', y: 40 },
        { color: 'hsl(208, 70%, 50%)', x: 'NG', y: 37 },
        { color: 'hsl(126, 70%, 50%)', x: 'BA', y: 27 },
        { color: 'hsl(26, 70%, 50%)', x: 'AU', y: 59 },
        { color: 'hsl(305, 70%, 50%)', x: 'MZ', y: 55 },
        { color: 'hsl(165, 70%, 50%)', x: 'TN', y: 11 },
        { color: 'hsl(250, 70%, 50%)', x: 'FR', y: 11 },
      ],
    },
  ];

  return (
    <Line
      data={data}
      width={900}
      height={400}
      pointLabelYOffset={-12}
      yScale={{
        type: 'linear',
        stacked: true,
      }}
      margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      enableSlices={'x'}
    />
  );
};
