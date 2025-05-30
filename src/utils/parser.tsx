import moment, { Moment } from 'moment';

interface EmployeeRecord {
  empID: string;
  projectID: string;
  dateFrom: Moment;
  dateTo: Moment;
}

interface Overlap {
  empID1: string;
  empID2: string;
  projectID: string;
  days: number;
}

const DATE_FORMATS = [
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'MM-DD-YYYY',
  'YYYY/MM/DD',
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'YYYY.MM.DD',
  'DD.MM.YYYY',
  'MMM DD, YYYY',
  'MMMM DD, YYYY',
];

function parseDate(value: string): Moment {
  const trimmed = value.trim();
  if (trimmed.toLowerCase() === 'null') {
    return moment();
  }

  const parsed = moment(trimmed, DATE_FORMATS, true);
  return parsed.isValid() ? parsed : moment.invalid();
}

export function parseCSVAndCalculate(data: string): Overlap[] {
  const rows = data
    .trim()
    .split('\n')
    .map((row: string) => row.split(','));

  const records: EmployeeRecord[] = rows.map((cols: string[]) => {
    const [empID = '', projectID = '', dateFrom = '', dateTo = ''] = cols;

    const parsedFrom = parseDate(dateFrom);
    const parsedTo = parseDate(dateTo);

    if (!parsedFrom.isValid() || !parsedTo.isValid()) {
      console.warn(`⚠️ Invalid date for employee ${empID} on project ${projectID}: ${dateFrom} - ${dateTo}`);
    }

    return {
      empID,
      projectID,
      dateFrom: parsedFrom,
      dateTo: parsedTo,
    };
  });

  const overlaps: Overlap[] = [];

  for (let i = 0; i < records.length; i++) {
    for (let j = i + 1; j < records.length; j++) {
      const a = records[i];
      const b = records[j];

      if (a.projectID === b.projectID && a.dateFrom.isValid() && a.dateTo.isValid() && b.dateFrom.isValid() && b.dateTo.isValid()) {
        const start = moment.max(a.dateFrom, b.dateFrom);
        const end = moment.min(a.dateTo, b.dateTo);
        const days = end.diff(start, 'days');

        if (days > 0) {
          overlaps.push({
            empID1: a.empID,
            empID2: b.empID,
            projectID: a.projectID,
            days,
          });
        }
      }
    }
  }

  return overlaps.sort((a, b) => b.days - a.days).slice(0, 1);
}
