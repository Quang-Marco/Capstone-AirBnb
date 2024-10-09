import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/user.service";

export const getValueUserApi = createAsyncThunk(
  "user/getValueUserApi",
  async () => {
    const result = await userService.getUsers();
    console.log(result.data.content);
    return result.data.content;
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }) => {
    const result = await userService.updateUser(userId, userData);
    return result.data.content;
  }
);
const initialState = {
  listUsers: [],
  updatingUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueUserApi.fulfilled, (state, action) => {
      console.log("Call API user thành công");
      state.listUsers = action.payload;
    });
    builder.addCase(getValueUserApi.pending, () => {
      console.log("Đang chờ xử lý API user");
    });
    builder.addCase(getValueUserApi.rejected, () => {
      console.log("Call API Bị lỗi user");
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action);
      console.log("Cập nhật người dùng thành công");
      // Cập nhật danh sách người dùng với dữ liệu mới
      state.listUsers = state.listUsers.map((user) => {
        user.id === action.payload.id ? action.payload : user;
      });
      state.updatingUser = action.payload;
    });
    builder.addCase(updateUser.pending, () => {
      console.log("Đang chờ xử lý cập nhật");
      // console.log(action);
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
