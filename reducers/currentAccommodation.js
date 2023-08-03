import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //value: {id:null, name:null, picture:null, name:null },
  value: {},
};

export const currentAccommodationSlice = createSlice({
  name: 'currentAccommodation',
  initialState,
  reducers: {
    updateCurrentAccommodation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateCurrentAccommodation } = currentAccommodationSlice.actions;
export default currentAccommodationSlice.reducer;
