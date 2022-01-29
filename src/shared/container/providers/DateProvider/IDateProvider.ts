export default interface IDateProvider {
  compareDiffInHours(dateA: Date, dateB: Date): number;
  dateNow(): Date;
  add24Hours(): Date;
  compareDiffInDays(dateA: Date, dateB: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}
