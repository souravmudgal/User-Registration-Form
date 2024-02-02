import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  name: string;
  age: string;
}

interface InitialState {
  loading: boolean;
  error: string | null;
  formDataList: FormData[];
}

const initialState: InitialState = {
  loading: false,
  error: null,
  formDataList: [],
};

const personalSlice = createSlice({
  name: "registerData",
  initialState,
  reducers: {
    setFormsData: (state, action: PayloadAction<FormData>) => {
      state.formDataList.push(action.payload);
    },
  },
});

export const { setFormsData } = personalSlice.actions;

export default personalSlice.reducer;
