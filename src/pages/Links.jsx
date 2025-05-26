import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import ApperIcon from '../components/ApperIcon'
import { addLink, updateLink, deleteLink } from '../store/slices/linksSlice'

const Links = () => {
  const dispatch = useDispatch()
  const { links, loading } = useSelector(state => state.links)
  const { affiliates } = useSelector(state => state.affiliates)
  const { programs } = useSelector(state => state.programs)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    affiliateId: '',
    programId: '',
    status: 'active'
  })

  // Filter links based on search and status
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || link.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.url || !formData.affiliateId || !formData.programId) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingLink) {
      dispatch(updateLink({ ...editingLink, ...formData }))
      toast.success('Link updated successfully!')
    } else {
      dispatch(addLink(formData))
      toast.success('Link created successfully!')
    }

    setShowModal(false)
    setEditingLink(null)
    setFormData({ name: '', url: '', affiliateId: '', programId: '', status: 'active' })
  }

  const handleEdit = (link) => {
    setEditingLink(link)
    setFormData({
      name: link.name,
      url: link.url,
      affiliateId: link.affiliateId,
      programId: link.programId,
      status: link.status
    })
    setShowModal(true)
  }

  const handleDelete = (linkId) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      dispatch(deleteLink(linkId))
      toast.success('Link deleted successfully!')
    }
  }

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link.shortUrl)
    toast.success('Short link copied to clipboard!')
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
      case 'active':
        return 'bg-secondary/10 text-secondary'
      case 'paused':
        return 'bg-accent/10 text-accent'
      case 'expired':
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
              Affiliate Links
            </h2>
            <p className="text-surface-600 dark:text-surface-300">
              Generate and manage trackable affiliate links
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
          >
            <ApperIcon name="Link" className="w-5 h-5 mr-2" />
            Generate Link
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
                  placeholder="Search links..."
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
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Link Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Affiliate
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Program
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-surface-900 dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-surface-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {filteredLinks.map((link) => (
                  <motion.tr
                    key={link.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-surface-900 dark:text-white">
                          {link.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-xs text-surface-500 dark:text-surface-400 truncate max-w-xs">
                            {link.shortUrl}
                          </p>
                          <button
                            onClick={() => handleCopyLink(link)}
                            className="p-1 hover:bg-surface-100 dark:hover:bg-surface-600 rounded transition-colors"
                          >
                            <ApperIcon name="Copy" className="w-3 h-3 text-surface-400" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-surface-900 dark:text-white">
                        {getAffiliateName(link.affiliateId)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-surface-900 dark:text-white">
                        {getProgramName(link.programId)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-surface-500 dark:text-surface-400">Clicks:</span>
                          <span className="text-sm font-medium text-surface-900 dark:text-white">
                            {link.clicks}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-surface-500 dark:text-surface-400">Conversions:</span>
                          <span className="text-sm font-medium text-secondary">
                            {link.conversions}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-surface-500 dark:text-surface-400">Rate:</span>
                          <span className="text-sm font-medium text-accent">
                            {link.conversionRate}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(link.status)}`}>
                        {link.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCopyLink(link)}
                          className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Copy" className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(link)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(link.id)}
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
                    {editingLink ? 'Edit Link' : 'Generate New Link'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setEditingLink(null)
                      setFormData({ name: '', url: '', affiliateId: '', programId: '', status: 'active' })
                    }}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Link Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter link name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Destination URL *
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com/product"
                      required
                    />
                  </div>

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
                      <option value="">Select an affiliate</option>
                      {affiliates.map(affiliate => (
                        <option key={affiliate.id} value={affiliate.id}>
                          {affiliate.name} - {affiliate.email}
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
                      <option value="">Select a program</option>
                      {programs.filter(p => p.status === 'active').map(program => (
                        <option key={program.id} value={program.id}>
                          {program.name} - {program.commissionRate}{program.commissionType === 'percentage' ? '%' : '$'}
                        </option>
                      ))}
                    </select>
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
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false)
                        setEditingLink(null)
                        setFormData({ name: '', url: '', affiliateId: '', programId: '', status: 'active' })
                      }}
                      className="flex-1 px-4 py-3 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium shadow-soft hover:shadow-neon transition-all duration-300"
                    >
                      {editingLink ? 'Update' : 'Generate'} Link
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

export default Links
