import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  commissions: [
    {
      id: '1',
      affiliateId: '1',
      programId: '1',
      amount: 125.50,
      status: 'approved',
      type: 'sale',
      orderValue: 837.00,
      commissionRate: 15,
      date: '2024-03-15',
      payoutDate: '2024-03-30'
    },
    {
      id: '2',
      affiliateId: '2',
      programId: '2',
      amount: 25.00,
      status: 'pending',
      type: 'lead',
      orderValue: 0,
      commissionRate: 25,
      date: '2024-03-18',
      payoutDate: null
    },
    {
      id: '3',
      affiliateId: '1',
      programId: '1',
      amount: 89.75,
      status: 'paid',
      type: 'sale',
      orderValue: 598.33,
      commissionRate: 15,
      date: '2024-03-10',
      payoutDate: '2024-03-25'
    }
  ],
  loading: false,
  error: null
}

const commissionsSlice = createSlice({
  name: 'commissions',
  initialState,
  reducers: {
    addCommission: (state, action) => {
      const newCommission = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        payoutDate: null
      }
      state.commissions.push(newCommission)
    },
    updateCommission: (state, action) => {
      const index = state.commissions.findIndex(commission => commission.id === action.payload.id)
      if (index !== -1) {
        state.commissions[index] = { ...state.commissions[index], ...action.payload }
      }
    },
    deleteCommission: (state, action) => {
      state.commissions = state.commissions.filter(commission => commission.id !== action.payload)
    },
    approveCommission: (state, action) => {
      const commission = state.commissions.find(c => c.id === action.payload)
      if (commission) {
        commission.status = 'approved'
      }
    },
    payCommission: (state, action) => {
      const commission = state.commissions.find(c => c.id === action.payload)
      if (commission) {
        commission.status = 'paid'
        commission.payoutDate = new Date().toISOString().split('T')[0]
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  addCommission,
  updateCommission,
  deleteCommission,
  approveCommission,
  payCommission,
  setLoading,
  setError
} = commissionsSlice.actions
export default commissionsSlice.reducer
