'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '@/components/icons'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        toast.error(error)
      } else {
        toast.success('تم تسجيل الدخول بنجاح')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('حدث خطأ')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Icons.logo className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">تسجيل الدخول</CardTitle>
          <CardDescription className="text-center">
            أدخل بريدك الإلكتروني وكلمة المرور
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
                تذكرني
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              دخول
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/auth/forgot-password" className="text-primary hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div className="mt-6 text-center text-sm">
            ليس لديك حساب؟{' '}
            <Link href="/auth/register" className="text-primary hover:underline">
              إنشاء حساب
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
