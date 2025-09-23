'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestSupabasePage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState({
    email: '',
    full_name: '',
    role: 'user',
    is_active: true
  })

  // جلب المستخدمين
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error:', error)
        alert('خطأ في جلب البيانات: ' + error.message)
      } else {
        setUsers(data || [])
      }
    } catch (err) {
      console.error('Error:', err)
      alert('خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  // إضافة مستخدم جديد
  const addUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.email || !newUser.full_name) {
      alert('يرجى ملء جميع الحقول')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: newUser.email,
          full_name: newUser.full_name,
          password_hash: 'temp_hash_' + Date.now(),
          role: newUser.role,
          is_active: newUser.is_active
        }])
        .select()

      if (error) {
        console.error('Error:', error)
        alert('خطأ في إضافة المستخدم: ' + error.message)
      } else {
        alert('تم إضافة المستخدم بنجاح!')
        setNewUser({ email: '', full_name: '', role: 'user', is_active: true })
        fetchUsers() // إعادة تحميل القائمة
      }
    } catch (err) {
      console.error('Error:', err)
      alert('خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">اختبار Supabase</h1>
      
      {/* نموذج إضافة مستخدم */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>إضافة مستخدم جديد</CardTitle>
          <CardDescription>اختبار إضافة بيانات إلى Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'جاري الإضافة...' : 'إضافة مستخدم'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* قائمة المستخدمين */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>قائمة المستخدمين</CardTitle>
            <CardDescription>البيانات من قاعدة بيانات Supabase</CardDescription>
          </div>
          <Button onClick={fetchUsers} disabled={loading} variant="outline">
            {loading ? 'جاري التحميل...' : 'تحديث'}
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-4">جاري تحميل البيانات...</p>
          ) : users.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">لا توجد بيانات</p>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{user.full_name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        الدور: {user.role} | الحالة: {user.is_active ? 'نشط' : 'غير نشط'}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      #{user.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* معلومات الاتصال */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>معلومات الاتصال</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://192.168.99.3:8000'}</p>
            <p><strong>حالة الاتصال:</strong> {users.length >= 0 ? '✅ متصل' : '❌ غير متصل'}</p>
            <p><strong>عدد المستخدمين:</strong> {users.length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
