import { isBefore, isAfter, differenceInHours, isSameDay } from 'date-fns'
import { DateProvider } from "../../providers/Date";

export class DateFnsProvider implements DateProvider {
    isBefore(date: Date, dateToCompare: Date): Boolean {
        return isBefore(date, dateToCompare)
    }
    isAfter(date: Date, dateToCompare: Date): Boolean {
        return isAfter(date, dateToCompare)
    }
    differenceInHours(date: Date, dateToCompare: Date): number {
        return differenceInHours(date, dateToCompare)
    }
    sameDay(date: Date, dateToCompare: Date): Boolean {
        return isSameDay(date, dateToCompare)
    }
}