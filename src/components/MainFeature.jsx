import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [commissionData, setCommissionData] = useState({
    salesVolume: 1000,
    commissionRate: 10,
    affiliateCount: 5,
    conversionRate: 2.5
  })
  
  const [results, setResults] = useState({
    totalCommissions: 0,
    commissionPerAffiliate: 0,
    monthlyProjection: 0,
    conversionValue: 0
  })
  
  const [activeTab, setActiveTab] = useState('calculator')
  const [savedCalculations, setSavedCalculations] = useState([])
  const [calculationName, setCalculationName] = useState('')

  // Calculate results whenever commission data changes
  useEffect(() => {
    const { salesVolume, commissionRate, affiliateCount, conversionRate } = commissionData
    
    const totalCommissions = (salesVolume * commissionRate) / 100
    const commissionPerAffiliate = totalCommissions / affiliateCount
    const monthlyProjection = totalCommissions * 12
    const conversionValue = (salesVolume * conversionRate) / 100
    
    setResults({
      totalCommissions,
      commissionPerAffiliate,
      monthlyProjection,
      conversionValue
    })
  }, [commissionData])

  const handleInputChange = (field, value) => {
    const numericValue = Math.max(0, parseFloat(value) || 0)
    setCommissionData(prev => ({
      ...prev,
      [field]: numericValue
    }))
  }

  const saveCalculation = () => {
    if (!calculationName.trim()) {
      toast.error("Please enter a name for your calculation")
      return
    }
    
    const newCalculation = {
      id: Date.now(),
      name: calculationName,
      data: { ...commissionData },
      results: { ...results },
      createdAt: new Date().toLocaleDateString()
    }
    
    setSavedCalculations(prev => [newCalculation, ...prev])
    setCalculationName('')
    toast.success("Calculation saved successfully!")
  }

  const loadCalculation = (calculation) => {
    setCommissionData(calculation.data)
    setActiveTab('calculator')
    toast.success(`Loaded calculation: ${calculation.name}`)
  }

  const deleteCalculation = (id) => {
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id))
    toast.success("Calculation deleted successfully!")
  }

  const resetCalculator = () => {
    setCommissionData({
      salesVolume: 1000,
      commissionRate: 10,
      affiliateCount: 5,
      conversionRate: 2.5
    })
    toast.success("Calculator reset to default values")
  }

  const inputFields = [
    {
      key: 'salesVolume',
      label: 'Monthly Sales Volume',
      icon: 'DollarSign',
      prefix: '$',
      color: 'text-primary'
    },
    {
      key: 'commissionRate',
      label: 'Commission Rate',
      icon: 'Percent',
      suffix: '%',
      color: 'text-secondary'
    },
    {
      key: 'affiliateCount',
      label: 'Number of Affiliates',
      icon: 'Users',
      color: 'text-accent'
    },
    {
      key: 'conversionRate',
      label: 'Conversion Rate',
      icon: 'TrendingUp',
      suffix: '%',
      color: 'text-purple-500'
    }
  ]

  const resultCards = [
    {
      key: 'totalCommissions',
      label: 'Total Monthly Commissions',
      icon: 'Calculator',
      color: 'from-primary to-primary-dark',
      prefix: '$'
    },
    {
      key: 'commissionPerAffiliate',
      label: 'Commission per Affiliate',
      icon: 'User',
      color: 'from-secondary to-secondary-dark',
      prefix: '$'
    },
    {
      key: 'monthlyProjection',
      label: 'Annual Projection',
      icon: 'Calendar',
      color: 'from-accent to-orange-600',
      prefix: '$'
    },
    {
      key: 'conversionValue',
      label: 'Conversion Value',
      icon: 'Target',
      color: 'from-purple-500 to-purple-700',
      prefix: '$'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center mb-8 sm:mb-12">
        <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-soft border border-white/20">
          <div className="flex space-x-2">
            {[
              { id: 'calculator', label: 'Calculator', icon: 'Calculator' },
              { id: 'saved', label: 'Saved', icon: 'Save' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-soft'
                    : 'text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-white hover:bg-white/50 dark:hover:bg-surface-700/50'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'calculator' && (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Input Section */}
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-soft border border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white">
                  Commission Parameters
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCalculator}
                  className="flex items-center space-x-2 px-4 py-2 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-600 transition-all duration-300"
                >
                  <ApperIcon name="RotateCcw" className="w-4 h-4" />
                  <span className="text-sm font-medium">Reset</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {inputFields.map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <ApperIcon name={field.icon} className={`w-4 h-4 ${field.color}`} />
                        <span>{field.label}</span>
                      </div>
                    </label>
                    <div className="relative">
                      {field.prefix && (
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-surface-500 dark:text-surface-400 font-medium">
                            {field.prefix}
                          </span>
                        </div>
                      )}
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={commissionData[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className={`w-full ${field.prefix ? 'pl-8' : 'pl-4'} ${field.suffix ? 'pr-8' : 'pr-4'} py-3 sm:py-4 bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 rounded-xl focus:border-primary dark:focus:border-primary focus:outline-none transition-all duration-300 text-surface-900 dark:text-white font-medium group-hover:border-surface-300 dark:group-hover:border-surface-500`}
                        placeholder="0"
                      />
                      {field.suffix && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-surface-500 dark:text-surface-400 font-medium">
                            {field.suffix}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {resultCards.map((card, index) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-soft border border-white/20 text-center group"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <ApperIcon name={card.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-2 sm:mb-3">
                    {card.prefix}{results[card.key].toFixed(2)}
                  </div>
                  <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 font-medium">
                    {card.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Save Calculation */}
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-soft border border-white/20">
              <h4 className="text-lg sm:text-xl font-bold text-surface-900 dark:text-white mb-4 sm:mb-6">
                Save This Calculation
              </h4>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="text"
                  placeholder="Enter calculation name..."
                  value={calculationName}
                  onChange={(e) => setCalculationName(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 rounded-xl focus:border-primary dark:focus:border-primary focus:outline-none transition-all duration-300 text-surface-900 dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveCalculation}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
                >
                  <ApperIcon name="Save" className="w-5 h-5" />
                  <span>Save Calculation</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-soft border border-white/20">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-6 sm:mb-8">
                Saved Calculations
              </h3>
              
              {savedCalculations.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-surface-100 dark:bg-surface-700 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <ApperIcon name="Save" className="w-8 h-8 sm:w-10 sm:h-10 text-surface-400" />
                  </div>
                  <p className="text-surface-500 dark:text-surface-400 text-lg">
                    No saved calculations yet. Start by creating and saving a calculation.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedCalculations.map((calculation, index) => (
                    <motion.div
                      key={calculation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-surface-50 dark:bg-surface-700 rounded-2xl p-6 border border-surface-200 dark:border-surface-600 hover:shadow-card transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-surface-900 dark:text-white text-lg">
                          {calculation.name}
                        </h4>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteCalculation(calculation.id)}
                          className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </motion.button>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-surface-600 dark:text-surface-400">Sales Volume:</span>
                          <span className="font-medium text-surface-900 dark:text-white">
                            ${calculation.data.salesVolume}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-surface-600 dark:text-surface-400">Commission Rate:</span>
                          <span className="font-medium text-surface-900 dark:text-white">
                            {calculation.data.commissionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-surface-600 dark:text-surface-400">Total Commissions:</span>
                          <span className="font-bold text-primary">
                            ${calculation.results.totalCommissions.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-surface-500 dark:text-surface-400">
                          {calculation.createdAt}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => loadCalculation(calculation)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-all duration-200"
                        >
                          <ApperIcon name="Play" className="w-3 h-3" />
                          <span>Load</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature