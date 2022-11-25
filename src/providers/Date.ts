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
}