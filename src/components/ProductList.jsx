import { useState } from 'react'
import { Plus, Trash2, X } from 'lucide-react'

function ProductList({ products, onAddProduct, onDeleteProduct }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unitPrice: '',
    totalUnits: '',
    totalBudget: '',
  })

  const calculateBudget = () => {
    if (formData.unitPrice && formData.totalUnits) {
      const budget = parseFloat(formData.unitPrice) * parseFloat(formData.totalUnits)
      return budget
    }
    return 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const calculatedBudget = calculateBudget()
    if (calculatedBudget > 0) {
      onAddProduct({
        name: formData.name,
        category: formData.category,
        unitPrice: parseFloat(formData.unitPrice),
        totalUnits: parseInt(formData.totalUnits),
        totalBudget: parseFloat(formData.totalBudget) || calculatedBudget,
      })
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({ name: '', category: '', unitPrice: '', totalUnits: '', totalBudget: '' })
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Products</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Products - Mobile Cards & Desktop Table */}
      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow text-center py-12">
          <p className="text-gray-500 text-base sm:text-lg">No products yet. Add your first product!</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3">
            {products.map((product) => {
              const remaining = product.totalUnits - product.soldUnits
              const isSoldOut = remaining === 0
              return (
                <div key={product.id} className={`bg-white rounded-lg shadow p-4 ${isSoldOut ? 'bg-gray-50' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Unit Price</p>
                      <p className="font-medium text-gray-900">{product.unitPrice.toLocaleString()} FCFA</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Budget</p>
                      <p className="font-medium text-gray-900">{product.totalBudget.toLocaleString()} FCFA</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Total Units</p>
                      <p className="font-medium text-gray-900">{product.totalUnits}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Sold</p>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {product.soldUnits}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 text-xs">Remaining</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        isSoldOut
                          ? 'bg-red-100 text-red-800'
                          : remaining < 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {remaining} units
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remaining
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => {
                  const remaining = product.totalUnits - product.soldUnits
                  const isSoldOut = remaining === 0
                  return (
                    <tr key={product.id} className={`hover:bg-gray-50 ${isSoldOut ? 'bg-gray-100' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.unitPrice.toLocaleString()} FCFA</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.totalBudget.toLocaleString()} FCFA</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.totalUnits}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.soldUnits}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isSoldOut
                            ? 'bg-red-100 text-red-800'
                            : remaining < 5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {remaining}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Coca Cola"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Beverages"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price (FCFA)
                </label>
                <input
                  type="number"
                  step="1"
                  required
                  placeholder="e.g., 500"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Units
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  required
                  placeholder="e.g., 100"
                  value={formData.totalUnits}
                  onChange={(e) => setFormData({ ...formData, totalUnits: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Budget (FCFA) - Optional
                </label>
                <input
                  type="number"
                  step="1"
                  placeholder="Leave empty to auto-calculate"
                  value={formData.totalBudget}
                  onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">If empty, will be calculated as Unit Price × Units</p>
              </div>
              {formData.unitPrice && formData.totalUnits && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Calculated Budget: <span className="font-bold text-blue-600">{calculateBudget().toLocaleString()} FCFA</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ({formData.totalUnits} units × {parseFloat(formData.unitPrice).toLocaleString()} FCFA)
                  </p>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
