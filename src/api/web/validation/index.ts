import { CancelAppointmentSchema } from "./cancel-appointment";
import { ConfirmAppointmentSchema } from "./confirm-appointments";
import { CreateAccountSchema } from "./create-account";
import { CreateSessionSchema } from "./create-session";
import { DateSchema } from "./date";
import { NewAppointmentSchema } from "./new-appointment";
import { UpdateAccountSchema } from "./update-account";

const Schemas:any = {
    CreateAccountSchema,
    CreateSessionSchema,
    UpdateAccountSchema,
    DateSchema,
    NewAppointmentSchema,
    CancelAppointmentSchema,
    ConfirmAppointmentSchema
}

export default Schemas