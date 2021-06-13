import { ColDef } from 'ag-grid-community'
import _ from 'lodash'

export const getValue = (data: any, field: string) => _.get(data, field, null)

export const getValueByColumn = (data: any, column: ColDef) => {    
    let value = null
    const field = _.get(column, 'field', null)
    if(field) {
        value = _.get(data, field, null)
    }
    return value
}