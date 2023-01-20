import { isBefore, isAfter, differenceInHours, isSameDay, set } from 'date-fns'
import { DateProvider } from "../../providers/Date";

export class DateFnsProvider implements DateProvider {
    dateByMonthAndYear({ month, year }: { month: number; year: number; }): Date {
        const date = set(new Date(), { month: month, year: year, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
        return date
    }

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