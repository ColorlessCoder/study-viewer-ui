export interface StudyInt {
    studyName: string,
    studyDescription?: string,
    modifiedAt?: number, // optional as will be populated it in server
    studyPk: number,
    patient: PatientInt
}

export interface PatientInt {
    patientPk: number,
    personCode: string,
    firstName: string,
    lastName: string,
    dateOfBirth: number| null
}