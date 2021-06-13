import { ColDef } from "ag-grid-community"
import DateType from "./date"
import DateTimeType from "./dateTime"

export type GridDataType = "date"| 'date-time'

interface ColumnTypesInt {
    dateColumn: ColDef,
    dateTimeColumn: ColDef
}

const columnTypes: ColumnTypesInt = {
    dateColumn: DateType,
    dateTimeColumn: DateTimeType
}

export const getColumnTypeByDataType = (dataType: GridDataType): keyof ColumnTypesInt => {
    switch(dataType) {
        case "date":
            return "dateColumn"
        case "date-time":
            return "dateTimeColumn"
    }
}

export default columnTypes