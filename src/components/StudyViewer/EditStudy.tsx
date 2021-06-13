import { Dialog, DialogContent, DialogActions, Button, TextField, makeStyles, createStyles, Theme } from "@material-ui/core";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { Fragment } from "react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { createStudy, updateStudy } from "../../store/thunks/studyThunks";
import { PatientInt, StudyInt } from "../../types";
import { isMobile } from "../../utils/deviceUtils";
import { deNullString } from "../../utils/stringUtils";
import DialogHeader from "../basic/DialogHeader";
import PatientFinder from "../PatientFinder";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputField: {
            marginTop: theme.spacing(1.5)
        }
    })
)

interface EditStudyProps {
    onClose: () => any,
    study?: StudyInt
}

export default function EditStudy(props: EditStudyProps) {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const { study, onClose } = props;
    const create = !Boolean(study)
    const title = create ? "Create Study" : "Edit Study";
    const [studyName, setStudyName] = useState<string>(deNullString(study?.studyName))
    const [studyDescription, setStudyDescription] = useState<string>(deNullString(study?.studyDescription))
    const [patient, setPatient] = useState<PatientInt | null>(study ? study.patient : null)
    const dispatch = useAppDispatch()

    const handleSave = () => {
        const updatedStudy = getUpdatedStudy()
        const thunk = create ? createStudy(updatedStudy): updateStudy(updatedStudy) 
        dispatch(thunk)
            .then(onSuccess)
            .catch(onError)
    }

    const onSuccess = () => {
        enqueueSnackbar(`Successfully ${create ? "created": "updated"}.`, { variant: "success"})
        onClose()
    }

    const onError = (err:any) => enqueueSnackbar(err.message, { variant: "error"})

    const mobile = isMobile()

    const getUpdatedStudy = () => {
        return _.merge({}, study, { studyName, studyDescription, patient })
    }
    return <Fragment>
        <Dialog onClose={onClose} aria-labelledby="edit-study-dialog-title" open={true} maxWidth="sm" fullWidth fullScreen={mobile}>
            <DialogHeader id="edit-study-dialog-title" onClose={onClose} title={title} />
            <DialogContent dividers>
                <PatientFinder initialPatient={patient} onChange={setPatient} />
                <TextField
                    label="Study Name"
                    value={studyName}
                    onChange={(e) => setStudyName(e.target.value)}
                    required
                    variant="outlined"
                    fullWidth
                    className={classes.inputField}
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    label="Study Description"
                    value={studyDescription}
                    onChange={(e) => setStudyDescription(e.target.value)}
                    variant="outlined"
                    fullWidth
                    multiline
                    className={classes.inputField}
                    inputProps={{ maxLength: 200 }}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleSave} color="primary" variant="contained" fullWidth={mobile}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}