import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reservationData: {
      nom: "",
      arrival: "",
      departure: "",
      price: "",
      status: "",
      distribution: "",
    },
    selectedDate: null,
    currentTask: {
      start: "",
      end: "",
      status: "",
      tache: "",
    },
  };

export const currentReservationSlice = createSlice({
  name: 'currentReservation',
  initialState,
  reducers: {
    updateCurrentReservation: (state, action) => {
      state.reservationData = action.payload;
    },
    updateSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    updateCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
  },
});

export const { updateCurrentReservation, updateSelectedDate, updateCurrentTask } = currentReservationSlice.actions;
export default currentReservationSlice.reducer;
