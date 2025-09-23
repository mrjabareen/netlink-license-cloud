'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Users, Package, Key, Settings, LogOut, RefreshCw } from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [licenses, setLicenses] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  // التحقق من المصادقة
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/auth/login')
      return false
    }

    // التحقق من صلاحيات الأدمن
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single()

    if (userData?.role !== 'admin') {
      toast.error('غير مصرح لك بالدخول!')
      router.push('/')
      return false
    }

    setCurrentUser(userData)
    return true
  }

  // جلب البيانات
  const fetchData = async () => {
    setLoading(true)
    try {
      // جلب المستخدمين
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      setUsers(usersData || [])

      // جلب المنتجات
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      setProducts(productsData || [])

      // جلب التراخيص
      const { data: licensesData } = await supabase
        .from('licenses')
        .select('*')
        .order('created_at', { ascending: false })
      setLicenses(licensesData || [])

    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('خطأ في جلب البيانات')
    } finally {
      setLoading(false)
    }
  }

  // تسجيل الخروج
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  // حذف مستخدم
  const deleteUser = async (userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return
    
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)
    
    if (error) {
      toast.error('خطأ في حذف المستخدم')
    } else {
      toast.success('تم حذف المستخدم')
      fetchData()
    }
  }

  // تغيير حالة المستخدم
  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    const { error } = await supabase
      .from('users')
      .update({ is_active: !isActive })
      .eq('id', userId)
    
    if (error) {
      toast.error('خطأ في تحديث الحالة')
    } else {
      toast.success('تم تحديث الحالة')
      fetchData()
    }
  }

  useEffect(() => {
    checkAuth().then(isAuth => {
      if (isAuth) fetchData()
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">لوحة تحكم الأدمن</h1>
              <span className="text-sm text-gray-600">
                مرحباً {currentUser?.full_name || 'Admin'}
              </span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 py-8">
        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                {users.filter(u => u.is_active).length} نشط
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {products.filter(p => p.is_active).length} متاح
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">التراخيص</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{licenses.length}</div>
              <p className="text-xs text-muted-foreground">
                {licenses.filter(l => l.status === 'active').length} نشط
              </p>
            </CardContent>
          </Card>
        </div>

        {/* التبويبات */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="licenses">التراخيص</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* تبويب المستخدمين */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المستخدمين</CardTitle>
                <CardDescription>قائمة بجميع المستخدمين المسجلين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <p className="font-medium">{user.full_name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          {user.role === 'admin' ? '🔑 أدمن' : '👤 مستخدم'} | 
                          {user.is_active ? ' ✅ نشط' : ' ❌ معطل'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={user.is_active ? "outline" : "default"}
                          onClick={() => toggleUserStatus(user.id, user.is_active)}
                        >
                          {user.is_active ? 'تعطيل' : 'تفعيل'}
                        </Button>
                        {user.role !== 'admin' && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteUser(user.id)}
                          >
                            حذف
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب المنتجات */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المنتجات</CardTitle>
                <CardDescription>قائمة بجميع المنتجات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-center text-gray-500">لا توجد منتجات</p>
                  ) : (
                    products.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.description}</p>
                          <p className="text-xs text-gray-500">
                            السعر: ${product.price} | {product.is_active ? '✅ متاح' : '❌ غير متاح'}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التراخيص */}
          <TabsContent value="licenses">
            <Card>
              <CardHeader>
                <CardTitle>إدارة التراخيص</CardTitle>
                <CardDescription>قائمة بجميع التراخيص الصادرة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {licenses.length === 0 ? (
                    <p className="text-center text-gray-500">لا توجد تراخيص</p>
                  ) : (
                    licenses.map(license => (
                      <div key={license.id} className="flex items-center justify-between p-4 border rounded">
                        <div>
                          <p className="font-medium">ترخيص #{license.id}</p>
                          <p className="text-sm text-gray-600">المفتاح: {license.license_key}</p>
                          <p className="text-xs text-gray-500">
                            الحالة: {license.status === 'active' ? '✅ نشط' : '❌ منتهي'}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب الإعدادات */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات</CardTitle>
                <CardDescription>إعدادات النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded">
                    <h3 className="font-medium mb-2">معلومات النظام</h3>
                    <p className="text-sm text-gray-600">الإصدار: 1.0.0</p>
                    <p className="text-sm text-gray-600">قاعدة البيانات: Supabase</p>
                    <p className="text-sm text-gray-600">البيئة: Production</p>
                  </div>
                  <Button onClick={fetchData} className="w-full">
                    <RefreshCw className="h-4 w-4 ml-2" />
                    تحديث البيانات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
