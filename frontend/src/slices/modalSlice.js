import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    channel: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { type, channel } = action.payload;
      state.type = type;
      state.channel = channel;
    },
    closeModal: (state) => {
      state.type = null;
      state.channel = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
