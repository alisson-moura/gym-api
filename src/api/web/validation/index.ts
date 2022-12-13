import { CancelAppointmentSchema } from "./cancel-appointment";
import { ConfirmAppointmentSchema } from "./confirm-appointments";
import { CreateAccountSchema } from "./create-account";
import { CreateAdminSessionSchema } from "./create-admin-session";
import { CreateExerciseSchema } from "./create-exercise";
import { CreateSessionSchema } from "./create-session";
import { DateSchema } from "./date";
import { NewAppointmentSchema } from "./new-appointment";
import { PaginationSchema } from "./pagination";
import { UpdateAccountSchema } from "./update-account";

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
    PaginationSchema
}

export default Schemas