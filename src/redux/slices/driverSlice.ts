import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  latitude: number;
  longitude: number;
}

interface DriverState {
  isOnline: boolean;
  currentLocation: Location | null;
  status: 'idle' | 'busy' | 'offline';
  currentTrip: any | null;
  earnings: {
    today: number;
    total: number;
  };
}

const initialState: DriverState = {
  isOnline: false,
  currentLocation: null,
  status: 'offline',
  currentTrip: null,
  earnings: {
    today: 0,
    total: 0,
  },
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
      state.status = action.payload ? 'idle' : 'offline';
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
    setDriverStatus: (
      state,
      action: PayloadAction<'idle' | 'busy' | 'offline'>,
    ) => {
      state.status = action.payload;
    },
    setCurrentTrip: (state, action: PayloadAction<any>) => {
      state.currentTrip = action.payload;
      state.status = action.payload ? 'busy' : 'idle';
    },
    updateEarnings: (
      state,
      action: PayloadAction<{ today: number; total: number }>,
    ) => {
      state.earnings = action.payload;
    },
    resetDriverState: () => initialState,
  },
});

export const {
  setOnlineStatus,
  updateLocation,
  setDriverStatus,
  setCurrentTrip,
  updateEarnings,
  resetDriverState,
} = driverSlice.actions;

export default driverSlice.reducer;
