// app/admin/page.tsx
'use client'

import { useState, useRef } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts'

// Define TypeScript interfaces
interface Product {
  id: number
  name: string
  flavor: string
  mrp: number
  description: string
  category: string
  size: string
  type: string
  fragranceNotes: {
    topNotes: string
    middleNotes: string
    baseNotes: string
  }
  images: string[]
}

interface Order {
  id: number
  customer: string
  date: string
  amount: number
  status: string
}

interface Customer {
  id: number
  name: string
  email: string
  orders: number
}

// SVG Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const ProductsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const OrdersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const CustomersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const ImageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

// Sample data
const initialProducts: Product[] = [
  { 
    id: 1, 
    name: 'Midnight Oud', 
    flavor: 'Woody', 
    mrp: 299, 
    description: 'Luxury oud fragrance', 
    category: 'Premium', 
    size: '100ml', 
    type: 'AGARWOOD',
    fragranceNotes: {
      topNotes: 'Bergamot, Saffron',
      middleNotes: 'Agarwood, Patchouli',
      baseNotes: 'Vanilla, Amber'
    },
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300']
  },
  { 
    id: 2, 
    name: 'Citrus Blast', 
    flavor: 'Citrus', 
    mrp: 199, 
    description: 'Refreshing citrus scent', 
    category: 'Summer', 
    size: '50ml', 
    type: 'EAU DE TOILETTE',
    fragranceNotes: {
      topNotes: 'Orange, Lemon, Grapefruit',
      middleNotes: 'Basil, Mint',
      baseNotes: 'Musks, Amber'
    },
    images: ['/api/placeholder/300/300']
  },
]

const initialOrders: Order[] = [
  { id: 1, customer: 'Ahmed Hassan', date: '2023-10-15', amount: 450, status: 'Delivered' },
  { id: 2, customer: 'Fatima Ali', date: '2023-10-16', amount: 299, status: 'Processing' },
  { id: 3, customer: 'Omar Khan', date: '2023-10-17', amount: 598, status: 'Shipped' },
]

const initialCustomers: Customer[] = [
  { id: 1, name: 'Ahmed Hassan', email: 'ahmed@example.com', orders: 5 },
  { id: 2, name: 'Fatima Ali', email: 'fatima@example.com', orders: 3 },
  { id: 3, name: 'Omar Khan', email: 'omar@example.com', orders: 8 },
]

// Chart data
const revenueData = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Feb', revenue: 5200 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6100 },
  { month: 'May', revenue: 5900 },
  { month: 'Jun', revenue: 6500 },
]

