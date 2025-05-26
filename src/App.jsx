import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './store/store'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Affiliates from './pages/Affiliates'
import Programs from './pages/Programs'
import Links from './pages/Links'
import Commissions from './pages/Commissions'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/affiliates" element={<Affiliates />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/links" element={<Links />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="!bg-white !shadow-soft !border !border-surface-200 !rounded-xl"
            bodyClassName="!text-surface-700 !font-medium"
            progressClassName="!bg-primary"
          />
        </div>
      </Router>
    </Provider>
  )
}

export default App
