import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { datPhongService } from "../services/datPhong.service";

export const getBookedRoomApi = createAsyncThunk(
  "bookedRoom/getBookedRoomApi",
  async () => {
    const result = await datPhongService.getPhongDaDat();
    return result.data.content;
    //convert date ở đây
  }
);

export const updateBookedRoom = createAsyncThunk(
  "bookedRoom/updateBookedRoom",
  async ({ roomId, roomData }) => {
    const result = await datPhongService.updateRoomBooked(roomId, roomData);
    return result.data.content;
  }
);
const initialState = {
  listBookRoom: [],
  updateBookedRoom: null,
};

const bookRoomSlice = createSlice({
  name: "bookedRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookedRoomApi.fulfilled, (state, action) => {
      console.log("Call API phòng đã đặt thành công");
      state.listBookRoom = action.payload;
    });
    builder.addCase(getBookedRoomApi.pending, () => {
      console.log("Đang chờ xử lý API ");
    });
    builder.addCase(getBookedRoomApi.rejected, () => {
      console.log("Call API Bị lỗi ");
    });

    builder.addCase(updateBookedRoom.fulfilled, (state, action) => {
      console.log(action);

      state.listBookRoom = state.listBookRoom.map((bookedRoom) => {
        bookedRoom.id === action.payload.id ? action.payload : bookedRoom;
      });
      state.updateBookedRoom = action.payload;
      console.log("Cập nhật phòng thành công");
    });
    builder.addCase(updateBookedRoom.pending, () => {
      console.log("Đang chờ xử lý cập nhật");
    });
  },
});

export const {} = bookRoomSlice.actions;

export default bookRoomSlice.reducer;
