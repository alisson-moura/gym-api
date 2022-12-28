import { Request } from 'express'
import multer, { Multer } from 'multer'
import { resolve } from 'path'

export const uploadConfig = {
    uploadFolder: resolve(__dirname, '..', '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadConfig.uploadFolder)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const [_, ext] = file.originalname.split('.')
            cb(null, uniqueSuffix + '.' + ext)
        }
    }),
    limits: {
        fileSize:10485760 // 10 Mb
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/jpg",
            "application/pdf",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
}

