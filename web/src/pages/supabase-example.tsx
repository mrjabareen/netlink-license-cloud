import React, { useState } from 'react'
import { useUsers, useProducts, useLicenses } from '@/hooks/useSupabase'

export default function SupabaseExample() {
  const { users, loading: usersLoading, addUser } = useUsers()
  const { products, loading: productsLoading, addProduct } = useProducts()
  const { licenses, loading: licensesLoading, createLicense } = useLicenses()

  const [newUser, setNewUser] = useState({
    email: '',
    full_name: '',
    password_hash: 'hashed_password',
    role: 'user',
    is_active: true
  })

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    is_active: true,
    slug: ''
  })

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addUser(newUser)
      setNewUser({ email: '', full_name: '', password_hash: 'hashed_password', role: 'user', is_active: true })
      alert('تم إضافة المستخدم بنجاح!')
    } catch (error) {
      alert('خطأ في إضافة المستخدم')
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addProduct(newProduct)
      setNewProduct({ name: '', description: '', price: 0, is_active: true, slug: '' })
      alert('تم إضافة المنتج بنجاح!')
    } catch (error) {
      alert('خطأ في إضافة المنتج')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">مثال على استخدام Supabase</h1>

      {/* قسم المستخدمين */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">المستخدمين</h2>
        
        {/* نموذج إضافة مستخدم */}
        <form onSubmit={handleAddUser} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-medium mb-2">إضافة مستخدم جديد</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={newUser.full_name}
              onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            إضافة مستخدم
          </button>
        </form>

        {/* عرض المستخدمين */}
        {usersLoading ? (
          <p>جاري التحميل...</p>
        ) : (
          <div className="grid gap-2">
            {users.map((user) => (
              <div key={user.id} className="p-3 border rounded">
                <strong>{user.full_name}</strong> - {user.email} ({user.role})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* قسم المنتجات */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">المنتجات</h2>
        
        {/* نموذج إضافة منتج */}
        <form onSubmit={handleAddProduct} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-medium mb-2">إضافة منتج جديد</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم المنتج"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="السعر"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="الوصف"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border p-2 rounded col-span-2"
            />
            <input
              type="text"
              placeholder="Slug"
              value={newProduct.slug}
              onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <button type="submit" className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
            إضافة منتج
          </button>
        </form>

        {/* عرض المنتجات */}
        {productsLoading ? (
          <p>جاري التحميل...</p>
        ) : (
          <div className="grid gap-2">
            {products.map((product) => (
              <div key={product.id} className="p-3 border rounded">
                <strong>{product.name}</strong> - ${product.price}
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* قسم التراخيص */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">التراخيص</h2>
        
        {licensesLoading ? (
          <p>جاري التحميل...</p>
        ) : (
          <div className="grid gap-2">
            {licenses.map((license) => (
              <div key={license.id} className="p-3 border rounded">
                <strong>ترخيص #{license.id}</strong>
                <p>المفتاح: {license.license_key}</p>
                <p>الحالة: {license.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
