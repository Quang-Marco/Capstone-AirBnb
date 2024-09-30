import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viTriService } from "../services/viTri.service";
export const getViTriApi = createAsyncThunk(
  "viTri/getViTriApi",
  async (_, ThunkAPI) => {
    const result = await viTriService.getViTri();
    return result.data.content;
  }
);
export const updateViTri = createAsyncThunk(
  "viTri/updateViTri",
  async ({ id, data }, ThunkAPI) => {
    const result = await viTriService.updateViTri(id, data);
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
      console.log("Call API user thành công");
      state.listViTri = action.payload;
    });
    builder.addCase(getViTriApi.pending, (state, action) => {
      console.log("Đang chờ xử lý API user");
    });
    builder.addCase(getViTriApi.rejected, (state, action) => {
      console.log("Call API Bị lỗi user");
    });
    builder.addCase(updateViTri.fulfilled, (state, action) => {
      console.log(action);
      console.log("Cập nhật người dùng thành công");

      state.listUsers = state.listUsers.map((user) => {
        user.id === action.payload.id ? action.payload : user;
      });
      state.updatingViTri = action.payload;
    });
    builder.addCase(updateViTri.pending, () => {
      console.log("Đang chờ xử lý cập nhật");
    });
  },
});

export const {} = viTriSlice.actions;

export default viTriSlice.reducer;
