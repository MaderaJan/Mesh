"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayBounds = getDayBounds;
function getDayBounds({ date = new Date() }) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return { startOfDay, endOfDay };
}
//# sourceMappingURL=dateUtils.js.map