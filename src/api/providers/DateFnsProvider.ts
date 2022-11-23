import { isBefore, isAfter, differenceInHours  } from 'date-fns'
import { DateProvider } from "../../providers/Date";

export class DateFnsProvider implements DateProvider {
    isBefore(date: Date, dateToCompare: Date): Boolean {
        return isBefore(date, dateToCompare)
    }
    isAfter (date: Date, dateToCompare: Date): Boolean {
        return isAfter(date, dateToCompare)
    }
    differenceInHours (date: Date, dateToCompare: Date): number {
        return differenceInHours(date, dateToCompare)
    }
}