const categoryData = [
  { name: 'EAU DE PARFUM', value: 35 },
  { name: 'EAU DE TOILETTE', value: 25 },
  { name: 'GIFT SETS', value: 15 },
  { name: 'BODY SPRAY', value: 10 },
  { name: 'AGARWOOD', value: 8 },
  { name: 'DEHNAL OUD', value: 5 },
  { name: 'REED DIFFUSER', value: 2 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C', '#D0ED57', '#FF8888'];

// Admin Panel Component
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [orders] = useState<Order[]>(initialOrders)
  const [customers] = useState<Customer[]>(initialCustomers)
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    flavor: '',
    mrp: 0,
    description: '',
    category: '',
    size: '',
    type: '',
    fragranceNotes: {
      topNotes: '',
      middleNotes: '',
      baseNotes: ''
    },
    images: []
  })
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'mrp' ? parseFloat(value) || 0 : value
    })
  }

  const handleFragranceNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      fragranceNotes: {
        ...formData.fragranceNotes,
        [name]: value
      }
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).map(file => URL.createObjectURL(file))
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    })
    setImageFiles([...imageFiles, ...Array.from(files)])
  }

  const removeImage = (index: number) => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData({
      ...formData,
      images: newImages
    })

    const newImageFiles = [...imageFiles]
    newImageFiles.splice(index, 1)
    setImageFiles(newImageFiles)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: Date.now(),
      ...formData
    }
    setProducts([...products, newProduct])
    setFormData({
      name: '',
      flavor: '',
      mrp: 0,
      description: '',
      category: '',
      size: '',
      type: '',
      fragranceNotes: {
        topNotes: '',
        middleNotes: '',
        baseNotes: ''
      },
      images: []
    })
    setImageFiles([])
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  // Stats for dashboard
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalCustomers = customers.length

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fragrance Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-white text-black py-1 px-3 rounded text-sm">Notifications (3)</button>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row container mx-auto">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white h-auto md:h-screen shadow-md">
          <nav className="p-4">
            <ul>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
                { id: 'products', label: 'Products', icon: <ProductsIcon /> },
                { id: 'orders', label: 'Orders', icon: <OrdersIcon /> },
                { id: 'customers', label: 'Customers', icon: <CustomersIcon /> },
                { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
              ].map((item) => (
                <li key={item.id} className="mb-2">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left p-3 rounded flex items-center space-x-2 ${
                      activeTab === item.id ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-gray-700">{item.icon}</span>
                    <span className="text-gray-900">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Total Revenue</h3>
                  <p className="text-3xl font-bold text-gray-900">{totalRevenue} AED</p>
                  <p className="text-green-600 mt-2">+12% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Total Products</h3>
                  <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                  <p className="text-green-600 mt-2">+5 new this month</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Total Orders</h3>
                  <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                  <p className="text-green-600 mt-2">+8% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Total Customers</h3>
                  <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
                  <p className="text-green-600 mt-2">+15% from last month</p>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Revenue Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Sales by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent = 0 }: { name: string; percent?: number }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black text-white">
                      <tr>
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">Customer</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-3 text-gray-900">#{order.id}</td>
                          <td className="p-3 text-gray-900">{order.customer}</td>
                          <td className="p-3 text-gray-900">{order.date}</td>
                          <td className="p-3 text-gray-900">{order.amount} AED</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                              order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-blue-200 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Management */}
          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Product Management</h2>
              
              {/* Add Product Form */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Product</h3>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">Flavor</label>
                    <input
                      type="text"
                      name="flavor"
                      value={formData.flavor}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">MRP (AED)</label>
                    <input
                      type="number"
                      name="mrp"
                      value={formData.mrp}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-900">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="EAU DE PARFUM">EAU DE PARFUM</option>
                      <option value="EAU DE TOILETTE">EAU DE TOILETTE</option>
                      <option value="GIFT SETS">GIFT SETS</option>
                      <option value="BODY SPRAY">BODY SPRAY</option>
                      <option value="AGARWOOD">AGARWOOD</option>
                      <option value="DEHNAL OUD">DEHNAL OUD</option>
                      <option value="REED DIFFUSER">REED DIFFUSER</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-gray-900">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-gray-900"
                      rows={3}
                      required
                    ></textarea>
                  </div>
                  
                  {/* Fragrance Notes Section */}
                  <div className="md:col-span-2 border-t pt-4 mt-4">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">Fragrance Notes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900">Top Notes</label>
                        <textarea
                          name="topNotes"
                          value={formData.fragranceNotes.topNotes}
                          onChange={handleFragranceNotesChange}
                          className="w-full p-2 border rounded text-gray-900"
                          rows={2}
                          placeholder="e.g., Orange, Grapefruit, Lemon, Red Berries, Mint"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900">Middle Notes</label>
                        <textarea
                          name="middleNotes"
                          value={formData.fragranceNotes.middleNotes}
                          onChange={handleFragranceNotesChange}
                          className="w-full p-2 border rounded text-gray-900"
                          rows={2}
                          placeholder="e.g., Basil, Carrot, Rose"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900">Base Notes</label>
                        <textarea
                          name="baseNotes"
                          value={formData.fragranceNotes.baseNotes}
                          onChange={handleFragranceNotesChange}
                          className="w-full p-2 border rounded text-gray-900"
                          rows={2}
                          placeholder="e.g., Musks, Ambroxan"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Upload Section */}
                  <div className="md:col-span-2 border-t pt-4 mt-4">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">Product Images</h4>
                    
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer mb-4"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon />
                      <p className="mt-2 text-gray-600">Click to upload images or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        multiple
                        accept="image/*"
                      />
                    </div>
                    
                    {/* Preview Uploaded Images */}
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium mb-2 text-gray-900">Uploaded Images</h5>
                        <div className="flex flex-wrap gap-4">
                          {formData.images.map((img, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={img} 
                                alt={`Preview ${index}`} 
                                className="w-24 h-24 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Products List */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Product List</h3>
                
                {products.length === 0 ? (
                  <p className="text-gray-500">No products added yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black text-white">
                        <tr>
                          <th className="p-3 text-left">Name</th>
                          <th className="p-3 text-left">Flavor</th>
                          <th className="p-3 text-left">MRP</th>
                          <th className="p-3 text-left">Size</th>
                          <th className="p-3 text-left">Type</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="p-3 font-medium text-gray-900">{product.name}</td>
                            <td className="p-3 text-gray-900">{product.flavor}</td>
                            <td className="p-3 text-gray-900">{product.mrp} AED</td>
                            <td className="p-3 text-gray-900">{product.size}</td>
                            <td className="p-3 text-gray-900">{product.type}</td>
                            <td className="p-3">
                              <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Other tabs */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Customer</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Amount</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 text-gray-900">#{order.id}</td>
                        <td className="p-3 text-gray-900">{order.customer}</td>
                        <td className="p-3 text-gray-900">{order.date}</td>
                        <td className="p-3 text-gray-900">{order.amount} AED</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-blue-200 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'customers' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Customers</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr key={customer.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 text-gray-900">#{customer.id}</td>
                        <td className="p-3 text-gray-900">{customer.name}</td>
                        <td className="p-3 text-gray-900">{customer.email}</td>
                        <td className="p-3 text-gray-900">{customer.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Revenue Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Sales Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}