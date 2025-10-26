import { Package, DollarSign, TrendingUp, TrendingDown, Clock, Trash2 } from 'lucide-react'

function Dashboard({ products }) {
  const totalProducts = products.length
  const totalBudget = products.reduce((sum, p) => sum + p.totalBudget, 0)
  const totalRevenue = products.reduce((sum, p) => sum + p.totalRevenue, 0)
  const totalProfit = totalRevenue - totalBudget

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Budget',
      value: `${totalBudget.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `${totalRevenue.toLocaleString()} FCFA`,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: totalProfit >= 0 ? 'Total Profit' : 'Total Loss',
      value: `${Math.abs(totalProfit).toLocaleString()} FCFA`,
      icon: totalProfit >= 0 ? TrendingUp : TrendingDown,
      color: totalProfit >= 0 ? 'bg-green-500' : 'bg-red-500',
    },
  ]

  const calculateDaysSince = (dateString) => {
    const purchaseDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today - purchaseDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProductAnalysis = (product) => {
    const profit = product.totalRevenue - product.totalBudget
    const profitPercentage = ((profit / product.totalBudget) * 100).toFixed(1)
    const daysSincePurchase = calculateDaysSince(product.purchaseDate)
    const isSoldOut = product.soldUnits === product.totalUnits
    
    return {
      profit,
      profitPercentage,
      daysSincePurchase,
      isSoldOut,
      status: isSoldOut ? 'Completed' : 'Active'
    }
  }

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Analysis by Category */}
      {Object.keys(productsByCategory).length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No products to analyze yet</p>
        </div>
      ) : (
        Object.entries(productsByCategory).map(([category, categoryProducts]) => {
          const categoryBudget = categoryProducts.reduce((sum, p) => sum + p.totalBudget, 0)
          const categoryRevenue = categoryProducts.reduce((sum, p) => sum + p.totalRevenue, 0)
          const categoryProfit = categoryRevenue - categoryBudget
          
          return (
            <div key={category} className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Category Profit/Loss</p>
                    <p className={`text-lg font-bold ${categoryProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {categoryProfit >= 0 ? '+' : '-'}{Math.abs(categoryProfit).toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Budget</th>
                        <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Revenue</th>
                        <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Profit/Loss</th>
                        <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Progress</th>
                        <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Days</th>
                        <th className="text-left py-2 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((product) => {
                        const analysis = getProductAnalysis(product)
                        return (
                          <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-xs text-gray-500">{product.soldUnits}/{product.totalUnits} units</div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900">
                              {product.totalBudget.toLocaleString()} FCFA
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900">
                              {product.totalRevenue.toLocaleString()} FCFA
                            </td>
                            <td className="py-3 px-4">
                              <div className={`font-semibold ${analysis.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {analysis.profit >= 0 ? '+' : ''}{analysis.profit.toLocaleString()} FCFA
                              </div>
                              <div className={`text-xs ${analysis.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {analysis.profitPercentage}%
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${(product.soldUnits / product.totalUnits) * 100}%` }}
                                ></div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock size={14} className="mr-1" />
                                {analysis.daysSincePurchase}d
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                analysis.isSoldOut 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {analysis.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Dashboard
