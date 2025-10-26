import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import ProductList from './components/ProductList'
import SalesList from './components/SalesList'
import { LayoutDashboard, Package, TrendingUp } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('koloCmilProducts')
    return saved ? JSON.parse(saved) : []
  })
  const [salesHistory, setSalesHistory] = useState(() => {
    const saved = localStorage.getItem('koloCmilSales')
    return saved ? JSON.parse(saved) : []
  })

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('koloCmilProducts', JSON.stringify(products))
  }, [products])

  // Save sales history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('koloCmilSales', JSON.stringify(salesHistory))
  }, [salesHistory])

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      purchaseDate: new Date().toISOString(),
      soldUnits: 0,
      totalRevenue: 0,
      isActive: true
    }
    setProducts([...products, newProduct])
  }

  const sellProduct = (productId, customerName, quantity = 1) => {
    const product = products.find(p => p.id === productId)
    const availableUnits = product.totalUnits - product.soldUnits
    
    if (product && quantity > 0 && quantity <= availableUnits) {
      // Create sale record
      const sale = {
        id: Date.now(),
        invoiceNumber: `INV-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        category: product.category,
        customerName: customerName,
        unitPrice: product.unitPrice,
        quantity: quantity,
        totalAmount: product.unitPrice * quantity,
        date: new Date().toISOString(),
        dateFormatted: new Date().toLocaleDateString('en-GB'),
        timeFormatted: new Date().toLocaleTimeString('en-GB')
      }
      
      setSalesHistory([...salesHistory, sale])
      
      // Update product
      setProducts(products.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            soldUnits: p.soldUnits + quantity,
            totalRevenue: (p.soldUnits + quantity) * p.unitPrice
          }
        }
        return p
      }))
      
      return sale
    }
    return null
  }

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const deleteSale = (saleId) => {
    setSalesHistory(salesHistory.filter(s => s.id !== saleId))
  }

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'sales', label: 'Quick Sell', icon: TrendingUp },
    { id: 'dashboard', label: 'Analysis', icon: LayoutDashboard },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">KoloCmil Store</h1>
          <p className="text-sm text-gray-600">Sales Management System</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <ProductList
            products={products}
            onAddProduct={addProduct}
            onDeleteProduct={deleteProduct}
          />
        )}
        {activeTab === 'sales' && (
          <SalesList
            products={products}
            salesHistory={salesHistory}
            onSellProduct={sellProduct}
            onDeleteSale={deleteSale}
          />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard products={products} />
        )}
      </main>
    </div>
  )
}

export default App
