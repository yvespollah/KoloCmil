import { useState } from 'react'
import { Check, Download, X, FileText, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { downloadInvoice, printInvoice } from '../utils/invoiceGenerator'

function SalesList({ products, salesHistory, onSellProduct, onDeleteSale }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [currentSale, setCurrentSale] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  const activeProducts = products.filter(p => p.soldUnits < p.totalUnits)

  const handleSellClick = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setIsModalOpen(true)
  }

  const handleConfirmSale = () => {
    if (customerName.trim() && selectedProduct && quantity > 0) {
      const sale = onSellProduct(selectedProduct.id, customerName.trim(), quantity)
      if (sale) {
        setCurrentSale(sale)
        setIsModalOpen(false)
        setShowInvoiceModal(true)
        setCustomerName('')
        setQuantity(1)
        setSelectedProduct(null)
      }
    }
  }

  const getMaxQuantity = () => {
    if (!selectedProduct) return 1
    return selectedProduct.totalUnits - selectedProduct.soldUnits
  }

  const handleDownloadInvoice = () => {
    if (currentSale) {
      downloadInvoice(currentSale)
      setShowInvoiceModal(false)
      setCurrentSale(null)
    }
  }

  const handlePrintInvoice = () => {
    if (currentSale) {
      printInvoice(currentSale)
    }
  }

  const handleSkipInvoice = () => {
    setShowInvoiceModal(false)
    setCurrentSale(null)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Sell</h2>
        <p className="text-gray-600">Click the checkbox to sell one unit of a product</p>
      </div>

      {activeProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No products available to sell</p>
          <p className="text-gray-400 text-sm mt-2">Add products first to start selling</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProducts.map((product) => {
            const remaining = product.totalUnits - product.soldUnits
            const progress = (product.soldUnits / product.totalUnits) * 100
            
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <button
                      onClick={() => handleSellClick(product)}
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors shadow-md"
                      title="Sell one unit"
                    >
                      <Check size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unit Price:</span>
                      <span className="font-semibold">{product.unitPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sold:</span>
                      <span className="font-semibold text-green-600">{product.soldUnits} / {product.totalUnits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-semibold text-blue-600">{remaining}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-semibold text-purple-600">{product.totalRevenue.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">{progress.toFixed(1)}% sold</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Customer Name Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Enter Customer Name</h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedProduct(null)
                  setCustomerName('')
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Product:</span> {selectedProduct.name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Unit Price:</span> {selectedProduct.unitPrice.toLocaleString()} FCFA
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Available:</span> {getMaxQuantity()} units
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                max={getMaxQuantity()}
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, getMaxQuantity()))}
                onKeyPress={(e) => e.key === 'Enter' && handleConfirmSale()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total: {(selectedProduct.unitPrice * quantity).toLocaleString()} FCFA
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleConfirmSale}
                disabled={!customerName.trim()}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirm Sale
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedProduct(null)
                  setCustomerName('')
                  setQuantity(1)
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Download Modal */}
      {showInvoiceModal && currentSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sale Completed!</h3>
              <p className="text-gray-600">Invoice #{currentSale.invoiceNumber}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-semibold">{currentSale.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-semibold">{currentSale.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{currentSale.quantity} unit{currentSale.quantity > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-green-600">{currentSale.totalAmount.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadInvoice}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={20} />
                <span>Download Invoice</span>
              </button>
              
              <button
                onClick={handlePrintInvoice}
                className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FileText size={20} />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={handleSkipInvoice}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sales History Section */}
      {salesHistory.length > 0 && (() => {
        const reversedSales = salesHistory.slice().reverse()
        const totalPages = Math.ceil(reversedSales.length / itemsPerPage)
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const currentSales = reversedSales.slice(startIndex, endIndex)

        return (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Recent Sales</h3>
              <div className="text-sm text-gray-600">
                Total: {salesHistory.length} sale{salesHistory.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        {sale.totalAmount.toLocaleString()} FCFA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.dateFormatted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => downloadInvoice(sale)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Download Invoice"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this sale?')) {
                                onDeleteSale(sale.id)
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Sale"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(endIndex, reversedSales.length)}</span> of{' '}
                        <span className="font-medium">{reversedSales.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === index + 1
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default SalesList
