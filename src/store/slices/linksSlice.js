import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  links: [
    {
      id: '1',
      name: 'Homepage Banner',
      url: 'https://commissioncraft.com/ref/john-smith',
      shortUrl: 'cc.ly/j-banner',
      affiliateId: '1',
      programId: '1',
      createdDate: '2024-01-20',
      clicks: 1250,
      conversions: 45,
      conversionRate: 3.6,
      status: 'active'
    },
    {
      id: '2',
      name: 'Product Review Link',
      url: 'https://commissioncraft.com/ref/sarah-johnson',
      shortUrl: 'cc.ly/s-review',
      affiliateId: '2',
      programId: '2',
      createdDate: '2024-02-15',
      clicks: 890,
      conversions: 28,
      conversionRate: 3.1,
      status: 'active'
    },
    {
      id: '3',
      name: 'Social Media Promo',
      url: 'https://commissioncraft.com/ref/mike-wilson',
      shortUrl: 'cc.ly/m-social',
      affiliateId: '3',
      programId: '1',
      createdDate: '2024-03-01',
      clicks: 420,
      conversions: 15,
      conversionRate: 3.6,
      status: 'active'
    }
  ],
  loading: false,
  error: null
}

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    addLink: (state, action) => {
      const newLink = {
        ...action.payload,
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
        clicks: 0,
        conversions: 0,
        conversionRate: 0,
        shortUrl: `cc.ly/${Math.random().toString(36).substr(2, 8)}`
      }
      state.links.push(newLink)
    },
    updateLink: (state, action) => {
      const index = state.links.findIndex(link => link.id === action.payload.id)
      if (index !== -1) {
        state.links[index] = { ...state.links[index], ...action.payload }
      }
    },
    deleteLink: (state, action) => {
      state.links = state.links.filter(link => link.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { addLink, updateLink, deleteLink, setLoading, setError } = linksSlice.actions
export default linksSlice.reducer
