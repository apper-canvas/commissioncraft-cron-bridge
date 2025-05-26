import { configureStore } from '@reduxjs/toolkit'
import affiliatesReducer from './slices/affiliatesSlice'
import programsReducer from './slices/programsSlice'
import linksReducer from './slices/linksSlice'
import commissionsReducer from './slices/commissionsSlice'

export const store = configureStore({
  reducer: {
    affiliates: affiliatesReducer,
    programs: programsReducer,
    links: linksReducer,
    commissions: commissionsReducer
  }
})
