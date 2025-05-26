import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import ApperIcon from '../components/ApperIcon'
import { addCommission, updateCommission, deleteCommission, approveCommission, payCommission } from '../store/slices/commissionsSlice'

const Commissions = () => {
  const dispatch = useDispatch()
  const { commissions, loading } = useSelector(state => state.commissions)
  const { affiliates } = useSelector(state => state.affiliates)
  const { programs } = useSelector(state => state.programs)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingCommission, setEditingCommission] = useState(null)
  const [formData, setFormData] = useState({
    affiliateId: '',
    programId: '',
    amount: '',
    type: 'sale',
    orderValue: '',
    commissionRate: ''
  })

  // Filter commissions based on search and status
  const filteredCommissions = commissions.filter(commission => {
    const affiliate = getAffiliateName(commission.affiliateId)
    const program = getProgramName(commission.programId)
    const matchesSearch = affiliate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.affiliateId || !formData.programId || !formData.amount) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingCommission) {
      dispatch(updateCommission({ ...editingCommission, ...formData, amount: parseFloat(formData.amount) }))
      toast.success('Commission updated successfully!')
    } else {
      dispatch(addCommission({ ...formData, amount: parseFloat(formData.amount), status: 'pending' }))
      toast.success('Commission added successfully!')
    }

    setShowModal(false)
    setEditingCommission(null)
    setFormData({ affiliateId: '', programId: '', amount: '', type: 'sale', orderValue: '', commissionRate: '' })
  }

  const handleEdit = (commission) => {
    setEditingCommission(commission)
    setFormData({
      affiliateId: commission.affiliateId,
      programId: commission.programId,
      amount: commission.amount.toString(),
      type: commission.type,
      orderValue: commission.orderValue.toString(),
      commissionRate: commission.commissionRate.toString()
    })
    setShowModal(true)
  }

  const handleDelete = (commissionId) => {
    if (window.confirm('Are you sure you want to delete this commission?')) {
      dispatch(deleteCommission(commissionId))
      toast.success('Commission deleted successfully!')
    }
  }

  const handleApprove = (commissionId) => {
    dispatch(approveCommission(commissionId))
    toast.success('Commission approved successfully!')
  }

  const handlePay = (commissionId) => {
    dispatch(payCommission(commissionId))
    toast.success('Commission marked as paid!')
  }

  const getAffiliateName = (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId)
    return affiliate ? affiliate.name : 'Unknown'
  }

  const getProgramName = (programId) => {
    const program = programs.find(p => p.id === programId)
    return program ? program.name : 'Unknown'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-secondary/10 text-secondary'
      case 'pending':
        return 'bg-accent/10 text-accent'
      case 'paid':
        return 'bg-primary/10 text-primary'
      case 'rejected':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-surface-500/10 text-surface-500'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'sale':
        return 'ShoppingCart'
      case 'lead':
        return 'Users'
      case 'click':
        return 'MousePointer'
      default:
        return 'DollarSign'
    }
  }

  // Calculate summary stats
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0)
  const pendingCommissions = commissions.filter(c => c.status === 'pending')
  const approvedCommissions = commissions.filter(c => c.status === 'approved')
  const paidCommissions = commissions.filter(c => c.status === 'paid')

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
              Commission Management
            </h2>
            <p className="text-surface-600 dark:text-surface-300">
              Track, approve, and manage affiliate commissions
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Add Commission
          </motion.button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="DollarSign" className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
              ${totalCommissions.toFixed(2)}
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400">
              Total Commissions
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="Clock" className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
              {pendingCommissions.length}
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400">
              Pending Review
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
              {approvedCommissions.length}
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400">
              Approved
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="CreditCard" className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
              {paidCommissions.length}
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400">
              Paid Out
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search commissions..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Commissions Table */}
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Commission Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Affiliate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Program
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-surface-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {filteredCommissions.map((commission) => (
                  <motion.tr
                    key={commission.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <ApperIcon name={getTypeIcon(commission.type)} className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-900 dark:text-white capitalize">
                            {commission.type} Commission
                          </p>
                          <p className="text-xs text-surface-500 dark:text-surface-400">
                            Rate: {commission.commissionRate}%
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-surface-900 dark:text-white">
                        {getAffiliateName(commission.affiliateId)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-surface-900 dark:text-white">
                        {getProgramName(commission.programId)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-secondary">
                          ${commission.amount.toFixed(2)}
                        </p>
                        {commission.orderValue > 0 && (
                          <p className="text-xs text-surface-500 dark:text-surface-400">
                            Order: ${commission.orderValue.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                        {commission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-surface-900 dark:text-white">
                          {new Date(commission.date).toLocaleDateString()}
                        </p>
                        {commission.payoutDate && (
                          <p className="text-xs text-surface-500 dark:text-surface-400">
                            Paid: {new Date(commission.payoutDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {commission.status === 'pending' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleApprove(commission.id)}
                            className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <ApperIcon name="Check" className="w-4 h-4" />
                          </motion.button>
                        )}
                        {commission.status === 'approved' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handlePay(commission.id)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Mark as Paid"
                          >
                            <ApperIcon name="CreditCard" className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(commission)}
                          className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(commission.id)}
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
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-surface-200 dark:border-surface-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                    {editingCommission ? 'Edit Commission' : 'Add New Commission'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setEditingCommission(null)
                      setFormData({ affiliateId: '', programId: '', amount: '', type: 'sale', orderValue: '', commissionRate: '' })
                    }}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Affiliate *
                      </label>
                      <select
                        value={formData.affiliateId}
                        onChange={(e) => setFormData({ ...formData, affiliateId: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="">Select affiliate</option>
                        {affiliates.map(affiliate => (
                          <option key={affiliate.id} value={affiliate.id}>
                            {affiliate.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Program *
                      </label>
                      <select
                        value={formData.programId}
                        onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="">Select program</option>
                        {programs.map(program => (
                          <option key={program.id} value={program.id}>
                            {program.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Commission Amount *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="25.00"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="sale">Sale</option>
                        <option value="lead">Lead</option>
                        <option value="click">Click</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Order Value
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.orderValue}
                        onChange={(e) => setFormData({ ...formData, orderValue: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="250.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Commission Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.commissionRate}
                        onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="10.00"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false)
                        setEditingCommission(null)
                        setFormData({ affiliateId: '', programId: '', amount: '', type: 'sale', orderValue: '', commissionRate: '' })
                      }}
                      className="flex-1 px-4 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
                    >
                      {editingCommission ? 'Update' : 'Add'} Commission
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

export default Commissions
