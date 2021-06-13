import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, TextField } from "@material-ui/core";
import { PatientInt } from "../../types";
import { generateFullName } from "../../utils/stringUtils";
import { PatientService } from "../../services/PatientService";

interface PatientSearchProps {
    initialValue?: PatientInt | null,
    onChange: (value: PatientInt | null) => any,
    fullWidth?: boolean,
    autoFocus?: boolean,
    disabled?: boolean
}

function getLabelForOption(option: PatientInt) {
    return option.personCode + " " + generateFullName(option.firstName, option.lastName)
}

export function PatientSearch(props: PatientSearchProps) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<PatientInt[]>([]);
    const [queryString, setQueryString] = React.useState<string>(props.initialValue ? getLabelForOption(props.initialValue) : "");
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        if (open) {
            let active = true;

            if (!loading) {
                return undefined;
            }

            PatientService.getPatientForPicker(queryString)
                .then(res => active && (setOptions(res), setLoading(false)))
                .catch(() => setOptions([]))
            return () => {
                active = false;
            };
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        } else if (options.length === 0) {
            setLoading(true);
        }
        // eslint-disable-next-line
    }, [open]);

    React.useEffect(() => {
        if (open) {
            setLoading(true);
        }
        // eslint-disable-next-line
    }, [queryString]);

    const onSelectPatient = (option: PatientInt | null) => {
        setQueryString(option ? getLabelForOption(option) : "")
        props.onChange(option)
    }
    return (
        <Autocomplete
            fullWidth={props.fullWidth ? true : false}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.patientPk === value.patientPk}
            getOptionLabel={(option) => getLabelForOption(option)}
            options={options}
            loading={loading}
            defaultValue={props.initialValue}
            onChange={(e, value) => onSelectPatient(value)}
            noOptionsText="No Patient found."
            disabled={props.disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    autoFocus={props.autoFocus}
                    label="Find Patient"
                    placeholder="Find by code or name"
                    variant="outlined"
                    value={(queryString && !props.disabled) ? queryString : ""}
                    onChange={e => setQueryString(e.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}