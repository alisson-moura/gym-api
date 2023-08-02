import { Request, Response } from "express";
import { BaseController } from "../base-controller";
import { AppointmentReportService } from "../../../../modules/appointments/services/report";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { DateFnsProvider } from "../../../providers/DateFnsProvider";

class AppointmentReportController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const startDate = req.query.startDate as string
        const endDate = req.query.endDate as string

        if (startDate == null || endDate == null) {
            return this.clientError(res, 'Invalid dates')
        }

        const service = new AppointmentReportService(new PrismaAppointmentRepository(), new DateFnsProvider())
        const result = await service.execute({ endDate: endDate, startDate: startDate })

        return this.ok(res, result)
    }
}

export default new AppointmentReportController()