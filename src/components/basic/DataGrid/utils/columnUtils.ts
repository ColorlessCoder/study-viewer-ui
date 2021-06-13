import _ from "lodash"
import { EnhancedColDef } from ".."
import { getColumnTypeByDataType } from "../dataTypes"
import { getValueByColumn } from "./utils"

export function enhanceColumn(column: EnhancedColDef): EnhancedColDef {
    const clonedColumn = _.cloneDeep(column)
    setTypeByDataType(clonedColumn);
    setValueGetter(clonedColumn)
    return clonedColumn;
}

export function setTypeByDataType(column: EnhancedColDef) {
    const types = []
    const dataType = column.dataType
    if (dataType) {
        if (column.type) {
            if (typeof column.type === 'string') {
                types.push(column.type)
            } else {
                types.push(...column.type)
            }
        }
        types.push(getColumnTypeByDataType(dataType))
        column.type = types
    }
}

export function setValueGetter(column: EnhancedColDef) {
    const nested = column.field?.indexOf('.') !== -1
    if (!column.type && !column.valueGetter && nested) {
        column.valueGetter = (params) => getValueByColumn(params.data, params.colDef)
    }
}