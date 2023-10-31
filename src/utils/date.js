import moment from 'moment';

export function isoFormat(date) {
  return moment(date).utc(true).format();
}
