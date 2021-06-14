import { Edit, Delete, Add } from "@material-ui/icons";
import {  GridApi, GridReadyEvent } from "ag-grid-community";
import { useSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { deleteStudies, loadAllStudies } from "../../store/thunks/studyThunks";
import { StudyInt } from "../../types";
import { compareNumber } from "../../utils/numberUtils";
import { generateFullName } from "../../utils/stringUtils";
import DataGrid, { EnhancedColDef } from "../basic/DataGrid";
import EditStudy from "./EditStudy";

const columns: EnhancedColDef[] = [
    {
        headerName: "Person Code",
        field: "patient.personCode",
        minWidth: 100,
    },
    {
        headerName: "Patient's Full Name",
        field: "patient.fullName",
        valueGetter: (params) => generateFullName(params.data.patient.firstName, params.data.patient.lastName)
    },
    {
        headerName: "Patient's Date of Birth",
        field: "patient.dateOfBirth",
        dataType: "date",
    },
    {
        headerName: "Study Name",
        field: "studyName"
    },
    {
        headerName: "Study Description",
        field: "studyDescription"
    },
    {
        headerName: 'Study Creation/Update Datetime',
        minWidth: 300,
        field: "modifiedAt",
        dataType: 'date-time'
    },
];

const defaultSortForStudies = (studies: StudyInt[]) => {
    return [...studies].sort((a,b) => -compareNumber(a.modifiedAt, b.modifiedAt))
}

export default function StudyList() {
    const studiesFromStore = useAppSelector(state => state.study.studies)
    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar()
    const [editing, setEditing] = useState<boolean>(false)
    const [currentStudy, setCurrentStudy] =  useState<StudyInt>()
    const sortedStudies = defaultSortForStudies(studiesFromStore)

    const onGridReady = (params: GridReadyEvent) => {
        dispatch(loadAllStudies())
            .catch(err => enqueueSnackbar(err.message, { variant: "error"}))
    };

    const createStudy = () => {
        setCurrentStudy(undefined)
        setEditing(true)
    }

    const editStudy = (study: StudyInt) => {
        setCurrentStudy(study)
        setEditing(true)
    }

    const closeEditing = () => {
        setCurrentStudy(undefined)
        setEditing(false)
    }

    const handleDelete = (studies: StudyInt[]) => {
        if(studies.length) {
            let accepted = window.confirm("Are you sure? Action cannot be undone.")
            if(accepted) {
                dispatch(deleteStudies(studies))
                    .then(() => enqueueSnackbar("Successfully deleted.", { variant: "success"}))
                    .catch((err) => enqueueSnackbar(err.message, { variant: "error"}))
            }
        } else {
            enqueueSnackbar("Please select one or more studies.", { variant: "info"})
        }
    }

    return <Fragment>
        <DataGrid
            id="study-list"
            width="100%"
            height="100%"
            checkboxInStart
            showRowMenu
            rowMenus={[{
                label: "Edit",
                icon: () => <Edit color="primary" />,
                onClick: (param) => editStudy(param.data)
            }, {
                label: "Delete",
                icon: () => <Delete color="secondary" />,
                onClick: (param) => handleDelete([param.data])
            }]}
            defaultColDef={{
                resizable: true,
                sortable: true,
                filter: true,
                floatingFilter: true,
                filterParams: { buttons: ['reset'] }
            }}
            enableRangeSelection={true}
            onGridReady={onGridReady}
            rowData={sortedStudies}
            rowSelection="multiple"
            columns={columns}
            getRowNodeId={data => data.studyPk}
            showToolbar={true}
            headerTitle="Patient Study Viewer"
            toolbarButtons={[
                {
                    label: "Delete Selected Study",
                    onClick: (param: GridApi) => handleDelete(param.getSelectedRows()),
                    icon: () => <Delete />,
                    color: "secondary",
                },{
                    label: "Create Study",
                    onClick: (param: GridApi) => createStudy(),
                    icon: () => <Add />,
                    style: { background: "#4caf50"}
                },
            ]}
        />
        {editing && <EditStudy onClose={closeEditing} study={currentStudy}/>}
    </Fragment>;
}