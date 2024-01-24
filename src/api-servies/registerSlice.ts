// personalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  name: string;
  age: string;
  // Add more fields as needed
}

interface InitialState {
  loading: boolean;
  error: string | null;
  formDataList: FormData[]; // Change to an array of FormData
}

const initialState: InitialState = {
  loading: false,
  error: null,
  formDataList: [], // Initialize formDataList as an empty array
};

const personalSlice = createSlice({
  name: "registerData",
  initialState,
  reducers: {
    setFormsData: (state, action: PayloadAction<FormData>) => {
      state.formDataList.push(action.payload); // Add the new form data to the list
    },
  },
});

export const { setFormsData } = personalSlice.actions;

export default personalSlice.reducer;
