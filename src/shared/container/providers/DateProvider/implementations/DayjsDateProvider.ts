import IDateProvider from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default class DayjsDateProvider implements IDateProvider {
  compareDiffInHours(dateA: Date, dateB: Date): number {
    const dateAFormatted = dayjs(dateA).utc().local().format();
    const dateBFormatted = dayjs(dateB).utc().local().format();

    return dayjs(dateBFormatted).diff(dateAFormatted, "hours");
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  add24Hours(): Date {
    return dayjs().add(24, "hours").toDate();
  }

  compareDiffInDays(dateA: Date, dateB: Date): number {
    const dateAFormatted = dayjs(dateA).utc().local().format();
    const dateBFormatted = dayjs(dateB).utc().local().format();

    return dayjs(dateBFormatted).diff(dateAFormatted, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  compareIfBefore(dateA: Date, dateB: Date): boolean {
    return dayjs(dateA).isBefore(dateB);
  }
}
