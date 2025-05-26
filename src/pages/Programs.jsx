import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import ApperIcon from '../components/ApperIcon'
import { addProgram, updateProgram, deleteProgram } from '../store/slices/programsSlice'

const Programs = () => {
  const dispatch = useDispatch()
  const { programs, loading } = useSelector(state => state.programs)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    commissionRate: 10,
    commissionType: 'percentage',
    status: 'draft'
  })

  // Filter programs based on search and status
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingProgram) {
      dispatch(updateProgram({ ...editingProgram, ...formData }))
      toast.success('Program updated successfully!')
    } else {
      dispatch(addProgram(formData))
      toast.success('Program created successfully!')
    }

    setShowModal(false)
    setEditingProgram(null)
    setFormData({ name: '', description: '', commissionRate: 10, commissionType: 'percentage', status: 'draft' })
  }

  const handleEdit = (program) => {
    setEditingProgram(program)
    setFormData({
      name: program.name,
      description: program.description,
      commissionRate: program.commissionRate,
      commissionType: program.commissionType,
      status: program.status
    })
    setShowModal(true)
  }

  const handleDelete = (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      dispatch(deleteProgram(programId))
      toast.success('Program deleted successfully!')
    }
  }

  const handleStatusChange = (programId, newStatus) => {
    dispatch(updateProgram({ id: programId, status: newStatus }))
    toast.success(`Program status updated to ${newStatus}!`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-secondary/10 text-secondary'
      case 'draft':
        return 'bg-accent/10 text-accent'
      case 'paused':
        return 'bg-surface-500/10 text-surface-500'
      default:
        return 'bg-surface-500/10 text-surface-500'
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
              Affiliate Programs
            </h2>
            <p className="text-surface-600 dark:text-surface-300">
              Create and manage your affiliate marketing programs
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Create Program
          </motion.button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <motion.div
              key={program.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700 hover:shadow-neon transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Target" className="w-6 h-6 text-white" />
                </div>
                <select
                  value={program.status}
                  onChange={(e) => handleStatusChange(program.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border-none outline-none cursor-pointer ${getStatusColor(program.status)}`}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
              
              <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
                {program.name}
              </h3>
              <p className="text-sm text-surface-600 dark:text-surface-300 mb-4 line-clamp-2">
                {program.description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-500 dark:text-surface-400">Commission</span>
                  <span className="text-sm font-bold text-primary">
                    {program.commissionType === 'percentage' ? `${program.commissionRate}%` : `$${program.commissionRate}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-500 dark:text-surface-400">Affiliates</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white">
                    {program.totalAffiliates}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-500 dark:text-surface-400">Total Earned</span>
                  <span className="text-sm font-bold text-secondary">
                    ${program.totalCommissions.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(program)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(program.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <div className="text-xs text-surface-500 dark:text-surface-400">
                  Created {new Date(program.createdDate).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-surface-200 dark:border-surface-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                    {editingProgram ? 'Edit Program' : 'Create New Program'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setEditingProgram(null)
                      setFormData({ name: '', description: '', commissionRate: 10, commissionType: 'percentage', status: 'draft' })
                    }}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Program Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter program name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter program description"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Commission Type
                      </label>
                      <select
                        value={formData.commissionType}
                        onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Commission Rate
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.commissionRate}
                        onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={formData.commissionType === 'percentage' ? '10' : '25.00'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false)
                        setEditingProgram(null)
                        setFormData({ name: '', description: '', commissionRate: 10, commissionType: 'percentage', status: 'draft' })
                      }}
                      className="flex-1 px-4 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
                    >
                      {editingProgram ? 'Update' : 'Create'} Program
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

export default Programs
