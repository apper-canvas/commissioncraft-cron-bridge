import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import ApperIcon from '../components/ApperIcon'
import { addAffiliate, updateAffiliate, deleteAffiliate } from '../store/slices/affiliatesSlice'

const Affiliates = () => {
  const dispatch = useDispatch()
  const { affiliates, loading } = useSelector(state => state.affiliates)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingAffiliate, setEditingAffiliate] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'pending',
    commissionRate: 10
  })

  // Filter affiliates based on search and status
  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || affiliate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingAffiliate) {
      dispatch(updateAffiliate({ ...editingAffiliate, ...formData }))
      toast.success('Affiliate updated successfully!')
    } else {
      dispatch(addAffiliate(formData))
      toast.success('Affiliate added successfully!')
    }

    setShowModal(false)
    setEditingAffiliate(null)
    setFormData({ name: '', email: '', status: 'pending', commissionRate: 10 })
  }

  const handleEdit = (affiliate) => {
    setEditingAffiliate(affiliate)
    setFormData({
      name: affiliate.name,
      email: affiliate.email,
      status: affiliate.status,
      commissionRate: affiliate.commissionRate
    })
    setShowModal(true)
  }

  const handleDelete = (affiliateId) => {
    if (window.confirm('Are you sure you want to delete this affiliate?')) {
      dispatch(deleteAffiliate(affiliateId))
      toast.success('Affiliate deleted successfully!')
    }
  }

  const handleStatusChange = (affiliateId, newStatus) => {
    dispatch(updateAffiliate({ id: affiliateId, status: newStatus }))
    toast.success(`Affiliate status updated to ${newStatus}!`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-secondary/10 text-secondary'
      case 'pending':
        return 'bg-accent/10 text-accent'
      case 'inactive':
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
              Affiliate Management
            </h2>
            <p className="text-surface-600 dark:text-surface-300">
              Manage your affiliate partners and track their performance
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
          >
            <ApperIcon name="UserPlus" className="w-5 h-5 mr-2" />
            Add Affiliate
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
                  placeholder="Search affiliates..."
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
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Affiliates Table */}
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Affiliate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Commission Rate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Total Earnings
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Conversions
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-surface-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {filteredAffiliates.map((affiliate) => (
                  <motion.tr
                    key={affiliate.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {affiliate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-900 dark:text-white">
                            {affiliate.name}
                          </p>
                          <p className="text-sm text-surface-500 dark:text-surface-400">
                            {affiliate.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={affiliate.status}
                        onChange={(e) => handleStatusChange(affiliate.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-none outline-none cursor-pointer ${getStatusColor(affiliate.status)}`}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-900 dark:text-white font-medium">
                      {affiliate.commissionRate}%
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-secondary">
                      ${affiliate.totalEarnings.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-900 dark:text-white">
                      {affiliate.conversions}
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-500 dark:text-surface-400">
                      {new Date(affiliate.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(affiliate)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(affiliate.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-surface-200 dark:border-surface-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                    {editingAffiliate ? 'Edit Affiliate' : 'Add New Affiliate'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setEditingAffiliate(null)
                      setFormData({ name: '', email: '', status: 'pending', commissionRate: 10 })
                    }}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter affiliate name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter email address"
                      required
                    />
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
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.commissionRate}
                      onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter commission rate"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false)
                        setEditingAffiliate(null)
                        setFormData({ name: '', email: '', status: 'pending', commissionRate: 10 })
                      }}
                      className="flex-1 px-4 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
                    >
                      {editingAffiliate ? 'Update' : 'Add'} Affiliate
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

export default Affiliates
