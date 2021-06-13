import { Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";
import _ from "lodash";
import { useState } from "react";
import { PatientInt } from "../../types";
import PatientDetails from "./PatientDetails";
import { PatientSearch } from "./PatientSearch";

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        defaultMargin: {
            marginTop: 10
        }
    })
)

interface PatientFinderProps {
    initialPatient?: PatientInt| null,
    onChange?: (patient: PatientInt| null) => any,
}
export default function PatientFinder(props: PatientFinderProps) {
    const { onChange } = props
    const [initialPatient] = useState<PatientInt | null>(props.initialPatient ? props.initialPatient: null)
    const [patient, setPatientState] = useState<PatientInt | null>(initialPatient)
    const [creating, setCreating] = useState<boolean>(false)
    const [lastEnteredPatient, setLastEnteredPatient] = useState<PatientInt | null>(null)
    const classes = useStyle()

    const handleCreateClicked = () => {
        setCreating(true)
        setLastEnteredPatient(_.cloneDeep(patient))
        setPatient({
            patientPk: 0,
            personCode: "",
            firstName: "",
            lastName: "",
            dateOfBirth: null
        })
    }

    const cancelChanges = () => {
        setCreating(false)
        setPatient(lastEnteredPatient)
    }

    const setPatient = (patientArg: PatientInt | null) => {
        setPatientState(patientArg)
        if (onChange) {
            onChange(patientArg);
        }
    }

    return <div>
        <PatientSearch initialValue={initialPatient} onChange={setPatient} disabled={creating} />
        <Grid container alignItems="center" justify="center">
            <Grid item>
                {!creating && <Button
                    startIcon={<Add />}
                    style={{ background: "#4caf50", fontWeight: "bold" }}
                    className={classes.defaultMargin}
                    onClick={handleCreateClicked}>
                    New Patient
                </Button>}
                {creating && <Button
                    startIcon={<Cancel />}
                    color="secondary"
                    className={classes.defaultMargin}
                    onClick={cancelChanges}
                    variant="contained">
                    Cancel
                </Button>}
            </Grid>
        </Grid>
        <PatientDetails patient={patient} editable={creating} onChange={setPatient}/>
    </div>
}