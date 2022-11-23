"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cancel_appointment_controller_1 = __importDefault(require("./controllers/cancel-appointment-controller"));
var confirm_appointment_controller_1 = __importDefault(require("./controllers/confirm-appointment-controller"));
var create_account_controller_1 = __importDefault(require("./controllers/create-account-controller"));
var create_session_controller_1 = __importDefault(require("./controllers/create-session-controller"));
var new_appointment_controller_1 = __importDefault(require("./controllers/new-appointment-controller"));
var show_availables_appointments_controller_1 = __importDefault(require("./controllers/show-availables-appointments-controller"));
var show_client_appointments_controller_1 = __importDefault(require("./controllers/show-client-appointments-controller"));
var show_profile_controller_1 = __importDefault(require("./controllers/show-profile-controller"));
var update_profile_controller_1 = __importDefault(require("./controllers/update-profile-controller"));
var auth_1 = __importDefault(require("./middlewares/auth"));
var validator_1 = require("./middlewares/validator");
var router = (0, express_1.Router)();
// Session routes 
router.post('/signup', (0, validator_1.validator)('CreateAccountSchema'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, create_account_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
router.post('/signin', (0, validator_1.validator)('CreateSessionSchema'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, create_session_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
// enable auth middleware
router.use(auth_1.default);
// Profile routes
router.get('/profile', function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, show_profile_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
router.put('/profile', (0, validator_1.validator)('UpdateAccountSchema'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, update_profile_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
// Appointments routes
router.get('/appointments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, show_client_appointments_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
router.get('/available-appointments', (0, validator_1.validator)('DateSchema'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, show_availables_appointments_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
router.post('/new-appointment', (0, validator_1.validator)('NewAppointmentSchema'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, new_appointment_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
router.put('/cancel-appointment', (0, validator_1.validator)('CancelAppointmentSchema'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, cancel_appointment_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
router.put('/confirm-appointment', (0, validator_1.validator)('ConfirmAppointmentSchema'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, confirm_appointment_controller_1.default.execute(req, res)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
exports.default = router;
//# sourceMappingURL=router.js.map