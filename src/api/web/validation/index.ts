import { CancelAppointmentSchema } from "./cancel-appointment";
import { ConfirmAppointmentSchema } from "./confirm-appointments";
import { CreateAccountSchema } from "./create-account";
import { CreateAdminSessionSchema } from "./create-admin-session";
import { CreateExerciseSchema } from "./create-exercise";
import { CreateNotificationSchema } from "./create-notification";
import { CreateSessionSchema } from "./create-session";
import { DateSchema } from "./date";
import { ListPaymentstSchema } from "./list-payments";
import { NewAppointmentSchema } from "./new-appointment";
import { PaginationSchema } from "./pagination";
import { RegisterPaymentSchema } from "./register-appointment";
import { UpdateAccountSchema } from "./update-account";
import { UpdateClientSchema } from "./update-client";
import { UpdateExerciseSchema } from "./update-exercise";

const Schemas:any = {
    CreateAccountSchema,
    CreateSessionSchema,
    UpdateAccountSchema,
    DateSchema,
    CreateExerciseSchema,
    NewAppointmentSchema,
    CancelAppointmentSchema,
    ConfirmAppointmentSchema, 
    CreateAdminSessionSchema,
    PaginationSchema,
    UpdateExerciseSchema,
    CreateNotificationSchema,
    UpdateClientSchema,
    RegisterPaymentSchema,
    ListPaymentstSchema
}

export default Schemas