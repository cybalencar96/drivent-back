import dayjs from "dayjs";

interface DateOperator {
  isAfterOrSame(date1: Date, date2: Date): boolean;
  isBeforeOrSame(date1: Date, date2: Date): boolean;
}

class DateOperatorAdapter implements DateOperator {
  isAfterOrSame(date1: Date, date2: Date): boolean {
    return dayjs(date1).isAfter(date2) || dayjs(date1).isSame(date2);
  }

  isBeforeOrSame(date1: Date, date2: Date): boolean {
    return dayjs(date1).isBefore(date2) || dayjs(date1).isSame(date2);
  }
}

const dateOperator = new DateOperatorAdapter();

export { dateOperator };
