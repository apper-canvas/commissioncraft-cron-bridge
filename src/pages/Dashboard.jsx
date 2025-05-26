import { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import ApperIcon from '../components/ApperIcon'

const Dashboard = () => {
  const { affiliates } = useSelector(state => state.affiliates)
  const { programs } = useSelector(state => state.programs)
  const { commissions } = useSelector(state => state.commissions)
  const { links } = useSelector(state => state.links)

  const [dateRange, setDateRange] = useState('7d')

  // Calculate dashboard metrics
  const totalAffiliates = affiliates.length
  const activeAffiliates = affiliates.filter(a => a.status === 'active').length
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0)
  const pendingCommissions = commissions.filter(c => c.status === 'pending').length
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0)
  const totalConversions = links.reduce((sum, l) => sum + l.conversions, 0)
  const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : 0

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalCommissions.toFixed(2)}`,
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      color: "text-secondary"
    },
    {
      label: "Active Affiliates",
      value: activeAffiliates,
      change: "+8.3%",
      changeType: "positive",
      icon: "Users",
      color: "text-primary"
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      change: "+2.1%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "text-accent"
    },
    {
      label: "Pending Payouts",
      value: pendingCommissions,
      change: "-5.2%",
      changeType: "negative",
      icon: "Clock",
      color: "text-orange-500"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'commission',
      message: 'New commission earned by John Smith',
      amount: '$125.50',
      time: '2 hours ago',
      icon: 'DollarSign',
      color: 'text-secondary'
    },
    {
      id: 2,
      type: 'affiliate',
      message: 'New affiliate Sarah Johnson joined',
      time: '4 hours ago',
      icon: 'UserPlus',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'conversion',
      message: 'Product conversion via Mike Wilson',
      amount: '$89.75',
      time: '6 hours ago',
      icon: 'Target',
      color: 'text-accent'
    }
  ]

  const topAffiliates = affiliates
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 5)

  const handleExportData = () => {
    toast.success('Dashboard data exported successfully!')
  }

  const handleRefreshData = () => {
    toast.info('Dashboard data refreshed!')
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
              Dashboard Overview
            </h2>
            <p className="text-surface-600 dark:text-surface-300">
              Monitor your affiliate program performance and key metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefreshData}
              className="p-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
            >
              <ApperIcon name="RefreshCw" className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportData}
              className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
            >
              Export Data
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-secondary' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-surface-600 dark:text-surface-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                Recent Activities
              </h3>
              <ApperIcon name="Activity" className="w-5 h-5 text-surface-400" />
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                  <div className={`w-10 h-10 ${activity.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                    <ApperIcon name={activity.icon} className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">
                      {activity.time}
                    </p>
                  </div>
                  {activity.amount && (
                    <span className="text-sm font-bold text-secondary">
                      {activity.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Affiliates */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                Top Affiliates
              </h3>
              <ApperIcon name="Trophy" className="w-5 h-5 text-accent" />
            </div>
            
            <div className="space-y-4">
              {topAffiliates.map((affiliate, index) => (
                <div key={affiliate.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {affiliate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {affiliate.name}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">
                      {affiliate.conversions} conversions
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-secondary">
                      ${affiliate.totalEarnings.toFixed(2)}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">
                      {affiliate.commissionRate}% rate
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
        >
          <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Navigating to Add Affiliate...')}
              className="flex flex-col items-center p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors group"
            >
              <ApperIcon name="UserPlus" className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-primary">Add Affiliate</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Navigating to Create Program...')}
              className="flex flex-col items-center p-4 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors group"
            >
              <ApperIcon name="Target" className="w-8 h-8 text-secondary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-secondary">Create Program</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Navigating to Generate Link...')}
              className="flex flex-col items-center p-4 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors group"
            >
              <ApperIcon name="Link" className="w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-accent">Generate Link</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Navigating to Commission Review...')}
              className="flex flex-col items-center p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-colors group"
            >
              <ApperIcon name="DollarSign" className="w-8 h-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-purple-500">Review Commissions</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

export default Dashboard
