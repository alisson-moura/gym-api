import { DateProvider } from "../Date";

export class FakeDateProvider implements DateProvider {
    differenceInHours: (date: Date, dateToCompare: Date) => number;
    isAfter: (date: Date, dateToCompare: Date) => Boolean;
    isBefore(date: Date, dateToCompare: Date): Boolean {
        return false
    }
}