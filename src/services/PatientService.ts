import { PatientInt } from "../types";
import HttpService from "./HttpService";
const esc = encodeURIComponent;

export class PatientService {
    static getPatientForPicker = async (query: string): Promise<PatientInt[]> => {
        return await HttpService.get(`/patients/picker?query=${esc(query)}&limit=10`, {}, true) as PatientInt[]
    }
}