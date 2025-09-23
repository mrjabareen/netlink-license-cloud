'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function SetupAdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  const createAdminAccount = async () => {
    if (isLoading) return // منع التنفيذ المتكرر
    
    setIsLoading(true)
    
    try {
      // 1. إنشاء حساب في Supabase Auth بدون تأكيد البريد
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'info@netlinkps.com',
        password: 'Sniper.2591993',
        options: {
          emailRedirectTo: undefined // تعطيل البريد الإلكتروني
        }
      })

      if (authError && !authError.message.includes('already registered')) {
        throw authError
      }

      // 2. إضافة المستخدم في جدول users مع صلاحيات admin
      const { error: insertError } = await supabase
        .from('users')
        .upsert([
          {
            email: 'info@netlinkps.com',
            full_name: 'Administrator',
            password_hash: 'admin_hash',
            role: 'admin',
            is_active: true
          }
        ], { onConflict: 'email' })

      if (insertError && !insertError.message.includes('duplicate')) {
        console.error('Insert error:', insertError)
      }

      toast.success('تم إنشاء حساب الأدمن بنجاح!')
      setIsComplete(true)
      
      // الانتقال لصفحة تسجيل الدخول بدون setTimeout
      router.push('/auth/login')

    } catch (error: any) {
      console.error('Setup error:', error)
      toast.error('خطأ: ' + (error?.message || 'حدث خطأ غير معروف'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">إعداد حساب الأدمن</CardTitle>
          <CardDescription className="text-center">
            سيتم إنشاء حساب الأدمن الرئيسي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isComplete ? (
            <>
              <div className="p-4 bg-gray-100 rounded-lg space-y-2">
                <p><strong>اليوزر نيم:</strong> root</p>
                <p><strong>الإيميل:</strong> info@netlinkps.com</p>
                <p><strong>الباسورد:</strong> Sniper.2591993</p>
                <p><strong>الصلاحيات:</strong> أدمن كامل</p>
              </div>
              
              <Button 
                onClick={createAdminAccount}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'جاري الإنشاء...' : 'إنشاء حساب الأدمن'}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-xl">✅</div>
              <p className="text-lg font-medium">تم إنشاء حساب الأدمن بنجاح!</p>
              <p className="text-sm text-gray-600">سيتم تحويلك لصفحة تسجيل الدخول...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
