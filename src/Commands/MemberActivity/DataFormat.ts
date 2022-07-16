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
    if (messagesWithinRange.length === 0) {
      return;
    }

    const data = dateRanges.map((date, index) => {
      const readableDate = timestampToMonthDayString(date);

      if (index === 9) {
        const messages = messagesWithinRange.filter(
          (message) => Number(message.createdTimestamp) > dateRanges[index],
        );
        return { x: readableDate, y: messages.length };
      } else {
        const messages = messagesWithinRange.filter(
          (message) =>
            Number(message.createdTimestamp) > dateRanges[index] &&
            Number(message.createdTimestamp) < dateRanges[index + 1],
        );
        return { x: readableDate, y: messages.length };
      }
    });

    return { id: user.username, data };
  });

  return formatted.filter(Boolean);
};

const timestampToMonthDayString = (timestamp: number) => {
  const minDateClass = new Date(timestamp);
  const minDay = minDateClass.getDate();
  const minMonth = minDateClass.getMonth();

  const increment = DAY * 3;
  const maxDateClass = new Date(timestamp + increment);
  const maxDay = maxDateClass.getDate();
  const maxMonth = maxDateClass.getMonth();

  return `${minMonth}/${minDay} - ${maxMonth}/${maxDay}`;
};

// only does 10 points
// values of date is between increment chunk and data point date
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
