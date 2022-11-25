import { DateProvider } from "../Date";

export class FakeDateProvider implements DateProvider {
    sameDay: (date: Date, dateToCompare: Date) => boolean;
    differenceInHours: (date: Date, dateToCompare: Date) => number;
    isAfter: (date: Date, dateToCompare: Date) => Boolean;
    isBefore(date: Date, dateToCompare: Date): Boolean {
        return false
    }
}