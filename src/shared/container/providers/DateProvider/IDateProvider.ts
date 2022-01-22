export default interface IDateProvider {
  compareDiffInHours(dateA: Date, dateB: Date): number;
  dateNow(): Date;
  add24Hours(): Date;
}
