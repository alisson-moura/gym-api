import { Request, Response } from "express";
import { memoryUsage } from "process";
import { prisma } from "../../database";
import { BaseController } from "./base-controller";

class HealthController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const infos = {
            databaseConnection: '',
            uptime: this.formatTime(process.uptime()),
            memory: this.formatBytes(memoryUsage.rss())
        }

        try {
            const result = await prisma.$queryRaw`SELECT 1` as Array<{}>
            infos.databaseConnection = result.length > 0 ? 'on' : 'off'
        } catch (error) {
            infos.databaseConnection = 'off'
        }

        return this.ok(res, infos)
    }

    private formatBytes(bytes: number): string {
        return `${Math.round(bytes / 1024 / 1024 * 100) / 100} MB`
    }

    private formatTime(seconds: number): string {
        function pad(s: number) {
            return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60 * 60));
        var minutes = Math.floor(seconds % (60 * 60) / 60);
        var seconds = Math.floor(seconds % 60);

        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    }
}

export default new HealthController()