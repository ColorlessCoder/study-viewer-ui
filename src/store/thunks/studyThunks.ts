import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { StudyService } from "../../services/StudyService";
import { StudyInt } from "../../types";

const sliceName = 'study'

export const loadAllStudies = createAsyncThunk(
    sliceName + "/getAll",
    async (_, {getState}) => {
        let state = getState() as RootState;
        let response = state.study.studies
        if(state.study.studiesLoaded === false) {
            response = await StudyService.getAllStudies()
        }
        return response
    }
);

export const createStudy = createAsyncThunk(
    sliceName + "/createStudy",
    async (study: StudyInt) => {
        return await StudyService.createStudy(study)
    }
);

export const updateStudy = createAsyncThunk(
    sliceName + "/updateStudy",
    async (study: StudyInt) => {
        return await StudyService.updateStudy(study)
    }
);

export const deleteStudies = createAsyncThunk(
    sliceName + "/deleteStudies",
    async (studies: StudyInt[]) => {
        return StudyService.deleteStudies(studies)
    }
);