import multer from "multer";
import { uploadConfig } from "../../providers/UploadProvider";

export const uploadMiddleware = multer({
    storage: uploadConfig.storage,
    limits: uploadConfig.limits,
    fileFilter: uploadConfig.fileFilter
})