import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selected: number;
}

const initialState: InitialState = {
  selected: 0,
};

const GlobalCategory = createSlice({
  name: "GlobalCategory",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
  },
});

export const { setCategory } = GlobalCategory.actions;

export default GlobalCategory;
