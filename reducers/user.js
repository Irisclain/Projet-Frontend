import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);  
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
