import { createClient } from '@supabase/supabase-js'

// إعدادات Supabase عبر متغيرات البيئة (آمنة وقابلة للتغيير حسب بيئة التشغيل)
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) as string
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY) as string

if (!supabaseUrl || !supabaseAnonKey) {
  // لا نطبع القيم الحساسة، فقط رسالة خطأ إرشادية للمطور
  // يمكن رؤية هذا في Console أثناء التطوير
  console.error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

// Database Types
export interface User {
  id: number
  email: string
  password_hash: string
  full_name: string
  role: string
  is_active: boolean
  created_at: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  is_active: boolean
  slug: string
  created_at: string
}

export interface License {
  id: number
  user_id: number
  product_id: number
  license_key: string
  status: string
  created_at: string
}
