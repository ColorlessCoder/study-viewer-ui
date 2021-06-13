import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { StudyInt } from '../../types';
import { createStudy, deleteStudies, loadAllStudies, updateStudy } from '../thunks/studyThunks';
const studySlice = createSlice({
  name: 'study',
  initialState: {
    studies: [] as StudyInt[],
    studiesLoaded: false,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllStudies.fulfilled, (state, action) => {
      state.studies = action.payload
      state.studiesLoaded = true
    });
    builder.addCase(loadAllStudies.rejected, (_state, action) => {
      throw action.error
    });
    builder.addCase(createStudy.fulfilled, (state, action) => {
      if (action.payload) {
        state.studies.push(action.payload)
      }
    });
    builder.addCase(createStudy.rejected, (_state, action) => {
      throw action.error
    });
    builder.addCase(updateStudy.fulfilled, (state, action) => {
      if (action.payload) {
        const study = state.studies.find(r => r.studyPk === action.payload.studyPk)
        if (study) {
          _.merge(study, action.payload)
        }
      }
    });
    builder.addCase(updateStudy.rejected, (_state, action) => {
      throw action.error
    });
    builder.addCase(deleteStudies.fulfilled, (state, action) => {
      if (action.payload) {
        const deletedPks = new Set<number>(action.payload)
        state.studies = state.studies.filter(r => !deletedPks.has(r.studyPk))
      }
    });
    builder.addCase(deleteStudies.rejected, (_state, action) => {
      throw action.error
    });
  }
})

export const workLogActions = studySlice.actions

export default studySlice.reducer