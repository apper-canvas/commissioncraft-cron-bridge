import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  affiliates: [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      status: 'active',
      joinDate: '2024-01-15',
      totalEarnings: 2450.50,
      commissionRate: 15,
      clicks: 1250,
      conversions: 45,
      conversionRate: 3.6
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      status: 'active',
      joinDate: '2024-02-20',
      totalEarnings: 1875.25,
      commissionRate: 12,
      clicks: 980,
      conversions: 32,
      conversionRate: 3.3
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      status: 'pending',
      joinDate: '2024-03-10',
      totalEarnings: 650.00,
      commissionRate: 10,
      clicks: 420,
      conversions: 15,
      conversionRate: 3.6
    }
  ],
  loading: false,
  error: null
}

const affiliatesSlice = createSlice({
  name: 'affiliates',
  initialState,
  reducers: {
    addAffiliate: (state, action) => {
      const newAffiliate = {
        ...action.payload,
        id: Date.now().toString(),
        joinDate: new Date().toISOString().split('T')[0],
        totalEarnings: 0,
        clicks: 0,
        conversions: 0,
        conversionRate: 0
      }
      state.affiliates.push(newAffiliate)
    },
    updateAffiliate: (state, action) => {
      const index = state.affiliates.findIndex(affiliate => affiliate.id === action.payload.id)
      if (index !== -1) {
        state.affiliates[index] = { ...state.affiliates[index], ...action.payload }
      }
    },
    deleteAffiliate: (state, action) => {
      state.affiliates = state.affiliates.filter(affiliate => affiliate.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { addAffiliate, updateAffiliate, deleteAffiliate, setLoading, setError } = affiliatesSlice.actions
export default affiliatesSlice.reducer
