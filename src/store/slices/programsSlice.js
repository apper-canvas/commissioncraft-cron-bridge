import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  programs: [
    {
      id: '1',
      name: 'E-commerce Essentials',
      description: 'Premium e-commerce tools and analytics platform',
      commissionRate: 15,
      commissionType: 'percentage',
      status: 'active',
      createdDate: '2024-01-01',
      totalAffiliates: 245,
      totalCommissions: 15750.50,
      clicks: 8450,
      conversions: 234
    },
    {
      id: '2',
      name: 'Marketing Automation Suite',
      description: 'Complete marketing automation and CRM solution',
      commissionRate: 25,
      commissionType: 'fixed',
      status: 'active',
      createdDate: '2024-01-15',
      totalAffiliates: 189,
      totalCommissions: 12400.75,
      clicks: 6230,
      conversions: 178
    },
    {
      id: '3',
      name: 'Analytics Pro',
      description: 'Advanced analytics and reporting tools',
      commissionRate: 20,
      commissionType: 'percentage',
      status: 'draft',
      createdDate: '2024-02-01',
      totalAffiliates: 67,
      totalCommissions: 3250.25,
      clicks: 2180,
      conversions: 45
    }
  ],
  loading: false,
  error: null
}

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    addProgram: (state, action) => {
      const newProgram = {
        ...action.payload,
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
        totalAffiliates: 0,
        totalCommissions: 0,
        clicks: 0,
        conversions: 0
      }
      state.programs.push(newProgram)
    },
    updateProgram: (state, action) => {
      const index = state.programs.findIndex(program => program.id === action.payload.id)
      if (index !== -1) {
        state.programs[index] = { ...state.programs[index], ...action.payload }
      }
    },
    deleteProgram: (state, action) => {
      state.programs = state.programs.filter(program => program.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { addProgram, updateProgram, deleteProgram, setLoading, setError } = programsSlice.actions
export default programsSlice.reducer
