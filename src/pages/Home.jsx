import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const stats = [
    { label: "Active Affiliates", value: "2,847", icon: "Users", color: "text-primary" },
    { label: "Total Commissions", value: "$124.5K", icon: "DollarSign", color: "text-secondary" },
    { label: "Conversion Rate", value: "3.2%", icon: "TrendingUp", color: "text-accent" },
    { label: "Programs", value: "156", icon: "Target", color: "text-purple-500" }
  ]

  const features = [
    {
      title: "Real-time Tracking",
      description: "Monitor clicks, conversions, and commissions as they happen with our advanced analytics dashboard.",
      icon: "Activity",
      gradient: "from-primary to-primary-dark"
    },
    {
      title: "Smart Link Generation",
      description: "Create trackable affiliate links with custom parameters and UTM tracking for maximum visibility.",
      icon: "Link",
      gradient: "from-secondary to-secondary-dark"
    },
    {
      title: "Commission Management",
      description: "Automate commission calculations, approvals, and payments with flexible rate structures.",
      icon: "Calculator",
      gradient: "from-accent to-orange-600"
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 glass-morphism border-b border-white/20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-neon">
                <ApperIcon name="Zap" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                CommissionCraft
              </h1>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-surface-700 dark:text-surface-200" 
                />
              </motion.button>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              Scale Your
              <span className="gradient-text"> Affiliate </span>
              Marketing
            </motion.h2>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-surface-600 dark:text-surface-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The most powerful affiliate marketing platform for managing partners, tracking commissions, and scaling your business growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16"
            >
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
                >
                  Launch Dashboard
                </motion.button>
              </Link>
              <Link to="/affiliates">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-surface-700 dark:text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Manage Affiliates
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-card-gradient dark:bg-surface-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card border border-white/10 backdrop-blur-sm"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto`}>
                    <ApperIcon name={stat.icon} className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Everything You Need to 
              <span className="gradient-text"> Succeed</span>
            </h3>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Comprehensive tools designed to help you manage, track, and optimize your affiliate marketing campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 lg:mb-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group bg-card-gradient dark:bg-surface-800 rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-neon border border-white/10 backdrop-blur-sm transition-all duration-500"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <ApperIcon name={feature.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-surface-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Commission
              <span className="gradient-text"> Calculator</span>
            </h3>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Calculate potential earnings and optimize your commission structures with our advanced calculator.
            </p>
          </motion.div>
          
          <MainFeature />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Zap" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold">CommissionCraft</h1>
              </div>
              <p className="text-surface-300 mb-6 sm:mb-8 max-w-md leading-relaxed">
                The ultimate affiliate marketing platform for businesses of all sizes. Scale your partnerships and maximize your revenue potential.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Linkedin', 'Instagram'].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="#"
                    className="w-10 h-10 bg-surface-800 rounded-xl flex items-center justify-center hover:bg-primary transition-all duration-300"
                  >
                    <ApperIcon name={social} className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Product</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Dashboard', path: '/dashboard' },
                  { name: 'Affiliates', path: '/affiliates' },
                  { name: 'Programs', path: '/programs' },
                  { name: 'Links', path: '/links' }
                ].map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className="text-surface-300 hover:text-white transition-colors duration-200">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Support</h4>
              <ul className="space-y-2 sm:space-y-3">
                {['Documentation', 'Help Center', 'Contact', 'Status'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-surface-300 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-700 mt-12 sm:mt-16 pt-8 sm:pt-12 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-surface-400 text-sm sm:text-base">
              © 2024 CommissionCraft. All rights reserved.
            </p>
            <div className="flex space-x-6 sm:space-x-8">
              <a href="#" className="text-surface-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                Privacy
              </a>
              <a href="#" className="text-surface-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
