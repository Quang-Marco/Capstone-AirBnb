import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { phongThueService } from "../services/phongThue.service";

export const getValueRoomApi = createAsyncThunk(
  "room/getValueRoomApi",
  async () => {
    const result = await phongThueService.getRooms();
    return result.data.content;
  }
);
export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async ({ roomId, roomData }) => {
    const result = await phongThueService.updateRoom(roomId, roomData);
    return result.data.content;
  }
);
const initialState = { listRoom: [], updatingRoom: null };

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueRoomApi.fulfilled, (state, action) => {
      console.log("Call API room thành công");
      state.listRoom = action.payload;
    });
    builder.addCase(getValueRoomApi.pending, () => {
      console.log("Đang chờ xử lý API ");
    });
    builder.addCase(getValueRoomApi.rejected, () => {
      console.log("Call API Bị lỗi ");
    });

    builder.addCase(updateRoom.fulfilled, (state, action) => {
      console.log(action);
      console.log("Cập nhật phòng thành công");
      state.listRoom = state.listRoom.map((room) => {
        room.id === action.payload.id ? action.payload : room;
      });
      state.updatingRoom = action.payload;
    });
    builder.addCase(updateRoom.pending, () => {
      console.log("Đang chờ xử lý cập nhật");
    });
  },
});

export const {} = roomSlice.actions;

export default roomSlice.reducer;
