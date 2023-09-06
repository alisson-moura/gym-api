export interface ScheduleRepository {
    findByDate: (date: Date) => Promise<{ date: Date, status: string, description: string } | null>
    blockDate: (request: { date: Date, description: string }) => Promise<void>
}