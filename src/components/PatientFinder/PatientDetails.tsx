import 'date-fns';
import { createStyles, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import _ from "lodash";
import { PatientInt } from "../../types";
import DateFnsUtils from '@date-io/date-fns';
import { deNullString, generateFullName } from "../../utils/stringUtils";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputField: {
            marginTop: theme.spacing(1.5)
        }
    })
)

interface PatientDetailsProps {
    patient?: PatientInt|null,
    editable?: boolean,
    onChange?: (patient: PatientInt) => any
}

export default function PatientDetails(props: PatientDetailsProps) {
    const { patient, editable, onChange } = props
    const classes = useStyles()
    const personCode = deNullString(patient?.personCode)
    const firstName = deNullString(patient?.firstName)
    const lastName = deNullString(patient?.lastName)
    const dateOfBirth = (patient?.dateOfBirth) ? new Date(patient.dateOfBirth) : null
    const setPatient = <T extends keyof PatientInt>(key: T, value: PatientInt[T]) => {
        if (onChange && patient) {
            const clonedPatient = _.cloneDeep(patient)
            clonedPatient[key] = value
            onChange(clonedPatient)
        }
    }

    const setPersonCode = (value: string) => {
        setPatient("personCode", value)
    }
    const setFirstName = (value: string) => {
        setPatient("firstName", value)
    }
    const setLastName = (value: string) => {
        setPatient("lastName", value)
    }
    const setDateOfBirth = (date: Date | null) => {
        setPatient("dateOfBirth", date ? date.getTime() : null)
    }
    return <div>
        <TextField
            label="Patient Code"
            value={personCode}
            onChange={(e) => setPersonCode(e.target.value)}
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 30 }}
            disabled={!editable}
            required={editable}
            className={classes.inputField}
        />
        {!editable && <TextField
            label="Full Name"
            value={generateFullName(firstName, lastName)}
            variant="outlined"
            fullWidth
            disabled={true}
            className={classes.inputField}
        />}
        {editable && <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 50 }}
                    required={editable}
                    className={classes.inputField}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 50 }}
                    required={editable}
                    className={classes.inputField}
                />
            </Grid>
        </Grid>}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                label="Date of Birth"
                value={dateOfBirth}
                format="MM/dd/yyyy"
                onChange={setDateOfBirth}
                className={classes.inputField}
                KeyboardButtonProps={{
                    'aria-label': 'birth date',
                }}
                inputVariant="outlined"
                fullWidth
                disabled={!editable}
                required={editable}
            />
        </MuiPickersUtilsProvider>
    </div>
}