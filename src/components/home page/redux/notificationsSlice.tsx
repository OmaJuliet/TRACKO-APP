// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Notification {
//   id: number;
//   message: string;
//   timestamp: number;
//   read: boolean;
// }

// interface NotificationsState {
//   notifications: Notification[];
// }

// const initialState: NotificationsState = {
//   notifications: [],
// };

// const notificationsSlice = createSlice({
//   name: 'notifications',
//   initialState,
//   reducers: {
//     addNotification: (state, action: PayloadAction<Notification>) => {
//       state.notifications.push(action.payload);
//     },
//     markAsRead: (state, action: PayloadAction<number>) => {
//       const notification = state.notifications.find(notif => notif.id === action.payload);
//       if (notification) {
//         notification.read = true;
//       }
//     },
//   },
// });

// export const { addNotification, markAsRead } = notificationsSlice.actions;
// export default notificationsSlice.reducer;
