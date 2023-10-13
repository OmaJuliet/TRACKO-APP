import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  appName: string;
}

const storedAppName = localStorage.getItem('appName');

const initialState: AppState = {
  appName: storedAppName || 'Mobile App',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
  },
});

export const { setAppName } = appSlice.actions;

export default appSlice.reducer;