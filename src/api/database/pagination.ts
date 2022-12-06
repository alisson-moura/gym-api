export const databasePagination = (page: number, take = 20) => {
    take = take > 50 ? 50 : take
    const skip = take * (page - 1)
    return {
        take,
        skip
    }
}