import { ColDef } from "ag-grid-community";
import moment from "moment";
import _ from 'lodash'

const DATE_TIME_FORMAT = "DD-MMM-yyyy HH:mm";
const DATE_FORMAT = "DD-MMM-yyyy HH:mm";

const DateTimeType: ColDef = {
    filter: 'agDateColumnFilter',
    valueGetter: (params) => {
        let value = null
        const field = _.get(params.colDef, 'field', '')
        if(field) {
            value = _.get(params.data, field, null)
        }        
        return value === null ? value: moment(value).format(DATE_TIME_FORMAT)
    },
    filterParams: {
        comparator: function (filterLocalDateAtMidnight: Date, cellValue: any) {
            let cellDate = moment(moment(cellValue).format(DATE_FORMAT), DATE_FORMAT).toDate();
            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            } else {
                return 0;
            }
        },
    },
};
export default DateTimeType;