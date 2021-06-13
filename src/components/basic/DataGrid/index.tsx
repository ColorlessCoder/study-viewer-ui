import { ColDef, GetRowNodeIdFunc, GridApi, GridOptions, GridReadyEvent } from "ag-grid-community";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import _ from 'lodash'
import RowMenu, { RowMenuInt } from "./frameworkComponents/RowMenu";
import dataTypes, { GridDataType } from "./dataTypes";
import { enhanceColumn } from "./utils/columnUtils";
import Toolbar, { ToolbarButtonInt } from "./Toolbar";
import { useState } from "react";

const defaultOptionalColumnProps: ColDef = {
    width: 50,
    pinned: true,
    filter: false,
    sortable: false,
    resizable: false,
    floatingFilter: false,
    editable: false,
}

export interface DataGridProps extends GridOptions {
    id: string,
    height: string,
    width: string,
    columns: ColDef[],
    checkboxInStart?: boolean,
    showRowMenu?: boolean,
    rowMenus?: RowMenuInt[]
    getRowNodeId: GetRowNodeIdFunc,
    showToolbar?: boolean,
    toolbarButtons?: ToolbarButtonInt[]
}

export interface EnhancedColDef extends ColDef {
    dataType?: GridDataType
}

export default function DataGrid(props: DataGridProps) {
    const [gridApi, setGridApi] = useState<GridApi>();
    const frameworkComponents = _.clone<any>(_.get(props, 'frameworkComponents', {}))
    const CellRenderedName = { RowMenu: 'rowMenu' }
    frameworkComponents[CellRenderedName.RowMenu] = RowMenu
    const columns = props.columns.map(enhanceColumn);

    const onGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api);
        if (props.onGridReady) {
            props.onGridReady(params)
        }
    };

    return <div
        id={props.id}
        style={{
            height: props.height,
            width: props.width,
            display: 'flex',
            flexDirection: 'column'
        }}
        className="ag-theme-alpine-dark"
    >
        {props.showToolbar && <Toolbar gridApi={gridApi} buttons={props.toolbarButtons}/>}
        <AgGridReact
            {...props}
            frameworkComponents={frameworkComponents}
            immutableData
            getRowNodeId={props.getRowNodeId}
            columnTypes={_.merge({}, dataTypes, props.columnTypes)}
            onGridReady={onGridReady}
            containerStyle={{flexGrow: 1}}
        >
            {props.checkboxInStart && <AgGridColumn
                {...defaultOptionalColumnProps}
                checkboxSelection={true} headerCheckboxSelection headerCheckboxSelectionFilteredOnly
            />}
            {
                props.showRowMenu && <AgGridColumn
                    {...defaultOptionalColumnProps}
                    cellStyle={{ textAlign: 'center' }}
                    cellRenderer={CellRenderedName.RowMenu}
                    cellRendererParams={{ menuItems: props.rowMenus }}
                />
            }
            {columns.map((c, i) => <AgGridColumn key={i} {...c} />)}
        </AgGridReact>
    </div>
}