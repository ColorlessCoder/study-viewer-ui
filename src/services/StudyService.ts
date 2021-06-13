import { StudyInt } from "../types";
import HttpService from "./HttpService";

export class StudyService {
    static getAllStudies = async (): Promise<StudyInt[]> => {
        return await HttpService.get("/studies", {}, true) as StudyInt[]
    }

    static createStudy = async (study: StudyInt): Promise<StudyInt> => {
        return await HttpService.post("/studies", {}, study, true) as StudyInt
    }

    static updateStudy = async (study: StudyInt): Promise<StudyInt> => {
        return await HttpService.put("/studies", {}, study, true) as StudyInt
    }

    static deleteStudies = async (studies: StudyInt[]): Promise<number[]> => {
        return await HttpService.put("/studies/delete-batch", {}, studies.map(r => r.studyPk), true) as number[]
    }
}