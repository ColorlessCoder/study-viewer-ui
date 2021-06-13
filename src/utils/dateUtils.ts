import moment from "moment";

const DATE_FIELD_DATE_FORMAT = "yyyy-MM-DD"

export function dateFieldValueToMs(value: string): Date {
    return moment(value, DATE_FIELD_DATE_FORMAT).toDate()
}