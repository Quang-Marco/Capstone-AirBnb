import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viTriService } from "../services/viTri.service";
export const getViTriApi = createAsyncThunk("viTri/getViTriApi", async () => {
  const result = await viTriService.getLocations();
  return result.data.content;
});
export const updateLocation = createAsyncThunk(
  "viTri/updateLocation",
  async ({ id, data }) => {
    const result = await viTriService.updateLocation(
      id,
      data,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODA1NTExMCwiZXhwIjoxNzI4NjU5OTEwfQ.Sk89Y-mpYVXuVzZe8hoNeBwF35DzYt3WaF989BpHdrw"
    );
    return result.data.content;
  }
);

const initialState = { listViTri: [], updatingViTri: null };

const viTriSlice = createSlice({
  name: "viTri",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getViTriApi.fulfilled, (state, action) => {
      console.log("Call API Location thành công");
      state.listViTri = action.payload;
    });
    builder.addCase(getViTriApi.pending, () => {
      console.log("Đang chờ xử lý API Location");
    });
    builder.addCase(getViTriApi.rejected, () => {
      console.log("Call API Bị lỗi Location");
    });
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      console.log(action);
      console.log("Cập nhật vị trí thành công");

      state.listViTri = state.listViTri.map((vitri) => {
        vitri.id === action.payload.id ? action.payload : vitri;
      });
      state.updatingViTri = action.payload;
    });
    builder.addCase(updateLocation.pending, () => {
      console.log("Đang chờ xử lý cập nhật");
    });
  },
});

export const {} = viTriSlice.actions;

export default viTriSlice.reducer;
