import User from '../../Database/Entities/User.entity';
import { LineChartData } from './LineChart';
import { PieData } from './PieChart';
import { DAY } from '../../Util/Constants';

export const formatPieData = (data: User[]): PieData[] =>
  data.map((user) => ({
    id: user.username,
    label: user.username,
    value: user.messages.length,
  }));

export const formatLineData = (
  data: User[],
  range: number,
): LineChartData[] => {
  const dateRanges = formatDateRange(range);

  const formatted = data.map((user) => {
    const messagesWithinRange = user.messages.filter(
      (message) => Number(message.createdTimestamp) > dateRanges[0],
    );

    const data = dateRanges.map((date, index) => {
      if (index === 9) {
        const messages = messagesWithinRange.filter(
          (message) => Number(message.createdTimestamp) > dateRanges[index],
        );
        return { x: index, y: messages.length };
      } else {
        const messages = messagesWithinRange.filter(
          (message) =>
            Number(message.createdTimestamp) > dateRanges[index] &&
            Number(message.createdTimestamp) < dateRanges[index + 1],
        );
        return { x: index, y: messages.length };
      }
    });

    return { id: user.username, data };
  });

  return formatted;
};

// only does 10 points
// each data point value of all messages between increment chunk and data point date
export const formatDateRange = (numberOfDays: number) => {
  const incrementSize = (numberOfDays / 10) * DAY;

  let chunk = Date.now() - incrementSize;

  const dateRanges = Array.from({ length: 10 }, (_, index) => {
    if (index === 0) {
      return chunk;
    } else {
      const nextChunk = chunk - incrementSize;
      chunk = nextChunk;
      return chunk;
    }
  });

  return dateRanges.reverse();
};
