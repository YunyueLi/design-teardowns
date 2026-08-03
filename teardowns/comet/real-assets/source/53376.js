// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
export var Weekday;
(function (Weekday) {
    Weekday[Weekday["MONDAY"] = 1] = "MONDAY";
    Weekday[Weekday["TUESDAY"] = 2] = "TUESDAY";
    Weekday[Weekday["WEDNESDAY"] = 3] = "WEDNESDAY";
    Weekday[Weekday["THURSDAY"] = 4] = "THURSDAY";
    Weekday[Weekday["FRIDAY"] = 5] = "FRIDAY";
    Weekday[Weekday["SATURDAY"] = 6] = "SATURDAY";
    Weekday[Weekday["SUNDAY"] = 0] = "SUNDAY";
})(Weekday || (Weekday = {}));
export const hoursToMinutes = (hours) => hours * 60;
export const ms = (time) => time;
export const asMs = (time) => time;
export const perMs = (amount) => 1 / amount;
export const seconds = (time) => time * 1000;
export const asSeconds = (time) => time / 1000;
export const perSecond = (amount) => 1000 / amount;
export const minutes = (time) => time * 60000;
export const asMinutes = (time) => time / 60000;
export const perMinute = (amount) => 60000 / amount;
export const hours = (time) => time * 3600000;
export const asHours = (time) => time / 3600000;
export const perHour = (amount) => 3600000 / amount;
export const days = (time) => time * 86400000;
export const asDays = (time) => time / 86400000;
export const perDay = (amount) => 86400000 / amount;
export const weeks = (time) => time * 604800000;
export const asWeek = (time) => time / 604800000;
export const perWeek = (amount) => 604800000 / amount;
// a month equals to 30 days
export const months = (time) => time * 2592000000;
export const asMonths = (time) => time / 2592000000;
export const perMonth = (amount) => 2592000000 / amount;
// an year equals to 365 days
export const years = (time) => time * 31536000000;
export const asYears = (time) => time / 31536000000;
export const perYear = (amount) => 31536000000 / amount;
/**
 * Check unix timestamp
 * @param time - Count of milliseconds from start Unix epoch
 * @returns Is valid?
 */
export const checkTimestampValid = (time) => Number.isInteger(time) || time instanceof Date;
/**
 * Round down timestamp to day start by local timezone
 * @param time - Count of milliseconds from start Unix epoch
 * @returns Count of milliseconds from start Unix epoch
 */
export const roundDownDay = (time) => {
    if (!checkTimestampValid(time))
        return null;
    const date = new Date(time);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
};
/**
 * Returns difference in days between from point and to point
 * Params are in milliseconds
 * @returns result in days
 * */
export const getDiffInDays = (from, to) => {
    if (!checkTimestampValid(from) || !checkTimestampValid(to))
        return null;
    return Math.floor(asDays(to - from));
};
/**
 * Returns difference in minutes between from point and to point
 * Params are in milliseconds
 * @returns result in minutes
 * */
export const getDiffInMinutes = (from, to) => {
    if (!checkTimestampValid(from) || !checkTimestampValid(to))
        return null;
    return Math.floor(asMinutes(to - from));
};
/**
 * Returns difference in seconds between from point and to point
 * Params are in milliseconds.
 * @returns result in seconds
 * */
export const getDiffInSeconds = (from, to) => {
    if (!checkTimestampValid(from) || !checkTimestampValid(to))
        return null;
    return Math.floor(asSeconds(to - from));
};
/**
 * Create Time of string view
 * @param time - string view for Time
 * @returns Time object by string view
 */
export const stringToTime = (time) => {
    if (!/^\d{1,2}:\d{1,2}$/.test(time)) {
        return null;
    }
    const [hours, minutes] = time.split(":").map((it) => Number.parseInt(it, 10));
    if (hours === undefined || minutes === undefined)
        return null;
    if (hours < 0 || hours > 24 || minutes < 0 || minutes > 60)
        return null;
    return { hours, minutes };
};
/**
 * Create Weekday of string view
 * @param weekday - string view of Weekday
 * @returns Weekday object by string view
 */
export const stringToWeekday = (weekday) => {
    switch (weekday) {
        case "Mon":
        case "Monday":
            return Weekday.MONDAY;
        case "Tue":
        case "Tuesday":
            return Weekday.TUESDAY;
        case "Wed":
        case "Wednesday":
            return Weekday.WEDNESDAY;
        case "Thu":
        case "Thursday":
            return Weekday.THURSDAY;
        case "Fri":
        case "Friday":
            return Weekday.FRIDAY;
        case "Sat":
        case "Saturday":
            return Weekday.SATURDAY;
        case "Sun":
        case "Sunday":
            return Weekday.SUNDAY;
        default:
            return null;
    }
};
/**
 * Get boolean proof that date hours in range [includes border values]
 * @param from - hour start range [included in range]
 * @param to - end range hour [included in range]
 * @param date - date which hours must be checked
 * @returns are date hours more than _from_ and less than _to_
 */
export const areHoursBetween = (from, to, date = new Date()) => {
    if (from > to)
        throw new Error("from must be less than to");
    const dateHours = date.getHours();
    return dateHours >= from && dateHours <= to;
};
/**
 * Get boolean proof that date in time range
 * @param from - start range time
 * @param to - end range time
 * @param date - date which time must be checked
 * @returns are date times more than _from_ and less than _to_
 */
export const areTimeBetween = (from, to, date = new Date()) => {
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();
    if (dateHours < from.hours || dateHours > to.hours) {
        return false;
    }
    if (dateHours === from.hours && dateMinutes < from.minutes) {
        return false;
    }
    if (dateHours === to.hours && dateMinutes > from.minutes) {
        return false;
    }
    return true;
};
