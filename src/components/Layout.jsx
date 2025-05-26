import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'BarChart3' },
    { name: 'Affiliates', href: '/affiliates', icon: 'Users' },
    { name: 'Programs', href: '/programs', icon: 'Target' },
    { name: 'Links', href: '/links', icon: 'Link' },
    { name: 'Commissions', href: '/commissions', icon: 'DollarSign' }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className="fixed inset-y-0 left-0 z-50 bg-white/90 dark:bg-surface-900/90 backdrop-blur-lg border-r border-surface-200 dark:border-surface-700"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="w-4 h-4 text-white" />
              </div>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-bold gradient-text"
                >
                  CommissionCraft
                </motion.span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              <ApperIcon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-soft'
                      : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-surface-200 dark:border-surface-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">AD</span>
              </div>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                    admin@commissioncraft.com
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm border-b border-surface-200 dark:border-surface-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-700 dark:text-surface-200" 
                />
              </button>
              
              <button className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <ApperIcon name="Bell" className="w-5 h-5 text-surface-700 dark:text-surface-200" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
