export interface DateProvider {
  /**
   * @description Is the first date before the second one?
   * @return  Boolean: he first date is before the second date
   */
  isBefore: (date: Date, dateToCompare: Date) => Boolean
  isAfter: (date: Date, dateToCompare: Date) => Boolean

  /**
  * @description Get the number of hours between the given dates.
  * @return  Number: he the number of hours
  */
  differenceInHours: (date: Date, dateToCompare: Date) => number

  /**
* @description Are the given dates in the same day (and year and month)?
* @return  Boolean: the dates are in the same day (and year and month)
*/
  sameDay: (date: Date, dateToCompare: Date) => Boolean


  /**
* @description Creates a date from a month and a year
* @return  Date: Date with the first day of the year and month
*/
  dateByMonthAndYear: ({ month, year }: { month: number, year: number }) => Date

  /**
* @description Creates a date one month earlier
*/
  prevMonth: (month: Date) => Date

  /**
   * @description Set date values to a given date.
   * Sets time values to date from object values. A value is not set if it is undefined or null or doesn't exist in values.
   */
  setDate: ({ day, month, year }: { day?: number, year?: number, month?: number }) => Date
}