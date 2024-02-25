import dayjs, { Dayjs } from "dayjs";

export function getMonthMatrix(month: number = dayjs().month()): Dayjs[][] {
  month = Math.floor(month);
  const year: number = dayjs().year();
  let firstDayOfTheMonth: number = dayjs(new Date(year, month, 1)).day() - 1;
  if (firstDayOfTheMonth < 0) firstDayOfTheMonth = 6;

  let currentMonthCount: number = 0 - firstDayOfTheMonth;
  const daysMatrix: Dayjs[][] = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}
