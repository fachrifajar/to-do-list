import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListState {
  data: any;
}

const initialState: ListState = {
  data: null,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setList } = listSlice.actions;
export default listSlice.reducer;
