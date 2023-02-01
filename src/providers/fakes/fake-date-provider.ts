import { DateProvider } from "../Date";

export class FakeDateProvider implements DateProvider {
    prevMonth: (month: Date) => Date;
    setDate: ({ day, month, year }: { day?: number | undefined; year?: number | undefined; month?: number | undefined; }) => Date;
    dateByMonthAndYear: ({ month, year }: { month: number; year: number; }) => Date;
    sameDay: (date: Date, dateToCompare: Date) => boolean;
    differenceInHours: (date: Date, dateToCompare: Date) => number;
    isAfter: (date: Date, dateToCompare: Date) => Boolean;
    isBefore(date: Date, dateToCompare: Date): Boolean {
        return false
    }
}