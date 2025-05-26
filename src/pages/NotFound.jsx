import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50/30 to-secondary-50/20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neon">
            <ApperIcon name="AlertTriangle" className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-surface-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300 group"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound