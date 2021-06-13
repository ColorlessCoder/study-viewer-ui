import { ColDef } from "ag-grid-community";
import moment from "moment";
import { getValueByColumn } from "../utils/utils";

const DATE_FORMAT = "DD-MMM-yyyy";

const DateType: ColDef = {
    filter: 'agDateColumnFilter',
    valueGetter: (params) => {
        let value = getValueByColumn(params.data, params.colDef)
        return value === null ? value: moment(value).format(DATE_FORMAT)
    },
    filterParams: {
        comparator: function (filterLocalDateAtMidnight: Date, cellValue: any) {
            let cellDate = new Date(cellValue);
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
export default DateType;