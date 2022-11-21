import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: '',
});

export const fetchData = createAsyncThunk(
  'fetchData',
  async (header) => {
    const response = await axios.get(routes.dataPath(), { headers: header });
    return response.data;
  },
);

export const getAuthHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: ((state, action) => {
      const id = action.payload;
      channelsAdapter.removeOne(state, id);
      if (id === state.currentChannelId) {
        state.currentChannelId = 1;
      }
    }),
    updateChannel: channelsAdapter.updateOne,
    setCurrentId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannelId = currentChannelId;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
