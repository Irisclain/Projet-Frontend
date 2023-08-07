import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const currentRouteSlice = createSlice({
  name: 'currentRoute',
  initialState,
  reducers: {
    updateCurrentRoute: (state, action) => {
      state.value = action.payload;
      
    },
  },
});

export const { updateCurrentRoute } = currentRouteSlice.actions;
export default currentRouteSlice.reducer;
