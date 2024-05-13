import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {
  ConnectedDevice,
  DeviceLayerMap,
  Keymap,
  Layer,
} from '../types/types';
import type {AppThunk, RootState} from './index';
import {
  getDefinitions,
  getSelectedDefinition,
  getSelectedKeyDefinitions,
} from './definitionsSlice';
import {
  getSelectedConnectedDevice,
  getSelectedDevicePath,
  getSelectedKeyboardAPI,
  selectDevice,
} from './devicesSlice';
import {KeyboardAPI} from 'src/utils/keyboard-api';

interface KeySettings {
  actuationLevel: number;
  releaseLevel: number;
  actuationMode: number;
  deadzone: number;
  rapidTriggerRelease: number;
  rapidTriggerActuation: number;
}

interface HallEffectSettingsState {
  keySettings: { [keyId: string]: KeySettings };
  selectedKey: string | null; // convert into array of strings to select and edit multiple keys concurrently
}

const initialState: HallEffectSettingsState = {
  keySettings: {},
  selectedKey: null,
};



const analogSlice = createSlice({
  name: 'analog',
  initialState,
  reducers: {
    loadDataSuccess: (state, action: PayloadAction<number[]>) => {
      state.analogValues = action.payload;
      state.isLoaded = true;
    },
    setSelectedSensor: (state, action: PayloadAction<number | null>) => {
      state.selectedSensorIndex = action.payload;
    },
    clearData: (state) => {
      state.analogValues = [];
      state.isLoaded = false;
    },
    setConfigureKeyboardIsSelectable: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.configureKeyboardIsSelectable = action.payload;
    },
  }
});

export const { loadDataSuccess, setSelectedSensor, clearData } = analogDataSlice.actions;
export default analogDataSlice.reducer;

export const fetchAnalogData = (): AppThunk => async (dispatch, getState) => {
  try {
    const api = getSelectedKeyboardAPI(getState()); // Assuming similar API usage
    const data = await api.readAnalogData();
    dispatch(loadDataSuccess(data));
  } catch (error) {
    console.error('Failed to fetch analog data:', error);
    // Handle errors possibly by dispatching another action
  }
};

export const getAnalogValues = (state: RootState) => state.analogData.analogValues;
export const getIsLoaded = (state: RootState) => state.analogData.isLoaded;
export const getSelectedSensorIndex = (state: RootState) => state.analogData.selectedSensorIndex;
