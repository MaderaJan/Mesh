import { getDayBounds } from "../dateUtils";

describe('Date utils tests', () => {
    test('date gives bounds for default', () => {
        const { startOfDay, endOfDay } = getDayBounds({});
        const currentDate = new Date()

        compareDates(currentDate, startOfDay, endOfDay)
    })

     test('date gives bounds for provided date', () => {
        const modifiedDate = new Date(2020, 1, 1);
        const { startOfDay, endOfDay } = getDayBounds({date: modifiedDate});

        compareDates(modifiedDate, startOfDay, endOfDay);
    })
})

function compareDates(modifiedDate: Date, startOfDay: Date, endOfDay: Date) {
    expect(modifiedDate.getFullYear()).toEqual(startOfDay.getFullYear());
    expect(modifiedDate.getMonth()).toEqual(startOfDay.getMonth());
    expect(modifiedDate.getDay()).toEqual(startOfDay.getDay());

    expect(startOfDay.getHours()).toEqual(0);
    expect(startOfDay.getMinutes()).toEqual(0);
    expect(startOfDay.getSeconds()).toEqual(0);

    expect(endOfDay.getHours()).toEqual(23);
    expect(endOfDay.getMinutes()).toEqual(59);
    expect(endOfDay.getSeconds()).toEqual(59);
}
