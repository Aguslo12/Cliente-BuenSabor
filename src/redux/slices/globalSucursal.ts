import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selected: number;
}

const initialState: InitialState = {
  selected: 0,
};

const GlobalSucursal = createSlice({
  name: "GlobalSucursal",
  initialState,
  reducers: {
    setGlobalSucursal: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
  },
});

export const { setGlobalSucursal } = GlobalSucursal.actions;

export default GlobalSucursal;
