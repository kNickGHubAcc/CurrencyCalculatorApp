import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

//Δημιουργία του redux store
export default configureStore({
  reducer: {
    user: userSlice,
  },
})