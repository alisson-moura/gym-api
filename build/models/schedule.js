"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
var Schedule = /** @class */ (function () {
    function Schedule() {
        this.days = ['seg', 'ter', 'qua', 'qui', 'sex'];
        this.hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        this.limit = 20;
        this.duration = '01:00';
        this.start = '07:00';
        this.end = '20:00';
    }
    return Schedule;
}());
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.js.map